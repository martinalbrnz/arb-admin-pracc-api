import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsOptional, ValidateNested } from 'class-validator'
import { ObjectId } from 'mongoose'
import { ArticleDto } from './article.dto'

export class CreateSaleDto {
	@IsOptional()
	@IsDate()
	date: Date

	@IsArray()
	@ArrayNotEmpty()
	@Type(() => ArticleDto)
	@ValidateNested({ each: true })
	articles: ArticleDto[]

	observations: string

	@IsMongoId()
	client: ObjectId
}
