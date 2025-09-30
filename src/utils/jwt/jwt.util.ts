import jwt from '@elysiajs/jwt'

const JWT_SECRET = Bun.env.JWT_SECRET
if (!JWT_SECRET) {
	throw new Error('No env variable: JWT_SECRET')
}

export const jwtPlugin = jwt({
	name: 'jwt',
	secret: JWT_SECRET,
	exp: '7d',
})
