import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsOptional, MinLength } from 'class-validator'
import { CreateClientDto } from './create-client.dto'

export class UpdateClientDto extends PartialType(CreateClientDto) {
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
