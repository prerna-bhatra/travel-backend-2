import { ApiProperty } from '@nestjs/swagger';
// import { IsString, MinLength } from 'class-validator';

export class AdminDto {
    @ApiProperty({ description: 'Email', example: 'ladakh' })
    destination: string;

    @ApiProperty({ description: 'password', example: 'jaipur' })
    capital: string;

    @ApiProperty({ description: 'password', example: 'abu road' })
    office: string;

    @ApiProperty({ description: 'password', example: 'test' })
    plug: string;

    @ApiProperty({ description: 'image', example: 'image' })
    image: string;

    @ApiProperty({ description: 'password', example: 'ist' })
    timeZone: string;

    @ApiProperty({ description: 'password', example: 'What is a tour description? A tour description is the content that explains what your tour is and what guests should expect from the experience. The purpose of a tour description is to give your potential customers the details, itinerary, pricing, and unique highlights of your tour so that they' })
    description: string;

    @ApiProperty({ description: 'password', example: 'jaipur' })
    country: string;

    @ApiProperty({ description: 'name', example: 'jaipur' })
    tourName: string;

    @ApiProperty({ description: 'password', example: 10000 })
    hotelPrice: number;

    @ApiProperty({ description: 'password', example: 10000 })
    transportPrice: number;

    @ApiProperty({ description: 'password', example: 10000 })
    additionalPrice: number;

    @ApiProperty({ description: 'password', example: 10000 })
    commission: number;

    @ApiProperty({
        description: 'duration', example: {
            startDate: '2024-03-16T12:00:00Z',
            endDate: '2024-03-17T12:00:00Z'
        }
    })
    duration: Duration;

    @ApiProperty({
        description: 'password', example: {
            meal: 'beakfast , dinner',
            stay: 'hotel maya',
            tranfer: 'no',
            visaAssistence: 'no',
            sightSeeing: 'no'

        }
    })
    inclusion: Inclusion;

    @ApiProperty({ description: 'highlights', example: 'highlights' })
    highlights: string;

    @ApiProperty({ description: 'startPoint', example: 'jaipur' })
    startPoint: string;

    @ApiProperty({ description: 'endPoint', example: 'mumbai' })
    endPoint: string;

    @ApiProperty({ description: 'covers', example: 'jaipur' })
    covers: string;
}

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


export class  FileUpload{
    file:any;
}