import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Document & DestinationInfo;

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

@Schema()
export class DestinationInfo {
    @Prop({ required: true })
    destination: string;

    @Prop({ required: true })
    capital: string;

    @Prop({ required: true })
    office: string;

    @Prop({ required: true })
    plug: string;

    @Prop({ required: true })
    timeZone: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    tourName: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    transportPrice: number;

    @Prop({ required: true })
    hotelPrice: number;

    @Prop({ required: true })
    additionalPrice: number;

    @Prop({ required: true })
    commission: number;

    @Prop({
        required: true, type: {
            startDate: Date,
            endDate: Date
        }
    })
    duration: Duration;

    @Prop({
        required: true,
        type: Object
    })
    inclusion: Inclusion;

    @Prop({ required: true })
    highlights: string;

    @Prop({ required: true })
    startPoint: string;

    @Prop({ required: true })
    endPoint: string;

    @Prop({ required: true })
    covers: string;

    @Prop({ required: true })
    image: string;
}

export const DestinationSchema = SchemaFactory.createForClass(DestinationInfo);


