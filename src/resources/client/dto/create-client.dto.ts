import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, MinLength } from 'class-validator'
export class CreateClientDto {
	@MinLength(2)
	@ApiProperty({ example: 'hola', description: 'Name', required: true, type: String })
	name: string

	@ApiProperty({ example: '12345678', description: 'Phone', required: true, type: String })
	@IsOptional()
	phone: string

	@ApiProperty({ example: 'hola@gmail.com', description: 'Email', required: true, type: String })
	@IsEmail()
	email: string

	@ApiProperty({ example: true, description: 'isActive', required: false, type: Boolean })
	@IsOptional()
	isActive: boolean

	@ApiProperty({ example: 1, description: 'Checking Account', required: false, type: Number })
	@IsOptional()
	checkingAccount: number
}
