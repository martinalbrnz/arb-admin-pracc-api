import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, Min, MinLength } from 'class-validator'

export class CreateProductDto {
	@MinLength(2)
	@ApiProperty({ example: 'Product', description: 'Name', required: true, type: String })
	name: string

	@ApiProperty({ example: 1, description: 'Price', required: true, type: Number })
	@Min(0)
	price: number

	@ApiProperty({ example: 'Description', description: 'Description', required: false, type: String })
	@IsOptional()
	@MinLength(2)
	description: string

	@ApiProperty({ example: 1, description: 'Stock', required: false, type: Number })
	@IsOptional()
	@Min(0)
	stock: number

	@ApiProperty({ example: false, description: 'isActive', required: false, type: Boolean })
	@IsOptional()
	isActive: boolean
}
