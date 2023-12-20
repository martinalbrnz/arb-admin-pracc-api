import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsOptional, ValidateNested } from 'class-validator'
import { ObjectId } from 'mongoose'
import { ArticleDto } from './article.dto'
export class CreateSaleDto {
	@IsOptional()
	@IsDate()
	@ApiProperty({ example: '2021-09-01T00:00:00.000Z', description: 'Date', required: false, type: Date })
	date: Date

	@IsArray()
	@ArrayNotEmpty()
	@Type(() => ArticleDto)
	@ValidateNested({ each: true })
	@ApiProperty({ 
		example: [{ 
			article: '612f4d6a5c5d7d0015d8f6b8', quantity: 1, discount: 0 }], 
			description: 'Articles', 
			required: true, 
			type: [ArticleDto] 
	})
	articles: ArticleDto[]

	@ApiProperty({ example: 'Observations', description: 'Observations', required: true, type: String })
	observations: string

	@ApiProperty({ example: '612f4d6a5c5d7d0015d8f6b8', description: 'Client', required: true, type: String })
	@IsMongoId()
	client: ObjectId
}
