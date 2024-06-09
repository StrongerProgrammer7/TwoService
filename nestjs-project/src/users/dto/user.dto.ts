import { ApiProperty } from "@nestjs/swagger";

export class UserDto
{
	@ApiProperty({ example: 'name',description: "Name user" })
	readonly first_name: string;
	@ApiProperty({ example: 'lastname',description: "Lastname user" })
	readonly last_name: string;
	@ApiProperty({ example: 'age',description: "Age of user" })
	readonly age: number;
	@ApiProperty({ example: 'gender',description: "Male or Female" })
	readonly gender: string;
	@ApiProperty({ example: false,description: "Some problem user" })
	readonly has_problems: boolean;
}
