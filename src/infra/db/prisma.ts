import { PrismaClient } from '../../../generated/prisma'

const isProduction = Bun.env.NODE_ENV === 'production'

let prisma: PrismaClient

if (isProduction) {
	prisma = new PrismaClient()
} else {
	const globalWithPrisma = globalThis as typeof globalThis & {
		prisma?: PrismaClient
	}

	if (!globalWithPrisma.prisma) {
		globalWithPrisma.prisma = new PrismaClient({
			log: ['query', 'info', 'warn', 'error'],
		})
	}

	prisma = globalWithPrisma.prisma
}

export const prismaClient = prisma
