// src/users/users.controller.ts
import { Controller,DefaultValuePipe,Get,ParseIntPipe,Put,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation,ApiProperty,ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

class ICount
{
	@ApiProperty({ example: '10',description: "Count" })
	readonly count: number;
}

@Controller('api')
export class UsersController
{
	constructor(private readonly usersService: UsersService) { }

	@ApiOperation({ summary: "Count users" })
	@ApiResponse({ status: 200,type: ICount })
	@Get('count')
	async getCountUsers()
	{
		return await this.usersService.getCountUsers();
	}

	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200,type: [UserDto] })
	@Get('all')
	async getAllUsers(@Query('page',new DefaultValuePipe(1),ParseIntPipe) page: number,
		@Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number,)
	{
		const offset = (page - 1) * limit;
		return await this.usersService.getAllUsers(limit,offset);
	}

	@ApiOperation({ summary: "Update and get count all users with problem" })
	@ApiResponse({ status: 200,type: Number })
	@Get('update-problems-get-count-users')
	async updateAllUsersWithProblemAndGetCount(): Promise<{ count: number; }>
	{
		const count = await this.usersService.updateAllUsersWithProblemAndGetCount();
		return { count };
	}

	@ApiOperation({ summary: "Update and get count users with problem (random users)" })
	@ApiResponse({ status: 200,type: Number })
	@Get('update-problems-get-count-random-users')
	async updateRandomUsersWithProblemsAndGetCount(): Promise<{ count: number; }>
	{
		const count = await this.usersService.updateRandomUsersWithProblemsAndGetCount();
		return { count };
	}
}
