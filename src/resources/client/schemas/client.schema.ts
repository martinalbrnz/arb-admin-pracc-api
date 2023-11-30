import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ClientDocument = HydratedDocument<Client>

@Schema()
export class Client {

	@Prop({ required: true })
	name: string

	@Prop()
	phone: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop()
	checkingAccount: number

	@Prop({ default: true })
	isActive: boolean

}

export const ClientSchema = SchemaFactory.createForClass(Client)
