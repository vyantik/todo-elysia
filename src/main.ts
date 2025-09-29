import openapi from '@elysiajs/openapi'
import { Elysia } from 'elysia'

import { auth } from './api'

const app = new Elysia()
	.use(openapi())
	.use(auth)
	.get('/', () => 'Hello Elysia')
	.listen(4000)

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
