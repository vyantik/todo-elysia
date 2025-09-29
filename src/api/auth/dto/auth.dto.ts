import { Static, t } from 'elysia'

const passwordValidation = t.String({
	minLength: 8,
	maxLength: 32,
})
const emailValidation = t.String({
	format: 'email',
	error: "Property 'email' should be email",
})

export const loginRequestSchema = t.Object({
	email: emailValidation,
	password: passwordValidation,
})

export type LoginRequest = Static<typeof loginRequestSchema>

export const registerRequestSchema = t.Object({
	username: t.String({
		minLength: 2,
		maxLength: 16,
	}),
	email: emailValidation,
	password: passwordValidation,
})

export type RegisterRequest = Static<typeof registerRequestSchema>
