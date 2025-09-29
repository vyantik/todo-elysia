import Elysia from 'elysia'

import { AuthService } from './auth.service'
import { loginRequestSchema, registerRequestSchema } from './dto'

export const auth = new Elysia()
	.decorate('authService', new AuthService())
	.post(
		'/login',
		async ({ body, authService }) => {
			await authService.login(body)
		},
		{
			body: loginRequestSchema,
		},
	)
	.post(
		'/register',
		async ({ body, authService }) => {
			await authService.register(body)
		},
		{
			body: registerRequestSchema,
		},
	)
