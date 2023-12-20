import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsStrongPassword, MinLength } from 'class-validator'
export class CreateUserDto {
	@IsEmail()
	@ApiProperty({ example: 'hola@gmail.com', description: 'Email', required: true, type: String })
	email: string

	@IsStrongPassword({
		minLength: 8,
		minNumbers: 1,
		minSymbols: 0,
		minLowercase: 0,
		minUppercase: 0
	})
	@ApiProperty({ example: '12345678', description: 'Password', required: true, type: String })
	password: string

	@MinLength(2)
	@ApiProperty({ example: 'hola', description: 'Username', required: true, type: String })
	username: string

	@IsOptional()
	@MinLength(2)
	@ApiProperty({ example: 'hola', description: 'Name', required: true, type: String })
	name: string
}
