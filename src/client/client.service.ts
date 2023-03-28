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
import { OtpService } from '../otp/otp.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly otpService: OtpService,
  ) {}

  async auth(createClientDto: CreateClientDto) {
    const { client_phone_number } = createClientDto;
    let user = await this.clientModel.findOne({ client_phone_number });
    if (!user) {
      user = await this.clientModel.create(createClientDto);
    }
    const { id, client_phone_number: phone_number, otp_id } = user;
    const otpResponse = await this.otpService.newOtp(
      String(id),
      String(phone_number),
      String(otp_id),
      'clientModel',
    );
    return otpResponse;
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
