// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService
{
	constructor(
		@InjectRepository(Users)
		private usersRepository: Repository<Users>,
	) { }

	async getCountUsers(): Promise<{ count: number; }>
	{
		const result = await this.usersRepository.count();
		return { count: result };
	}


	async getAllUsers(limit: number,offset: number): Promise<UserDto[]>
	{
		const result = await this.usersRepository.find(
			{
				select: { first_name: true,last_name: true,age: true,gender: true,has_problems: true },
				take: limit,
				skip: offset

			}

		);
		return result;
	}

	async updateAllUsersWithProblemAndGetCount(): Promise<number>
	{
		const count = await this.usersRepository.countBy({ has_problems: true });
		this.usersRepository
			.createQueryBuilder()
			.update(Users)
			.set({ has_problems: false })
			.where('has_problems = :hasProblems',{ hasProblems: true })
			.execute();
		return count;

	}
	async updateRandomUsersWithProblemsAndGetCount(): Promise<number>
	{
		const users = await this.usersRepository.findBy({ has_problems: true });
		let count: number = 0;
		for (let i = 0; i < users.length; i++)
		{
			const user = users[i];
			const num = Math.random();
			if (num > 0.5)
			{
				this.usersRepository
					.createQueryBuilder()
					.update(Users)
					.set({ has_problems: false })
					.where(`id = ${user.id}`)
					.execute();
				count++;
			}

		}
		return count;
	}
}
