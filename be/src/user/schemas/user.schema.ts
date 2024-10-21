import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, type: String })
	fullName: string;

	@Prop({ required: true, type: String })
	password: string;

	@Prop({ required: true, type: String })
	email: string;

	@Prop({ type: String })
	phone: string;

	@Prop({ required: true, type: String })
	role: string;

	@Prop({ type: String })
	avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
