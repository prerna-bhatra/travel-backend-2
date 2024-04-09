import { Body, ConflictException, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdminDto, FileUpload } from './admin.dto';
// import { uploadFileToS3 } from '../utills/uploadToS3';
import { FileInterceptor } from '@nestjs/platform-express';

// interface FileUpload{
//     file:File;
// }

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) { }

    @Post('/')
    @ApiOperation({ summary: 'Create a new tour' })
    @ApiBody({ type: AdminDto, description: 'Tour registration details' })
    @ApiConflictResponse({ description: 'Failed ' })
    @ApiCreatedResponse({ description: ' successfully' })
    async create(
        @Body('destination') destination: string,
        @Body('capital') office: string,
        @Body('plug') timeZone: string,
        @Body('country') country: string,
        // @Body('price') price: number,
        @Body('duration') duration: {
            startDate: Date,
            endDate: Date
        },
        @Body('description') description: string,
        @Body('image') image: string,
        @Body('country') highlights: string,
        @Body('startPoint') startPoint: string,
        @Body('endPoint') endPoint: string,
        @Body('covers') covers: string,
        @Body('capital') capital: string,
        @Body('plug') plug: string,
        @Body('tourName') tourName: string,
        @Body('inclusion') inclusion: string,
        @Body('additionalPrice') additionalPrice: number,
        @Body('transportPrice') transportPrice: number,
        @Body('hotelPrice') hotelPrice: number,
        @Body('commission') commission: number

    ) {
        console.log("CONTROLLER", { additionalPrice, transportPrice, hotelPrice, commission });

        try {
            return await this.adminService.createTour(
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
                commission,
                duration,
                startPoint,
                endPoint,
                covers,
                inclusion,
                highlights,
                image
            );
        } catch (error) {
            if (error instanceof ConflictException) {
                return { message: 'User with this email already exists' };
            }
            throw error;
        }
    }


    @Get('/')
    @ApiOperation({ summary: 'read tours' })
    // @ApiBody({ description: 'Tours' })
    @ApiConflictResponse({ description: 'Failed ' })
    @ApiCreatedResponse({ description: ' successfully' })
    async tours() {
        return await this.adminService.fetchTours();

    }

    @Get('/tour')
    @ApiOperation({ summary: 'read tours' })
    // @ApiBody({  description: 'Tour By Id' })
    @ApiConflictResponse({ description: 'Failed ' })
    @ApiCreatedResponse({ description: ' successfully' })
    async tourById(@Query('tourId') tourId: string) {
        return await this.adminService.fetchTourById(tourId);

    }

    @Delete('/')
    @ApiOperation({ summary: 'delete tours' })
    // @ApiBody({  description: 'Tour By Id' })
    @ApiConflictResponse({ description: 'Failed ' })
    @ApiCreatedResponse({ description: ' successfully' })
    async deletTour() {
        return await this.adminService.deleteTours();

    }



    @Get('/call-backs')
    @ApiOperation({ summary: 'Read tours' })
    @ApiQuery({ name: 'dateString', description: 'Date string in YYYY-MM-DD format' })
    @ApiConflictResponse({ description: 'Failed ' })
    @ApiCreatedResponse({ description: 'Successfully' })
    async callBackRequestes(@Query('dateString') dateString?: string) {
        const documents = await this.adminService.fetchRequestCallBacks(dateString);
        return documents;
    }


    // @Post("/upload")
    // @ApiConsumes('multipart/form-data') // Required for Swagger to recognize file uploads
    // @UseInterceptors(FileInterceptor('file'))
    // @ApiOperation({ summary: "upload file" })
    // // @ApiBody({ type: FileUpload, description: 'Image details' })
    // async uploadFile(@UploadedFile('file') file: any) {
    //     console.log({ file });

    //     try {
    //         uploadFileToS3(
    //             'traveltourimages',
    //             file.path,
    //             `image/${file.originalname}`,
    //         )

    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
