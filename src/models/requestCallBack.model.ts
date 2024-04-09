import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestCallBackDocument = Document & RequestCallBack;

interface Duration {
    startDate: Date;
    EndDate: Date;
}

interface Inclusion {
    meal: string;
    stay: string;
    tranfer: string;
    visaAssistence: string;
    sightSeeing: string;
}

@Schema({timestamps: true })
export class RequestCallBack {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    countryCode: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    travelDate: Date;

    @Prop({ required: true })
    traverllerCount: number;
}

export const RequestCallBackSchema = SchemaFactory.createForClass(RequestCallBack);


