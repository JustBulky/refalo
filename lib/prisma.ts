import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// REMOVE the hardcoded dbPath line
// const dbPath = ...

const adapter = new PrismaLibSql({
  // Use the environment variable we set earlier
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
