import { hash, verify } from 'argon2'

import { BadRequestError } from '../../common'
import { logger } from '../../utils'
import { UserRepository } from '../users'

import { LoginRequest, RegisterRequest } from './dto'

export class AuthService {
	private readonly userRepository: UserRepository
	public constructor() {
		this.userRepository = new UserRepository()
		logger.debug(`${AuthService.name} Initialized`)
	}

	public async login(dto: LoginRequest): Promise<string> {
		const existingUser = await this.userRepository.findByEmail(dto.email)

		if (!existingUser) {
			throw new BadRequestError('Incorrect login or password')
		}

		const isPasswordCorrect = await verify(
			existingUser.password,
			dto.password,
		)

		if (!isPasswordCorrect) {
			throw new BadRequestError('Incorrect login or password')
		}

		return existingUser.id
	}

	public async register({ email, username, password }: RegisterRequest) {
		const existingUser = await this.userRepository.findByIdentity(
			email,
			username,
		)

		if (existingUser) {
			throw new BadRequestError('User already exist')
		}

		const hashedPassword = await hash(password)

		const newUser = await this.userRepository.create({
			email,
			username,
			password: hashedPassword,
		})

		return newUser
	}
}
