import { User } from '../../../generated/prisma'
import { IRepository } from '../../common'
import { prismaClient } from '../../infra/db/prisma'
import { logger } from '../../utils'

interface UserRaw {
	username: string
	email: string
	password: string
}

export class UserRepository implements IRepository<User> {
	public constructor() {
		logger.debug(`${UserRepository.name} Initialized`)
	}

	public async findAll(): Promise<User[]> {
		return await prismaClient.user.findMany()
	}

	public async findById(id: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: {
				id,
			},
		})
	}

	public async findByEmail(email: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: {
				email,
			},
		})
	}

	public async findByIdentity(
		email: string,
		username: string,
	): Promise<User | null> {
		return await prismaClient.user.findFirst({
			where: {
				OR: [
					{
						email: email,
					},
					{
						username: username,
					},
				],
			},
		})
	}

	public async save(entity: User): Promise<User> {
		return await prismaClient.user.update({
			where: {
				id: entity.id,
			},
			data: entity,
		})
	}

	public async delete(id: string): Promise<boolean> {
		return !!(await prismaClient.user.delete({
			where: {
				id,
			},
		}))
	}

	public async create(entity: UserRaw): Promise<User> {
		return await prismaClient.user.create({
			data: entity,
		})
	}
}
