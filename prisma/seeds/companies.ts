import { PrismaClient } from '../../lib/generated/prisma'

export async function seedCompanies(prisma: PrismaClient) {
  const companies = [
    {
      name: 'PT Telkom Indonesia',
      address: 'Jl. Japati No. 1, Bandung',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '40133',
      contactPerson: 'Budi Santoso',
      contactPosition: 'HR Manager',
      contactEmail: 'budi.santoso@telkom.co.id',
      contactPhone: '+62221234567',
      website: 'https://telkom.co.id',
      industry: 'Telecommunications',
      description: 'Leading telecommunications company in Indonesia'
    },
    {
      name: 'PT Bank Mandiri',
      address: 'Jl. Jenderal Gatot Subroto Kav. 36-38',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12190',
      contactPerson: 'Siti Rahayu',
      contactPosition: 'Recruitment Manager',
      contactEmail: 'siti.rahayu@bankmandiri.co.id',
      contactPhone: '+62215299000',
      website: 'https://bankmandiri.co.id',
      industry: 'Banking & Finance',
      description: 'One of the largest banks in Indonesia'
    },
    {
      name: 'PT Pertamina',
      address: 'Jl. Medan Merdeka Timur 1A',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '10110',
      contactPerson: 'Ahmad Fauzi',
      contactPosition: 'HR Supervisor',
      contactEmail: 'ahmad.fauzi@pertamina.com',
      contactPhone: '+622131507070',
      website: 'https://pertamina.com',
      industry: 'Oil & Gas',
      description: 'National oil and gas company of Indonesia'
    },
    {
      name: 'PT Astra International',
      address: 'Jl. Gaya Motor Raya No. 8',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '14330',
      contactPerson: 'Dewi Susanti',
      contactPosition: 'HR Director',
      contactEmail: 'dewi.susanti@astra.co.id',
      contactPhone: '+622156666666',
      website: 'https://astra.co.id',
      industry: 'Automotive',
      description: 'Leading automotive company in Indonesia'
    },
    {
      name: 'PT Gojek Indonesia',
      address: 'Jl. Kemang Selatan No. 99',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12560',
      contactPerson: 'Eko Prasetyo',
      contactPosition: 'Talent Acquisition',
      contactEmail: 'eko.prasetyo@gojek.com',
      contactPhone: '+622180821000',
      website: 'https://gojek.com',
      industry: 'Technology',
      description: 'Leading super app platform in Southeast Asia'
    },
    {
      name: 'PT Tokopedia',
      address: 'Jl. Prof. Dr. Satrio Kav. E4-7',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12950',
      contactPerson: 'Rina Wati',
      contactPosition: 'People Partner',
      contactEmail: 'rina.wati@tokopedia.com',
      contactPhone: '+622150888888',
      website: 'https://tokopedia.com',
      industry: 'E-commerce',
      description: 'Leading e-commerce platform in Indonesia'
    },
    {
      name: 'PT Unilever Indonesia',
      address: 'Jl. BSD Boulevard Barat',
      city: 'Tangerang',
      province: 'Banten',
      postalCode: '15345',
      contactPerson: 'Joko Widodo',
      contactPosition: 'HR Business Partner',
      contactEmail: 'joko.widodo@unilever.com',
      contactPhone: '+622153837000',
      website: 'https://unilever.co.id',
      industry: 'FMCG',
      description: 'Leading consumer goods company'
    },
    {
      name: 'PT PLN (Persero)',
      address: 'Jl. Trunojoyo Blok M I/135',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12160',
      contactPerson: 'Ani Yudhoyono',
      contactPosition: 'HR Manager',
      contactEmail: 'ani.yudhoyono@pln.co.id',
      contactPhone: '+622117251234',
      website: 'https://pln.co.id',
      industry: 'Electricity',
      description: 'State-owned electricity company'
    },
    {
      name: 'PT Traveloka Technology',
      address: 'Jl. Fachrudin No. 39-41',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '10250',
      contactPerson: 'Bambang Supriadi',
      contactPosition: 'Talent Acquisition Lead',
      contactEmail: 'bambang.supriadi@traveloka.com',
      contactPhone: '+622139708888',
      website: 'https://traveloka.com',
      industry: 'Travel Technology',
      description: 'Leading online travel company in Southeast Asia'
    },
    {
      name: 'PT Bukalapak',
      address: 'Jl. Lodan Raya No. 2A',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '14430',
      contactPerson: 'Lina Marlina',
      contactPosition: 'People Operations',
      contactEmail: 'lina.marlina@bukalapak.com',
      contactPhone: '+622129929929',
      website: 'https://bukalapak.com',
      industry: 'E-commerce',
      description: 'Leading e-commerce marketplace'
    },
    // Add more tech companies
    {
      name: 'PT Microsoft Indonesia',
      address: 'Jl. Jenderal Sudirman Kav. 3-4',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '10220',
      contactPerson: 'Dedi Kurniawan',
      contactPosition: 'HR Partner',
      contactEmail: 'dedi.kurniawan@microsoft.com',
      contactPhone: '+622157947000',
      website: 'https://microsoft.com/id-id',
      industry: 'Technology',
      description: 'Global technology company'
    },
    {
      name: 'PT IBM Indonesia',
      address: 'Jl. Prof. DR. Satrio Kav. 3-5',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12940',
      contactPerson: 'Wati Sulistiawati',
      contactPosition: 'Talent Acquisition',
      contactEmail: 'wati.sulistiawati@ibm.com',
      contactPhone: '+622152922500',
      website: 'https://ibm.com/id-en',
      industry: 'Technology',
      description: 'Global technology and consulting company'
    },
    // Government and public sector
    {
      name: 'Kementerian PUPR',
      address: 'Jl. Pattimura No. 20',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12110',
      contactPerson: 'Agus Salim',
      contactPosition: 'Kepala Bagian SDM',
      contactEmail: 'agus.salim@pu.go.id',
      contactPhone: '+622121051000',
      website: 'https://pu.go.id',
      industry: 'Government',
      description: 'Ministry of Public Works and Housing'
    },
    {
      name: 'PT Waskita Karya',
      address: 'Jl. MT. Haryono Kav. 10',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12810',
      contactPerson: 'Yuni Shara',
      contactPosition: 'HR Manager',
      contactEmail: 'yuni.shara@waskita.co.id',
      contactPhone: '+622181889999',
      website: 'https://waskita.co.id',
      industry: 'Construction',
      description: 'Leading construction company'
    },
    // Local Palembang companies
    {
      name: 'PT Pupuk Sriwidjaja Palembang',
      address: 'Jl. Mayor Zen Palembang',
      city: 'Palembang',
      province: 'Sumatera Selatan',
      postalCode: '30118',
      contactPerson: 'Hendra Setiawan',
      contactPosition: 'Manager SDM',
      contactEmail: 'hendra.setiawan@pusri.co.id',
      contactPhone: '+627114442200',
      website: 'https://pusri.co.id',
      industry: 'Fertilizer',
      description: 'Leading fertilizer company in Indonesia'
    }
  ]

  const createdCompanies = []

  for (const company of companies) {
    const created = await prisma.company.create({
      data: company
    })
    createdCompanies.push(created)
  }

  console.log(`✅ Created ${createdCompanies.length} companies`)
  return createdCompanies
}