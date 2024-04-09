import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { RequestCallBack, RequestCallBackSchema } from 'src/models/requestCallBack.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: RequestCallBack.name, schema: RequestCallBackSchema }
  ])],
  controllers: [AuthController],
  providers:[AuthService]

})
export class AuthModule {}
