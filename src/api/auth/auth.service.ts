import { hash, verify } from 'argon2'

import { BadRequestError } from '../../common'
import { prismaClient } from '../../infra/db/prisma'
import { UserRepository } from '../users'

import { LoginRequest, RegisterRequest } from './dto'

export class AuthService {
	private readonly userRepository: UserRepository
	public constructor() {
		this.userRepository = new UserRepository()
	}

	public async login(dto: LoginRequest): Promise<string> {
		const existingUser = await prismaClient.user.findUnique({
			where: {
				email: dto.email,
			},
		})

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

	public async register(dto: RegisterRequest) {
		const existingUser = await prismaClient.user.findFirst({
			where: {
				OR: [
					{
						email: dto.email,
					},
					{
						username: dto.username,
					},
				],
			},
		})

		if (existingUser) {
			throw new BadRequestError('User already exist')
		}

		const hashedPassword = await hash(dto.password)

		const newUser = await this.userRepository.create({
			...dto,
			password: hashedPassword,
		})

		return newUser
	}
}
