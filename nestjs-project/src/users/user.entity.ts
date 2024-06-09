// src/users/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Entity()
export class Users implements UserDto
{
	@ApiProperty({ example: '1',description: "Unique id" })
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@ApiProperty({ example: 'name',description: "Name user" })
	@Column({ nullable: false,type: "varchar",length: 50 })
	first_name: string;

	@ApiProperty({ example: 'lastname',description: "Lastname user" })
	@Column({ nullable: false,type: "varchar",length: 50 })
	last_name: string;

	@ApiProperty({ example: 'age',description: "Age of user" })
	@Column({ nullable: false,type: "int" })
	age: number;

	@ApiProperty({ example: 'gender',description: "Male or Female" })
	@Column({ nullable: false,type: "varchar",length: 10 })
	gender: string;

	@ApiProperty({ example: false,description: "Some problem user" })
	@Column({ default: true })
	has_problems: boolean;
}
