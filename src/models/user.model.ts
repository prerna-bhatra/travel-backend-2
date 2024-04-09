import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    countryCode: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: 'customer' })
    userType: string;

    @Prop({ required: true, default: false })
    emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
