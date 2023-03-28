import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { Model } from 'mongoose';
import { AddMinutesToDate } from './../helpers/addMinutes';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { BOT_NAME } from '../app.constant';
import { Client, ClientDocument } from '../client/schemas/client.schema';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import {
  Specialist,
  SpecialistDocument,
} from '../specialist/schemas/specialist.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Specialist.name)
    private specialistModel: Model<SpecialistDocument>,
    private readonly botService: BotService,
  ) {}

  async newOtp(
    id: string,
    phone_number: string,
    otp_id: string,
    typeModel: 'clientModel' | 'specialistModel',
  ) {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend) {
      throw new HttpException(
        `Avval quyidagi Botdan ro'yhatdan o'ting: https://t.me/${BOT_NAME}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    const newOtp = await this.otpModel.create({
      otp,
      expiration_time,
    });
    await this.otpModel.findByIdAndRemove(otp_id);
    if (typeModel === 'clientModel') {
      await this.clientModel.findByIdAndUpdate(id, {
        otp_id: newOtp.id,
      });
    } else if (typeModel === 'specialistModel') {
      await this.specialistModel.findByIdAndUpdate(id, {
        otp_id: newOtp.id,
      });
    }
    const details = {
      timestamp: now,
      success: true,
      message: 'OTP sent to user',
      check: phone_number,
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }

  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
    typeModel: 'client' | 'specialist',
  ) {
    const { verification_key, otp, check } = verifyOtpDto;
    const currentDate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if (check_obj != check) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }
    const result = await this.otpModel.findOne({ _id: obj.otp_id });

    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentDate)) {
          if (otp === result.otp) {
            let user: any;
            let schemaName: string;
            if (typeModel === 'client') {
              user = await this.clientModel.findOne({
                client_phone_number: check,
              });
              schemaName = 'client';
            } else if (typeModel === 'specialist') {
              user = await this.specialistModel.findOne({
                spec_phone_number: check,
              });
              schemaName = 'specialist';
            }
            if (user) {
              await this.otpModel.findOneAndUpdate(
                { _id: obj.otp_id },
                { verified: true },
                { new: true },
              );
              const response = {
                message: 'User verified successfully',
                url: `http://localhost:${process.env.PORT}/api/${schemaName}/update/${user.id}`,
                method: 'PATCH',
                success: true,
              };
              if (
                user.client_first_name ||
                user.client_last_name ||
                user.client_info ||
                user.client_photo
              ) {
                response.url = `http://localhost:${process.env.PORT}/api/${schemaName}`;
                response.method = 'GET';
              }
              return response;
            }
          } else {
            throw new BadRequestException('OTP does not match');
          }
        } else {
          throw new BadRequestException('OTP expired');
        }
      } else {
        throw new BadRequestException('OTP already used');
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async findAll(): Promise<Otp[]> {
    return this.otpModel.find();
  }

  async findById(id: string) {
    return this.otpModel.findById(id);
  }

  async remove(id: string) {
    return this.otpModel.findByIdAndDelete(id);
  }
}
