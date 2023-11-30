import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ required: true, unique: true, lowercase: true })
	username: string

	@Prop({ lowercase: true })
	name: string

	@Prop({ default: true, index: true })
	isActive: boolean

	constructor(partial: Partial<User>) {
		Object.assign(this, partial)
	}
}

export const UserSchema = SchemaFactory.createForClass(User)
