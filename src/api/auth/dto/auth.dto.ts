import { Static, t } from 'elysia'

import { UserPlainInputCreate } from '../../../../generated/prismabox/User'

const passwordValidation = t.String({
	minLength: 8,
	maxLength: 32,
})
const emailValidation = t.String({
	format: 'email',
})

const AuthRequestPlainObject = t.Object({
	email: emailValidation,
	password: passwordValidation,
})

export const LoginRequestSchema = t.Composite([
	t.Omit(UserPlainInputCreate, ['username']),
	AuthRequestPlainObject,
])
export const LoginResponseSchema = t.Object({
	token: t.String(),
})
export const RegisterRequestSchema = t.Composite([
	UserPlainInputCreate,
	AuthRequestPlainObject,
	t.Object({
		username: t.String({
			minLength: 2,
			maxLength: 16,
		}),
	}),
])
export const RegisterResponseSchema = t.Object({
	message: t.String(),
})

export type LoginRequest = Static<typeof LoginRequestSchema>
export type LoginResponse = Static<typeof LoginResponseSchema>
export type RegisterRequest = Static<typeof RegisterRequestSchema>
export type RegisterResponse = Static<typeof RegisterResponseSchema>
