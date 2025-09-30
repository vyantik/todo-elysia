import openapi from '@elysiajs/openapi'
import { Elysia } from 'elysia'

import { auth, users } from './api'
import { log } from './utils'

const app = new Elysia({ prefix: 'api/v1' })
	.use(openapi())
	.use(auth)
	.use(users)
	.listen(4000)

log.info('Server started', {
	hostname: app.server?.hostname,
	port: app.server?.port,
	environment: Bun.env.NODE_ENV || 'development',
})
