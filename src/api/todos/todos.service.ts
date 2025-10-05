import { logger } from '../../utils'

import { TodoCreateRequest, TodoUpdateRequest } from './dto'
import { TodosRepository } from './todos.repository'

export class TodosService {
	private readonly todosRepository: TodosRepository

	public constructor() {
		this.todosRepository = new TodosRepository()
		logger.debug(`${TodosService.name} Initialized`)
	}

	private async validateOwnership(id: string, userId: string) {
		const todo = await this.todosRepository.findById(id)
		if (!todo || todo.userId !== userId) {
			return null
		}
		return todo
	}

	public async getTodos(userId: string) {
		return await this.todosRepository.findAll(userId)
	}

	public async getTodo(id: string, userId: string) {
		return await this.validateOwnership(id, userId)
	}

	public async createTodo(userId: string, entity: TodoCreateRequest) {
		return await this.todosRepository.create(entity, userId)
	}

	public async deleteTodo(id: string, userId: string) {
		return await this.todosRepository.deleteByIdAndUserId(id, userId)
	}

	public async updateTodo(
		id: string,
		userId: string,
		entity: TodoUpdateRequest,
	) {
		const updateData = { ...entity }
		if ('complete' in entity) {
			updateData.completedAt = entity.complete ? new Date() : null
		}

		return await this.todosRepository.updateByIdAndUserId(id, userId, updateData)
	}
}
