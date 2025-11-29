/**
 * Fix Laboratory Admins Prodi Assignment
 *
 * This script fixes the prodi_id assignment for laboratory_admins
 * based on the user's actual profile data.
 *
 * Usage:
 *   npm run fix:lab-admins
 *   or
 *   npx tsx scripts/fix-laboratory-admins-prodi.ts
 */

import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function fixLaboratoryAdminsProdi() {
  try {
    console.log("🔧 Fixing laboratory_admins prodi assignments...\n");

    // 1. Get all laboratory admins with their user profile
    const labAdmins = await prisma.laboratory_admins.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            laboratory_admins: {
              select: {
                prodi_id: true,
              },
              take: 1,
            },
          },
        },
        laboratories: {
          select: {
            id: true,
            code: true,
            name: true,
            prodi_id: true,
          },
        },
      },
    });

    console.log(`✅ Found ${labAdmins.length} laboratory admin assignments\n`);

    // 2. Extract prodi_id from username pattern
    // Username pattern: labadmin_XXXXX where XXXXX is prodi code
    const extractProdiFromUsername = (username: string): string | null => {
      const match = username.match(/labadmin_(\d{5})/);
      return match ? match[1] : null;
    };

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const labAdmin of labAdmins) {
      const username = labAdmin.users.username;
      const expectedProdiId = extractProdiFromUsername(username);

      // Skip global admins (role: admin, no specific prodi pattern)
      if (!expectedProdiId) {
        console.log(
          `   ⏭️  Skipped: ${labAdmin.users.name} (${username}) - Global admin, no specific prodi`
        );
        skipped++;
        continue;
      }

      // Check if prodi_id needs update
      if (labAdmin.prodi_id !== expectedProdiId) {
        try {
          // Verify prodi exists
          const prodiExists = await prisma.prodi.findUnique({
            where: { kode: expectedProdiId },
          });

          if (!prodiExists) {
            console.log(
              `   ⚠️  Warning: Prodi ${expectedProdiId} not found for ${username}`
            );
            errors++;
            continue;
          }

          // Update prodi_id
          await prisma.laboratory_admins.update({
            where: {
              id: labAdmin.id,
            },
            data: {
              prodi_id: expectedProdiId,
            },
          });

          console.log(`   ✅ Updated: ${labAdmin.users.name} (${username})`);
          console.log(`      Lab: ${labAdmin.laboratories.name}`);
          console.log(
            `      Old prodi_id: ${
              labAdmin.prodi_id || "NULL"
            } → New: ${expectedProdiId}`
          );
          updated++;
        } catch (error) {
          console.error(`   ❌ Error updating ${username}:`, error);
          errors++;
        }
      } else {
        console.log(
          `   ✓ OK: ${labAdmin.users.name} (${username}) - prodi_id already correct (${labAdmin.prodi_id})`
        );
        skipped++;
      }
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 Summary:");
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ✓ Already correct: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    if (updated > 0) {
      console.log(
        "🎉 Laboratory admins prodi assignment fixed successfully!\n"
      );
    } else if (skipped > 0 && errors === 0) {
      console.log("ℹ️  All prodi assignments are already correct.\n");
    }

    // 3. Show current status
    console.log("\n📋 Current Laboratory Admin Assignments by Prodi:\n");

    const adminsByProdi = await prisma.laboratory_admins.findMany({
      include: {
        users: {
          select: {
            username: true,
            name: true,
          },
        },
        prodi: {
          select: {
            kode: true,
            nama: true,
          },
        },
      },
      orderBy: {
        prodi_id: "asc",
      },
    });

    const groupedByProdi: Record<string, any[]> = {};
    for (const admin of adminsByProdi) {
      const prodiKey = admin.prodi_id || "NULL";
      if (!groupedByProdi[prodiKey]) {
        groupedByProdi[prodiKey] = [];
      }
      groupedByProdi[prodiKey].push(admin);
    }

    for (const [prodiId, admins] of Object.entries(groupedByProdi)) {
      const prodiName = admins[0]?.prodi?.nama || "No Prodi";
      console.log(`\n   🎓 ${prodiName} (${prodiId}):`);

      const uniqueUsers = new Set<string>();
      admins.forEach((admin) => {
        const userKey = `${admin.users.name} (${admin.users.username})`;
        uniqueUsers.add(userKey);
      });

      uniqueUsers.forEach((user) => {
        console.log(`      - ${user}`);
      });
    }
    console.log("");
  } catch (error) {
    console.error("❌ Error during fixing:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix function
fixLaboratoryAdminsProdi().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
