import { PrismaClient } from './generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'], // Hanya log error dan warning, tidak termasuk query
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
