import { Elysia } from 'elysia'

import { jwtPlugin } from '../../utils'

export const AuthGuard = (app: Elysia) =>
	app
		.use(jwtPlugin)
		.derive({ as: 'global' }, async ({ jwt, headers, set }) => {
			const token = headers.authorization?.split(' ')[1]

			if (!token) {
				set.status = 401
				throw new Error('Authorization header is missing or malformed.')
			}

			const payload = await jwt.verify(token)

			if (!payload) {
				set.status = 401
				throw new Error('Invalid or expired token.')
			}

			return {
				user: {
					id: payload.userId as string,
					role: payload.role as string,
				},
			}
		})
