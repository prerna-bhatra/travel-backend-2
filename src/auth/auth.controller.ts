// auth.controller.ts
import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiConflictResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto, RequestCallBackrDto } from './auth.dto';

@Controller('auth')
@ApiTags('Authentication') // Swagger tag for the Authentication API
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: RegisterUserDto, description: 'User registration details' })

  @ApiConflictResponse({ description: 'User with this email already exists' })
  @ApiCreatedResponse({ description: 'User created successfully' })
  async signUp(@Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('countryCode') countryCode: string) {
    try {
      const myRes = await this.authService.createUser(email, password, name, phone, countryCode);
      return myRes

    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'User with this email already exists' };
      }
      throw error;
    }
  }


  @Post('/login')
  @ApiOperation({ summary: 'login a  user' })
  @ApiBody({ type: LoginUserDto, description: 'User login details' })

  @ApiConflictResponse({ description: 'User with this email does not  exists' })
  @ApiCreatedResponse({ description: 'User logged in  successfully' })
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      return await this.authService.validateUser(email, password);

      // console.log("USER===>", token);

      // if (token)
      //   return { message: 'User Loggedin  successfully', token };
      // else {
      //   return { message: 'Something went wrong' };
      // }
    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'User with this email does not exists' };
      }
      throw error;
    }
  }



  @Post('/request-call-back')
  @ApiOperation({ summary: 'Request call back' })
  @ApiBody({ type: RequestCallBackrDto, description: 'Request call back  details' })

  @ApiConflictResponse({ description: 'An error occured' })
  @ApiCreatedResponse({ description: 'successfully' })
  async requestCallback(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('countryCode') countryCode: string,
    @Body('description') description: string,
    @Body('travelDate') travelDate: Date,
    @Body('phone') phone: string,
    @Body('traverllerCount') traverllerCount: number,
    @Body('tourId') tourId: string,

  ) {
    try {
      return await this.authService.requestCallBack({
        email,
        name,
        countryCode,
        phone,
        description,
        travelDate,
        traverllerCount,
        tourId
      });

    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'User with this email does not exists' };
      }
      throw error;
    }
  }





}
