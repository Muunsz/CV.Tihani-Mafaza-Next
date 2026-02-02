import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Get database URL from environment variable
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your .env.local file.\n" +
      "Format: postgresql://user:password@host:port/database"
    );
  }
  
  return url;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
