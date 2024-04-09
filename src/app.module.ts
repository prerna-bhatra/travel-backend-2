import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { DestinationInfo, DestinationSchema } from './models/tour.model';
import { MulterModule } from '@nestjs/platform-express';
import { RequestCallBack, RequestCallBackSchema } from './models/requestCallBack.model';

dotenv.config(); // Make sure this line is present

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads', // Destination folder for storing uploaded files
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: DestinationInfo.name, schema: DestinationSchema },
      { name: RequestCallBack.name, schema: RequestCallBackSchema }
    ]
    ),
    AuthModule
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule { }

