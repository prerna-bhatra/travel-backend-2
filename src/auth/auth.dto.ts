import { ApiProperty } from '@nestjs/swagger';
// import { IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ description: 'Email', example: 'prerna@mailinator.com' })
    email: string;

    @ApiProperty({ description: 'password', example: '' })
    password: string;

    @ApiProperty({ description: 'name ' })
    name: string;


    @ApiProperty({ description: 'phone ' })
    phone: string;

    @ApiProperty({ description: 'country ' })
    countryCode: string;

}


export class LoginUserDto {
    @ApiProperty({ description: 'Email', example: 'prerna@mailinator.com' })
    email: string;

    @ApiProperty({ description: 'password', example: '' })
    password: string;
}


export class RequestCallBackrDto {
    @ApiProperty({ description: 'Name', example: 'Himanshu Bhatra' })
    name: string;

    @ApiProperty({ description: 'email', example: '' })
    email: string;

    @ApiProperty({ description: 'country code', example: '+91' })
    countryCode: string;

    @ApiProperty({ description: 'password', example: '' })
    phone: string;

    @ApiProperty({ description: 'password', example: '' })
    travelDate: Date;

    @ApiProperty({ description: 'No of passangers', example: '2' })
    traverllerCount: number;

    @ApiProperty({ description: 'Please request', example: '2' })
    description: string;

    @ApiProperty({ description: 'No of passangers', example: '2' })
    tourId: string;
}

