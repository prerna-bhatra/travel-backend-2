// auth.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

import { ResponseDto } from 'src/response.dto';
import { RequestCallBack, RequestCallBackDocument } from 'src/models/requestCallBack.model';
import { RequestCallBackrDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RequestCallBack.name) private requestCallBackModel: Model<RequestCallBackDocument>
  ) { }

  async createUser(email: string, password: string, name: string, phone: string, countryCode: string): Promise<ResponseDto> {
    console.log({ email });

    const existingUser = await this.findUserByEmail(email);
    console.log({ existingUser });


    if (existingUser) {
      return {
        success: false,
        message: "User exists"
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({ email, password: hashedPassword, name, phone, countryCode });
    createdUser.save();

    return {
      success: true,
      message: "Your account has been created succefully"
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<ResponseDto> {
    const user = await this.findUserByEmail(email);

    console.log("user", user);

    // if (!user.emailVerified) {
    //   return {
    //     success: false,
    //     message: "Verify your email by otp"
    //   }
    // }

    console.log({ name: user.name, ph: user.phone });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.generateToken({
        email: user.email,
        id: user._id,
        userType: user.userType,
        phone: user.phone,
        name: user.name,
      });
      console.log({ token });

      return {
        success: true,
        message: "Logged in",
        data: { token, userInfo: { name: user.name, phone: user.phone, id: user._id, userType: user.userType, email: user.email } }
      }
    }
    else {
      return {
        success: false,
        message: "Password not correct"
      }
    }

  }

  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.id, email: user.email, userType: user.userType };
    return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '40h' });
  }



  // Function to send email
  async sendEmailToAdmin(requestDetails) {
    // Create nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'bhatraprerna061@gmail.com', // Your email address
        pass: 'ojmd jaqn ppsc dyqe' // Your email password
      }
    });

    // Email content
    let mailOptions = {
      from: 'bhatraprerna@gmail.com', // Sender email address
      to: 'bhatraprerna061@gmail.com', // Receiver email address
      subject: 'New callback request', // Email subject
      html: `
            <p>You have received a new callback request:</p>
            <table border="1">
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Country Code</th>
                    <th>Description</th>
                    <th>Travel Date</th>
                    <th>Phone</th>
                    <th>Traveler Count</th>
                    <th>Tour ID</th>
                </tr>
                <tr>
                    <td>${requestDetails.email}</td>
                    <td>${requestDetails.name}</td>
                    <td>${requestDetails.countryCode}</td>
                    <td>${requestDetails.description}</td>
                    <td>${requestDetails.travelDate}</td>
                    <td>${requestDetails.phone}</td>
                    <td>${requestDetails.travelerCount}</td>
                    <td>${requestDetails.tourId}</td>
                </tr>
            </table>
        `
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Email sent: %s', info.messageId);
  }


  async requestCallBack(data: RequestCallBackrDto) {
    try {
      const saveReq = new this.requestCallBackModel(data);
      saveReq.save();

      this.sendEmailToAdmin(data)

      return {
        success: true,
        message: "Your request has been sent to the trippy tales"
      }
    }
    catch (error) {
      throw error
    }
  }

}
