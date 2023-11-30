import { IsEmail, IsOptional, MinLength } from 'class-validator'

export class CreateClientDto {
	@MinLength(2)
	name: string

	@IsOptional()
	phone: string

	@IsEmail()
	email: string

	@IsOptional()
	isActive: boolean

	@IsOptional()
	checkingAccount: number
}
