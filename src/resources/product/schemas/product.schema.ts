import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {

	@Prop({ required: true, unique: true })
	name: string

	@Prop({ required: true })
	price: number

	@Prop({ default: null })
	description: string

	@Prop({ default: 0 })
	stock: number

	@Prop({ default: true })
	isActive: boolean

}

export const ProductSchema = SchemaFactory.createForClass(Product)
