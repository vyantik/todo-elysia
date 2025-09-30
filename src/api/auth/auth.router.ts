import Elysia from 'elysia'

import { jwtPlugin, log } from '../../utils'

import { AuthService } from './auth.service'
import { loginRequestSchema, registerRequestSchema } from './dto'

const authService = new AuthService()

export const auth = new Elysia({ prefix: 'auth' })
	.decorate('authService', authService)
	.use(jwtPlugin)
	.post(
		'/login',
		async ({ body, authService, jwt }) => {
			const userId = await authService.login(body)
			const token = await jwt.sign({ userId })

			return token
		},
		{
			body: loginRequestSchema,
		},
	)
	.post(
		'/register',
		async ({ body, authService }) => {
			await authService.register(body)
			return {
				message: 'User created successfully',
			}
		},
		{
			body: registerRequestSchema,
		},
	)
