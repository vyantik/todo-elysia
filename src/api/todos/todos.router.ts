import Elysia, { t } from 'elysia'

import { TodoPlain } from '../../../generated/prismabox/Todo'
import { AuthGuard } from '../../common/guards'
import { logger } from '../../utils'

import {
	TodoCreateRequestSchema,
	TodoGetRequestSchema,
	TodoGetResponseSchema,
	TodoUpdateRequestSchema,
} from './dto'
import { TodosService } from './todos.service'

export const todos = new Elysia({ prefix: 'todos' })
	.decorate('todosService', new TodosService())
	.use(AuthGuard)
	.get(
		'/',
		async ({ user, todosService }) => {
			return await todosService.getTodos(user.id)
		},
		{ response: TodoGetResponseSchema },
	)
	.get(
		'/:id',
		async ({ params: { id }, user, status, todosService }) => {
			const todo = await todosService.getTodo(id, user.id)
			if (!todo) {
				return status(404, 'Todo not Found')
			}
			return todo
		},
		{
			params: TodoGetRequestSchema,
			response: {
				200: TodoPlain,
				404: t.String(),
			},
		},
	)
	.post(
		'/',
		async ({ body, todosService, user }) => {
			return await todosService.createTodo(user.id, body)
		},
		{
			body: TodoCreateRequestSchema,
			response: {
				201: TodoPlain,
			},
		},
	)
	.patch(
		'/:id',
		async ({ params: { id }, user, todosService, body, status }) => {
			const todo = await todosService.updateTodo(id, user.id, body)
			if (!todo) {
				return status(404, 'Todo not found')
			}
			return todo
		},
		{
			body: TodoUpdateRequestSchema,
			params: TodoGetRequestSchema,
			response: {
				200: TodoPlain,
				404: t.String(),
			},
		},
	)
	.delete(
		'/:id',
		async ({ params: { id }, user, todosService, status }) => {
			const success = await todosService.deleteTodo(id, user.id)
			if (!success) {
				return status(404, 'Todo not found')
			}
			return { message: 'Todo deleted successfully' }
		},
		{
			params: TodoGetRequestSchema,
			response: {
				200: t.Object({ message: t.String() }),
				404: t.String(),
			},
		},
	)

logger.debug(`TodosRouter Initialized`)
