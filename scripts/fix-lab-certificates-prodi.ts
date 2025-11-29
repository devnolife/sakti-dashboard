/**
 * Fix Laboratory Certificates Prodi
 *
 * This script fixes the prodi_id in laboratory_certificates
 * based on the creator's (created_by) correct prodi assignment
 *
 * Usage:
 *   npm run fix:lab-certs
 *   or
 *   npx tsx scripts/fix-lab-certificates-prodi.ts
 */

import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function fixLabCertificatesProdi() {
  try {
    console.log("🔧 Fixing laboratory_certificates prodi assignments...\n");

    // Get all certificates
    const certificates = await prisma.laboratory_certificates.findMany({
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true,
          },
        },
      },
    });

    if (certificates.length === 0) {
      console.log("⚠️  No certificates found in database\n");
      return;
    }

    console.log(`✅ Found ${certificates.length} certificate(s)\n`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const cert of certificates) {
      try {
        // Get the creator's laboratory_admin data to find correct prodi
        const labAdmin = await prisma.laboratory_admins.findFirst({
          where: {
            user_id: cert.created_by || "",
          },
          include: {
            prodi: {
              select: {
                kode: true,
                nama: true,
              },
            },
            users: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        });

        if (!labAdmin) {
          console.log(
            `   ⚠️  Warning: No lab admin found for creator ${cert.created_by}`
          );
          console.log(`      Certificate: ${cert.certificate_title}`);
          skipped++;
          continue;
        }

        // Extract prodi from username pattern as fallback
        const extractProdiFromUsername = (username: string): string | null => {
          const match = username.match(/labadmin_(\d{5})/);
          return match ? match[1] : null;
        };

        const correctProdiId =
          labAdmin.prodi_id ||
          extractProdiFromUsername(labAdmin.users.username);

        if (!correctProdiId) {
          console.log(
            `   ⚠️  Warning: Cannot determine correct prodi for ${labAdmin.users.username}`
          );
          console.log(`      Certificate: ${cert.certificate_title}`);
          skipped++;
          continue;
        }

        // Check if prodi_id needs update
        if (cert.prodi_id !== correctProdiId) {
          // Verify prodi exists
          const prodiExists = await prisma.prodi.findUnique({
            where: { kode: correctProdiId },
          });

          if (!prodiExists) {
            console.log(
              `   ⚠️  Warning: Prodi ${correctProdiId} not found in database`
            );
            errors++;
            continue;
          }

          // Update prodi_id
          await prisma.laboratory_certificates.update({
            where: {
              id: cert.id,
            },
            data: {
              prodi_id: correctProdiId,
            },
          });

          console.log(`   ✅ Updated: ${cert.certificate_title}`);
          console.log(`      Participant: ${cert.participant_name}`);
          console.log(`      Verification ID: ${cert.verification_id}`);
          console.log(
            `      Old prodi: ${cert.prodi?.nama || "NULL"} (${cert.prodi_id})`
          );
          console.log(
            `      New prodi: ${prodiExists.nama} (${correctProdiId})`
          );
          console.log(
            `      Creator: ${labAdmin.users.name} (${labAdmin.users.username})`
          );
          updated++;
        } else {
          console.log(`   ✓ OK: ${cert.certificate_title} - already correct`);
          skipped++;
        }
      } catch (error) {
        console.error(
          `   ❌ Error processing certificate ${cert.verification_id}:`,
          error
        );
        errors++;
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
        "🎉 Laboratory certificates prodi assignment fixed successfully!\n"
      );

      // Show updated status
      console.log("📋 Running verification check...\n");

      const updatedCerts = await prisma.laboratory_certificates.findMany({
        include: {
          prodi: {
            select: {
              kode: true,
              nama: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      console.log("✅ Current certificates by Prodi:\n");
      const groupedByProdi: Record<string, number> = {};

      for (const cert of updatedCerts) {
        const prodiName = cert.prodi?.nama || "Unknown";
        groupedByProdi[prodiName] = (groupedByProdi[prodiName] || 0) + 1;
      }

      for (const [prodiName, count] of Object.entries(groupedByProdi)) {
        console.log(`   - ${prodiName}: ${count} certificate(s)`);
      }
      console.log("");
    } else if (skipped > 0 && errors === 0) {
      console.log(
        "ℹ️  All certificates prodi assignments are already correct.\n"
      );
    }
  } catch (error) {
    console.error("❌ Error during fixing:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix function
fixLabCertificatesProdi().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
