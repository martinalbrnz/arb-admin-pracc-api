import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, Min, MinLength } from 'class-validator'
import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@IsOptional()
	@MinLength(2)
	name: string

	@IsOptional()
	@Min(0)
	price: number

	@IsOptional()
	@MinLength(2)
	description?: string

	@IsOptional()
	@Min(0)
	stock: number

	@IsOptional()
	isActive: boolean
}
