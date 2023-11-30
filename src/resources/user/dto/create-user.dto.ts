import { IsEmail, IsOptional, IsStrongPassword, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsStrongPassword({
		minLength: 8,
		minNumbers: 1,
		minSymbols: 0,
		minLowercase: 0,
		minUppercase: 0
	})
	password: string

	@MinLength(2)
	username: string

	@IsOptional()
	@MinLength(2)
	name: string
}
