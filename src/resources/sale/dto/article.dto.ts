import { IsMongoId, Max, Min } from 'class-validator'
import { ObjectId } from 'mongoose'

export class ArticleDto {
	@IsMongoId()
	product: ObjectId

	@Min(0)
	quantity: number

	@Max(1)
	discount: number
}
