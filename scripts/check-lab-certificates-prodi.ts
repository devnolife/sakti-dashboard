/**
 * Check Laboratory Certificates Prodi
 *
 * This script checks the prodi_id in laboratory_certificates table
 *
 * Usage:
 *   npm run check:lab-certs
 *   or
 *   npx tsx scripts/check-lab-certificates-prodi.ts
 */

import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function checkLabCertificatesProdi() {
  try {
    console.log("🔍 Checking laboratory_certificates prodi assignments...\n");

    // Get all certificates with prodi info
    const certificates = await prisma.laboratory_certificates.findMany({
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
      take: 20, // Show last 20 certificates
    });

    if (certificates.length === 0) {
      console.log("⚠️  No certificates found in database\n");
      return;
    }

    console.log(`✅ Found ${certificates.length} certificate(s)\n`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    for (const cert of certificates) {
      console.log(`\n📜 Certificate: ${cert.certificate_title}`);
      console.log(`   Participant: ${cert.participant_name}`);
      console.log(`   Verification ID: ${cert.verification_id}`);
      console.log(`   Prodi ID: ${cert.prodi_id}`);
      console.log(`   Prodi Name: ${cert.prodi?.nama || "NOT FOUND"}`);
      console.log(`   Created by: ${cert.created_by || "N/A"}`);
      console.log(`   Created at: ${cert.created_at}`);
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Group by prodi
    console.log("\n📊 Certificates by Prodi:\n");
    const groupedByProdi: Record<string, number> = {};

    for (const cert of certificates) {
      const prodiName = cert.prodi?.nama || "Unknown";
      groupedByProdi[prodiName] = (groupedByProdi[prodiName] || 0) + 1;
    }

    for (const [prodiName, count] of Object.entries(groupedByProdi)) {
      console.log(`   - ${prodiName}: ${count} certificate(s)`);
    }

    console.log("");
  } catch (error) {
    console.error("❌ Error during check:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check function
checkLabCertificatesProdi().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
