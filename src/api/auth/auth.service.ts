import { BadRequestError } from '../../common'
import { prismaClient } from '../../infra/db/prisma'
import { UserRepository } from '../users'

import { LoginRequest, RegisterRequest } from './dto'

export class AuthService {
	private readonly userRepository: UserRepository
	public constructor() {
		this.userRepository = new UserRepository()
	}

	public async login(dto: LoginRequest) {
		const existingUser = await prismaClient.user.findUnique({
			where: {
				email: dto.email,
			},
		})

		if (!existingUser) {
			throw new BadRequestError('Incorrect login or password')
		}
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

		return await this.userRepository.create(dto)
	}
}
