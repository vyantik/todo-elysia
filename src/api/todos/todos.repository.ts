import type { Todo } from '../../../generated/prisma'
import { IRepository } from '../../common'
import { prismaClient } from '../../infra/db/prisma'
import { logger } from '../../utils'

import { TodoCreateRequest } from './dto'

export class TodosRepository implements IRepository<Todo> {
	public constructor() {
		logger.debug(`${TodosRepository.name} Initialized`)
	}

	public async findAll(userId: string): Promise<Todo[]> {
		return await prismaClient.todo.findMany({
			where: {
				userId,
			},
		})
	}

	public async findById(id: string): Promise<Todo | null> {
		return await prismaClient.todo.findUnique({
			where: {
				id,
			},
			include: {
				user: true,
			},
		})
	}

	public async save(entity: Todo): Promise<Todo> {
		return await prismaClient.todo.update({
			where: { id: entity.id },
			data: entity,
		})
	}

	public async delete(id: string): Promise<boolean> {
		try {
			await prismaClient.todo.delete({
				where: {
					id,
				},
			})
			return true
		} catch (error) {
			return false
		}
	}

	public async deleteByIdAndUserId(id: string, userId: string): Promise<boolean> {
		try {
			await prismaClient.todo.delete({
				where: {
					id,
					userId,
				},
			})
			return true
		} catch (error) {
			return false
		}
	}

	public async updateByIdAndUserId(
		id: string,
		userId: string,
		data: Partial<Todo>,
	): Promise<Todo | null> {
		try {
			return await prismaClient.todo.update({
				where: {
					id,
					userId,
				},
				data,
			})
		} catch (error) {
			return null
		}
	}

	public async create(
		entity: TodoCreateRequest,
		ownerId: string,
	): Promise<Todo> {
		return await prismaClient.todo.create({
			data: {
				...entity,
				user: {
					connect: {
						id: ownerId,
					},
				},
			},
		})
	}
}
