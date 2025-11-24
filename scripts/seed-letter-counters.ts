import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

async function seedCounters() {
  console.log('🌱 Seeding letter counters...\n');

  try {
    // Get all prodi from database
    const allProdi = await prisma.prodi.findMany({
      select: {
        kode: true,
        nama: true,
      }
    });

    console.log(`📚 Found ${allProdi.length} prodi in database\n`);

    // Seed Fakultas Counter (satu counter untuk semua surat fakultas)
    console.log('📝 Creating Fakultas counter...');

    await prisma.document_counter.upsert({
      where: {
        tahun_prodi_id_scope: {
          tahun: '2025',
          prodi_id: '',
          scope: 'fakultas'
        }
      },
      update: { counter: 145 },
      create: {
        counter: 145,
        tahun: '2025',
        scope: 'fakultas',
        prodi_id: ''
      }
    });
    console.log('   ✓ Fakultas: Counter = 145\n');

    // Seed Prodi Counters based on database
    console.log('📚 Creating Prodi counters...');

    let totalProdiCounters = 0;

    for (const prodi of allProdi) {
      // Generate random counter between 50-150 for demo
      const randomCounter = Math.floor(Math.random() * 100) + 50;

      await prisma.document_counter.upsert({
        where: {
          tahun_prodi_id_scope: {
            tahun: '2025',
            prodi_id: prodi.kode,
            scope: 'prodi'
          }
        },
        update: { counter: randomCounter },
        create: {
          counter: randomCounter,
          tahun: '2025',
          scope: 'prodi',
          prodi_id: prodi.kode
        }
      });
      console.log(`   ✓ ${prodi.kode.padEnd(10)} - ${prodi.nama.padEnd(30)} : Counter = ${randomCounter}`);
      totalProdiCounters++;
    }

    console.log('\n✅ Letter counters seeded successfully!\n');
    console.log('📊 Summary:');
    console.log('   - Fakultas: 1 counter (145)');
    console.log(`   - Prodi: ${totalProdiCounters} counters`);
    console.log(`   - Total: ${1 + totalProdiCounters} counters\n`);

    // Show prodi list
    console.log('📋 Prodi List:');
    allProdi.forEach(p => {
      console.log(`   - ${p.kode}: ${p.nama}`);
    });
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding counters:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedCounters()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
