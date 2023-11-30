import { IsOptional, Min, MinLength } from 'class-validator'

export class CreateProductDto {
	@MinLength(2)
	name: string

	@Min(0)
	price: number

	@IsOptional()
	@MinLength(2)
	description: string

	@IsOptional()
	@Min(0)
	stock: number

	@IsOptional()
	isActive: boolean
}
