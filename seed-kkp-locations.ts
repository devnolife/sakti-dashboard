import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function seedKkpLocations() {
  try {
    console.log('🌱 Starting KKP locations seeding...')

    // First, let's check if we have any students
    const student = await prisma.student.findFirst()
    if (!student) {
      console.log('⚠️  No students found. Please create a student first.')
      return
    }

    // Check if we have any companies
    let company = await prisma.company.findFirst()
    if (!company) {
      // Create a test company
      company = await prisma.company.create({
        data: {
          name: "PT Teknologi Maju Indonesia",
          address: "Jl. Sudirman No. 123, Jakarta Selatan",
          city: "Jakarta",
          province: "DKI Jakarta",
          postalCode: "12190",
          contactPerson: "Budi Santoso",
          contactPosition: "HR Manager",
          contactEmail: "hr@teknologimaju.com",
          contactPhone: "+62-21-12345678",
          website: "https://teknologimaju.com",
          industry: "Teknologi Informasi",
          description: "Perusahaan teknologi terdepan di Indonesia yang fokus pada pengembangan software dan digital transformation.",
        }
      })
      console.log('✅ Created test company:', company.name)
    }

    // Create sample KKP locations
    const sampleLocations = [
      {
        name: "PT Teknologi Digital Nusantara",
        address: "Jl. MH Thamrin No. 45, Jakarta Pusat",
        city: "Jakarta",
        province: "DKI Jakarta",
        industry: "Teknologi Informasi",
        positions: JSON.stringify(["Software Developer", "UI/UX Designer", "System Analyst"]),
        quota: 10,
        remaining: 7,
        status: "available",
        contactPerson: "Sari Indah",
        contactEmail: "recruitment@digitalnusantara.com",
        contactPhone: "+62-21-87654321",
        description: "Perusahaan teknologi yang berfokus pada solusi digital untuk UMKM di Indonesia.",
        companyId: company.id,
        createdById: student.id,
      },
      {
        name: "Bank Mandiri Syariah",
        address: "Jl. Gatot Subroto Kav. 36-38, Jakarta Selatan",
        city: "Jakarta",
        province: "DKI Jakarta",
        industry: "Perbankan & Keuangan",
        positions: JSON.stringify(["IT Support", "Business Analyst", "Risk Management"]),
        quota: 8,
        remaining: 3,
        status: "limited",
        contactPerson: "Ahmad Rahman",
        contactEmail: "internship@mandiri-syariah.co.id",
        contactPhone: "+62-21-98765432",
        description: "Bank syariah terkemuka dengan fokus pada layanan perbankan berbasis teknologi.",
        companyId: company.id,
        createdById: student.id,
      },
      {
        name: "Rumah Sakit Siloam Makassar",
        address: "Jl. Boulevard Raya No. 1, Makassar",
        city: "Makassar",
        province: "Sulawesi Selatan",
        industry: "Kesehatan",
        positions: JSON.stringify(["IT Healthcare", "Medical Records System"]),
        quota: 5,
        remaining: 0,
        status: "full",
        contactPerson: "Dr. Lisa Fitriani",
        contactEmail: "hrd@siloam-makassar.com",
        contactPhone: "+62-411-123456",
        description: "Rumah sakit modern dengan sistem informasi terintegrasi.",
        companyId: company.id,
        createdById: student.id,
      },
      {
        name: "Dinas Komunikasi dan Informatika Makassar",
        address: "Jl. Ahmad Yani No. 2, Makassar",
        city: "Makassar",
        province: "Sulawesi Selatan",
        industry: "Pemerintahan",
        positions: JSON.stringify(["Web Developer", "Database Administrator", "Network Administrator"]),
        quota: 12,
        remaining: 10,
        status: "available",
        contactPerson: "Ir. Budi Hartono",
        contactEmail: "magang@diskominfo-makassar.go.id",
        contactPhone: "+62-411-654321",
        description: "Dinas yang mengelola teknologi informasi dan komunikasi untuk pelayanan publik.",
        companyId: company.id,
        createdById: student.id,
      },
    ]

    // Create locations with sub-locations
    for (const locationData of sampleLocations) {
      const location = await prisma.kkpLocation.create({
        data: locationData
      })

      // Add sub-location for the first location as example
      if (locationData.name === "PT Teknologi Digital Nusantara") {
        await prisma.kkpSubLocation.create({
          data: {
            name: "Kantor Cabang Bandung",
            address: "Jl. Dago No. 15, Bandung",
            contactPerson: "Rina Sari",
            contactEmail: "bandung@digitalnusantara.com",
            contactPhone: "+62-22-123456",
            locationId: location.id,
          }
        })
      }

      console.log('✅ Created KKP location:', locationData.name)
    }

    console.log('🎉 KKP locations seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding KKP locations:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedKkpLocations()
