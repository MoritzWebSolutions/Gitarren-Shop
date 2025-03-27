import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"], // Zeigt DB-Queries in der Konsole an
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;