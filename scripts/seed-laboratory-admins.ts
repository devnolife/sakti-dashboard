/**
 * Seed Laboratory Admins
 *
 * This script creates laboratory_admins entries for users with admin or laboratory_admin roles.
 * It maps these users to all available laboratories in the system.
 *
 * Usage:
 *   npm run seed:lab-admins
 *   or
 *   npx tsx scripts/seed-laboratory-admins.ts
 */

import { PrismaClient } from "@/lib/generated/prisma";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function seedLaboratoryAdmins() {
  try {
    console.log("🌱 Seeding laboratory admins...\n");

    // 1. Fetch all users with admin or laboratory_admin role
    const adminUsers = await prisma.users.findMany({
      where: {
        OR: [{ role: "admin" }, { role: "laboratory_admin" }],
        is_active: true,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      },
    });

    if (adminUsers.length === 0) {
      console.log(
        "⚠️  No admin or laboratory_admin users found in the database."
      );
      console.log(
        "    Please create admin users first before running this seed.\n"
      );
      return;
    }

    console.log(`✅ Found ${adminUsers.length} admin user(s):`);
    adminUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.username}) - ${user.role}`);
    });
    console.log("");

    // 2. Ensure prodi exist
    console.log("🔍 Checking for prodi...\n");

    const prodiData = [
      { kode: "55201", nama: "Teknik Elektro", department: "Elektro" },
      { kode: "55202", nama: "Informatika", department: "Informatika" },
      { kode: "55203", nama: "Teknik Sipil", department: "Sipil" },
      { kode: "55204", nama: "Arsitektur", department: "Arsitektur" },
      {
        kode: "55205",
        nama: "Perencanaan Wilayah dan Kota",
        department: "PWK",
      },
    ];

    const prodiMap: Record<string, string> = {};

    for (const prodi of prodiData) {
      let existingProdi = await prisma.prodi.findUnique({
        where: { kode: prodi.kode },
      });

      if (!existingProdi) {
        console.log(`   📝 Creating prodi: ${prodi.nama}...`);
        existingProdi = await prisma.prodi.create({
          data: {
            kode: prodi.kode,
            nama: prodi.nama,
            jenjang: "S1",
            fakultas: "Fakultas Teknik",
            akreditasi: "B",
          },
        });
        console.log(
          `   ✅ Prodi created: ${existingProdi.nama} (${existingProdi.kode})`
        );
      } else {
        console.log(
          `   ✅ Prodi found: ${existingProdi.nama} (${existingProdi.kode})`
        );
      }
      prodiMap[prodi.department] = existingProdi.kode;
    }
    console.log("");

    // 3. Ensure test laboratories exist for each prodi
    console.log("🔍 Checking for test laboratories...\n");

    const testLaboratories = [
      {
        code: "LAB-IF-001",
        name: "Lab Pemrograman Backend",
        description:
          "Laboratorium untuk praktikum pengembangan aplikasi backend dengan Node.js, Express, dan database",
        department: "Informatika",
        category: "Programming",
        location: "Gedung Lab Fakultas Teknik Lt. 2 Ruang 201",
      },
      {
        code: "LAB-IF-002",
        name: "Lab Jaringan Komputer",
        description:
          "Laboratorium untuk praktikum jaringan komputer, routing, switching, dan keamanan jaringan",
        department: "Informatika",
        category: "Networking",
        location: "Gedung Lab Fakultas Teknik Lt. 2 Ruang 202",
      },
      {
        code: "LAB-EL-001",
        name: "Lab Elektronika Dasar",
        description:
          "Laboratorium untuk praktikum elektronika dasar, rangkaian analog dan digital",
        department: "Elektro",
        category: "Electronics",
        location: "Gedung Lab Fakultas Teknik Lt. 3 Ruang 301",
      },
      {
        code: "LAB-EL-002",
        name: "Lab Sistem Tenaga Listrik",
        description:
          "Laboratorium untuk praktikum sistem tenaga listrik, mesin listrik, dan instalasi listrik",
        department: "Elektro",
        category: "Power Systems",
        location: "Gedung Lab Fakultas Teknik Lt. 3 Ruang 302",
      },
      {
        code: "LAB-SI-001",
        name: "Lab Mekanika Tanah",
        description:
          "Laboratorium untuk praktikum mekanika tanah, tes tanah, dan analisis struktur tanah",
        department: "Sipil",
        category: "Soil Mechanics",
        location: "Gedung Lab Fakultas Teknik Lt. 1 Ruang 101",
      },
      {
        code: "LAB-SI-002",
        name: "Lab Beton dan Bahan Konstruksi",
        description:
          "Laboratorium untuk praktikum kekuatan beton, material konstruksi, dan pengujian bahan",
        department: "Sipil",
        category: "Construction Materials",
        location: "Gedung Lab Fakultas Teknik Lt. 1 Ruang 102",
      },
      {
        code: "LAB-AR-001",
        name: "Lab Desain Arsitektur",
        description:
          "Laboratorium untuk praktikum desain arsitektur, CAD, dan modeling 3D",
        department: "Arsitektur",
        category: "Design",
        location: "Gedung Lab Fakultas Teknik Lt. 4 Ruang 401",
      },
      {
        code: "LAB-AR-002",
        name: "Lab Struktur dan Konstruksi Bangunan",
        description:
          "Laboratorium untuk praktikum struktur bangunan, analisis beban, dan konstruksi arsitektur",
        department: "Arsitektur",
        category: "Building Structure",
        location: "Gedung Lab Fakultas Teknik Lt. 4 Ruang 402",
      },
      {
        code: "LAB-PWK-001",
        name: "Lab Sistem Informasi Geografis (SIG)",
        description:
          "Laboratorium untuk praktikum SIG, pemetaan digital, dan analisis spasial perencanaan wilayah",
        department: "PWK",
        category: "Geographic Information System",
        location: "Gedung Lab Fakultas Teknik Lt. 5 Ruang 501",
      },
      {
        code: "LAB-PWK-002",
        name: "Lab Perencanaan Transportasi",
        description:
          "Laboratorium untuk praktikum perencanaan transportasi, analisis lalu lintas, dan sistem transportasi kota",
        department: "PWK",
        category: "Transportation Planning",
        location: "Gedung Lab Fakultas Teknik Lt. 5 Ruang 502",
      },
    ];

    for (const labData of testLaboratories) {
      let testLab = await prisma.laboratories.findUnique({
        where: { code: labData.code },
      });

      if (!testLab) {
        console.log(`   📝 Creating laboratory: ${labData.name}...`);
        testLab = await prisma.laboratories.create({
          data: {
            id: nanoid(),
            code: labData.code,
            name: labData.name,
            description: labData.description,
            capacity: 30,
            credits: 2,
            semester: "Ganjil",
            department: labData.department,
            prodi_id: prodiMap[labData.department],
            location: labData.location,
            category: labData.category,
            status: "active",
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        console.log(
          `   ✅ Laboratory created: ${testLab.name} (${testLab.code})`
        );
      } else {
        console.log(
          `   ✅ Laboratory already exists: ${testLab.name} (${testLab.code})`
        );
      }
    }
    console.log("");

    // 4. Fetch all laboratories
    const laboratories = await prisma.laboratories.findMany({
      where: {
        status: "active",
      },
      select: {
        id: true,
        code: true,
        name: true,
        prodi_id: true,
      },
    });

    if (laboratories.length === 0) {
      console.log("⚠️  No active laboratories found in the database.");
      console.log(
        "    Please create laboratories first before running this seed.\n"
      );
      return;
    }

    console.log(`✅ Found ${laboratories.length} active laboratory(ies):`);
    laboratories.forEach((lab) => {
      console.log(
        `   - ${lab.name} (${lab.code})${
          lab.prodi_id ? ` - Prodi: ${lab.prodi_id}` : ""
        }`
      );
    });
    console.log("");

    // 5. Create laboratory_admins entries
    console.log("🔄 Creating laboratory_admins entries...\n");

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // Map each admin to laboratories based on their username pattern
    // labadmin_XXXXX where first 3 digits match prodi code pattern
    const adminProdiMapping: Record<string, string[]> = {
      "55202": ["labadmin_20201", "labadmin_22201", "labadmin_23201"], // Informatika
      "55201": [], // Elektro (no specific admin, will use global admins)
      "55203": [], // Sipil
      "55204": [], // Arsitektur
      "55205": ["labadmin_55202"], // PWK - using Rina Wati
    };

    // Get admin with specific prodi (laboratory_admin with username pattern)
    const adminsByUsername = new Map(
      adminUsers.map((user) => [user.username, user])
    );

    // Global admins (admin role) - will be assigned to all laboratories
    const globalAdmins = adminUsers.filter((user) => user.role === "admin");

    for (const lab of laboratories) {
      let isFirstAdminForLab = true;

      // 1. Assign global admins to all laboratories
      for (const admin of globalAdmins) {
        try {
          const existing = await prisma.laboratory_admins.findUnique({
            where: {
              user_id_laboratory_id: {
                user_id: admin.id,
                laboratory_id: lab.id,
              },
            },
          });

          if (existing) {
            console.log(
              `   ⏭️  Skipped: ${admin.name} → ${lab.name} (already exists)`
            );
            skipped++;
            continue;
          }

          await prisma.laboratory_admins.create({
            data: {
              id: nanoid(),
              user_id: admin.id,
              laboratory_id: lab.id,
              prodi_id: lab.prodi_id,
              assigned_at: new Date(),
              is_primary: isFirstAdminForLab,
              assigned_by: null,
            },
          });

          console.log(
            `   ✅ Created: ${admin.name} → ${lab.name}${
              isFirstAdminForLab ? " (PRIMARY)" : ""
            }`
          );
          created++;
          isFirstAdminForLab = false;
        } catch (error) {
          console.error(
            `   ❌ Error creating mapping for ${admin.name} → ${lab.name}:`,
            error
          );
          errors++;
        }
      }

      // 2. Assign specific lab admins based on prodi
      if (lab.prodi_id && adminProdiMapping[lab.prodi_id]) {
        for (const username of adminProdiMapping[lab.prodi_id]) {
          const admin = adminsByUsername.get(username);
          if (!admin) continue;

          try {
            const existing = await prisma.laboratory_admins.findUnique({
              where: {
                user_id_laboratory_id: {
                  user_id: admin.id,
                  laboratory_id: lab.id,
                },
              },
            });

            if (existing) {
              console.log(
                `   ⏭️  Skipped: ${admin.name} → ${lab.name} (already exists)`
              );
              skipped++;
              continue;
            }

            await prisma.laboratory_admins.create({
              data: {
                id: nanoid(),
                user_id: admin.id,
                laboratory_id: lab.id,
                prodi_id: lab.prodi_id,
                assigned_at: new Date(),
                is_primary: false, // Global admin sudah jadi primary
                assigned_by: null,
              },
            });

            console.log(
              `   ✅ Created: ${admin.name} → ${lab.name} (Prodi-specific)`
            );
            created++;
          } catch (error) {
            console.error(
              `   ❌ Error creating mapping for ${admin.name} → ${lab.name}:`,
              error
            );
            errors++;
          }
        }
      }
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 Summary:");
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    if (created > 0) {
      console.log("🎉 Laboratory admins seeding completed successfully!\n");
    } else if (skipped > 0 && errors === 0) {
      console.log("ℹ️  All laboratory admin mappings already exist.\n");
    }
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedLaboratoryAdmins().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
