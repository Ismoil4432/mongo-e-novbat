import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { JwtService } from '@nestjs/jwt';
import { Otp, OtpDocument } from '../otp/schemas/otp.schema';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode } from '../helpers/crypto';
import { BOT_NAME } from './../app.constant';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private readonly botService: BotService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { client_phone_number } = createClientDto;
    const user = await this.clientModel.findOne({ client_phone_number });
    if (!user) {
      const createdClient = await this.clientModel.create(createClientDto);
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const isSend = await this.botService.sendOTP(client_phone_number, otp);
      if (!isSend) {
        throw new HttpException(
          `Avval quyidagi Botdan ro'yhatdan o'ting: https://t.me/${BOT_NAME}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      // await this.otpModel.findOneAndRemove({
      //   check: client_phone_number,
      //   verified: false,
      // });
      const newOtp = await this.otpModel.create({
        otp,
        expiration_time,
      });
      const updatedClient = await this.clientModel.findByIdAndUpdate(
        createdClient.id,
        { otp_id: newOtp.id },
      );
      const details = {
        timestamp: now,
        success: true,
        message: 'OTP sent to user',
        otp_id: newOtp.id,
      };
      const encoded = await encode(JSON.stringify(details));
      return { status: 'Success', Details: encoded };
    } else
    if (user) {
      throw new BadRequestException('Phone number already exists!');
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find();
  }

  async findById(id: string) {
    return this.clientModel.findById(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
