import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Client } from '@resources/client/schemas/client.schema'
import { Product } from '@resources/product/schemas/product.schema'
import mongoose, { HydratedDocument } from 'mongoose'
import { Article } from '../entities/article.entity'

export type SaleDocument = HydratedDocument<Sale>

@Schema()
export class Sale {

	@Prop({ default: Date.now() })
	date: Date

	@Prop({
		type: [{
			_id: false,
			product: { required: true, type: mongoose.Schema.Types.ObjectId, ref: Product.name },
			quantity: { type: Number, required: true, default: 1 },
			unitCost: { type: Number },
			discount: { type: Number },
			partialCost: { type: Number }
		}]
	})
	articles: Article[]

	@Prop()
	observations: string

	@Prop({ required: true })
	totalCost: number

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: Client.name })
	client: Client

}

export const SaleSchema = SchemaFactory.createForClass(Sale)
