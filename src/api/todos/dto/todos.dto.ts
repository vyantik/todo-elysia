import { Static, t } from 'elysia'

import {
	TodoPlain,
	TodoPlainInputCreate,
	TodoPlainInputUpdate,
} from '../../../../generated/prismabox/Todo'

const titleValidation = t.String({
	minLength: 1,
	maxLength: 100,
})
const descriptionValidation = t.String({
	minLength: 1,
	maxLength: 2000,
})
const idValidation = t.String({
	minLength: 21,
	maxLength: 21,
	pattern: /^[a-zA-Z0-9_-]+$/.source,
})

const TodoPlainObject = t.Object({
	title: titleValidation,
	description: descriptionValidation,
})

export const TodoCreateRequestSchema = t.Composite([
	TodoPlainInputCreate,
	TodoPlainObject,
])
export const TodoUpdateRequestSchema = t.Composite([
	TodoPlainInputUpdate,
	TodoPlainObject,
])
export const TodoGetRequestSchema = t.Object({
	id: idValidation,
})
export const TodoGetResponseSchema = t.Array(TodoPlain)

export type TodoCreateRequest = Static<typeof TodoCreateRequestSchema>
export type TodoUpdateRequest = Static<typeof TodoUpdateRequestSchema>
export type TodoGetRequest = Static<typeof TodoGetRequestSchema>
