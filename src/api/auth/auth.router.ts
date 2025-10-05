import Elysia from 'elysia'

import { jwtPlugin, logger } from '../../utils'

import { AuthService } from './auth.service'
import {
	LoginRequestSchema,
	LoginResponseSchema,
	RegisterRequestSchema,
	RegisterResponseSchema,
} from './dto'

const authService = new AuthService()

export const auth = new Elysia({ prefix: 'auth' })
	.decorate('authService', authService)
	.use(jwtPlugin)
	.post(
		'/login',
		async ({ body, authService, jwt }) => {
			const userId = await authService.login(body)
			const token = await jwt.sign({ userId })

			return {
				token,
			}
		},
		{
			body: LoginRequestSchema,
			response: LoginResponseSchema,
		},
	)
	.post(
		'/register',
		async ({ body, authService }) => {
			await authService.register(body)
			return { message: 'User created successfully' }
		},
		{
			body: RegisterRequestSchema,
			response: RegisterResponseSchema,
		},
	)

logger.debug('AuthRouter Initialized')
