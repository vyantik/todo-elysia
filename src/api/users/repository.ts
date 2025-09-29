import { User } from '@prisma/client'

import { IRepository } from '../../common'
import { prismaClient } from '../../infra/db/prisma'

interface UserRaw {
	username: string
	email: string
	password: string
}

export class UserRepository implements IRepository<User> {
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

	public async save(entity: User): Promise<User> {
		return await prismaClient.user.update({
			where: {
				id: entity.id,
			},
			data: entity,
		})
	}

	public async delete(id: string): Promise<boolean> {
		const user = await prismaClient.user.delete({
			where: {
				id,
			},
		})
		return !!user
	}

	public async create(entity: UserRaw): Promise<User> {
		return await prismaClient.user.create({
			data: entity,
		})
	}
}
