import { ObjectId } from 'mongoose'

export interface Article {
	product: ObjectId
	quantity: number
	discount: number
	unitCost: number
	partialCost: number
}
