import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { Model } from 'mongoose';
import { AddMinutesToDate } from './../helpers/addMinutes';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async create(createOtpDto: CreateOtpDto): Promise<Otp> {
    const createdOtp = await this.otpModel.create({
      ...createOtpDto,
      expiration_time: AddMinutesToDate(new Date(), 5),
    });
    return createdOtp;
  }

  async findAll(): Promise<Otp[]> {
    return this.otpModel.find();
  }

  async findById(id: string) {
    return this.otpModel.findById(id);
  }

  async update(id: string, updateOtpDto: UpdateOtpDto) {
    return this.otpModel.findByIdAndUpdate(id, updateOtpDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.otpModel.findByIdAndDelete(id);
  }
}
