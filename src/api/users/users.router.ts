import Elysia from 'elysia'

import { AuthGuard } from '../../common/guards'
import { logger } from '../../utils'

export const users = new Elysia({ prefix: 'users' })
	.use(AuthGuard)
	.get('/profile', ({ user }) => {
		return {
			user,
		}
	})

logger.debug('UsersRouter Initialized')
