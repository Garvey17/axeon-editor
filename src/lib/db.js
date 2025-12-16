import { PrismaClient } from "@/generated/prisma"

// or relative path

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
