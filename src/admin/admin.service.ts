import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestCallBack, RequestCallBackDocument } from 'src/models/requestCallBack.model';
import { DestinationDocument, DestinationInfo } from 'src/models/tour.model';
import { ResponseDto } from 'src/response.dto';

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(DestinationInfo.name) private tourModel: Model<DestinationDocument>,
        @InjectModel(RequestCallBack.name) private requestCallBackModel: Model<RequestCallBackDocument>,

    ) { }

    async createTour(destination: string,
        capital: string,
        office: string,
        plug: string,
        timeZone: string,
        description: string,
        tourName: string,
        country: string,
        additionalPrice: number,
        transportPrice: number,
        hotelPrice: number,
        commission: number,
        duration: any,
        startPoint: string,
        endPoint: string,
        covers: string,
        inclusion: string,
        highlights: string,
        image: string
    ): Promise<any> {

        console.log({ additionalPrice, transportPrice, hotelPrice, commission });


        try {
            const tour = new this.tourModel({
                destination,
                capital,
                office,
                plug,
                timeZone,
                description,
                tourName,
                country,
                additionalPrice,
                transportPrice,
                hotelPrice,
                startPoint,
                endPoint,
                covers,
                inclusion,
                highlights,
                duration,
                image,
                commission
            })

            await tour.save()

            return {
                message: "Successfully added tour",
                code: 200,
                success: true
            }

        } catch (error) {
            throw error
        }






    }

    async fetchTours(): Promise<ResponseDto> {

        try {

            // const tours = await this.tourModel.find();

            const tours = await this.tourModel.aggregate([
                {
                    $group: {
                        _id: "$destination", // Grouping by destination field
                        tours: { $push: "$$ROOT" } // Pushing the whole document into an array under the 'tours' field
                    }
                }
            ]);

            return {
                success: true,
                message: 'fetched',
                data: tours
            }

        } catch (error) {
            throw error;
        }
    }


    async fetchTourById(tourId: string): Promise<ResponseDto> {
        try {

            const tour = await this.tourModel.findOne({ _id: tourId });

            return {
                success: true,
                message: 'fetched',
                data: tour
            }

        } catch (error) {
            throw error;
        }
    }

    async deleteTours() {

        await this.tourModel.deleteMany()
    }

    async fetchRequestCallBacks(dateString?: string) {
        try {
            try {
                let documents;
                if (dateString) {
                    const date = new Date(dateString);
                    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                    documents = await this.requestCallBackModel.find({
                        createdAt: { $gte: startOfDay, $lt: endOfDay }
                    });

                }
                else {
                    documents = await this.requestCallBackModel.find();
                    console.log({ documents });

                }

                return documents;

            } catch (error) {
                // Handle any errors that occur during the operation
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

}
