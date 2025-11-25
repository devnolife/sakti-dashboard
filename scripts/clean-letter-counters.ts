import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

async function cleanCounters() {
  console.log('🧹 Cleaning old counter data...\n');

  try {
    const result = await prisma.document_counter.deleteMany({});
    console.log(`✅ Deleted ${result.count} old counter records\n`);
  } catch (error) {
    console.error('❌ Error cleaning counters:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

cleanCounters()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
