import Elysia from 'elysia'

import { AuthGuard } from '../../common/guards'

export const users = new Elysia({ prefix: 'users' })
	.use(AuthGuard)
	.get('/profile', ({ user }) => {
		return {
			user,
		}
	})
