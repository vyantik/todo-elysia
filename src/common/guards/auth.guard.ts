import { Elysia } from 'elysia'

import { prismaClient } from '../../infra/db/prisma'
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

			if (!payload.userId) {
				set.status = 401
				throw new Error('invalid token')
			}

			const user = await prismaClient.user.findUnique({
				where: {
					id: payload.userId as string,
				},
			})

			if (!user) {
				set.status = 401
				throw new Error('invalid token')
			}

			const { password, ...cleanUser } = user

			return {
				user: cleanUser,
			}
		})
