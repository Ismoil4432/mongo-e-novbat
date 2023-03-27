import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('create')
  async create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @Get()
  async findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.otpService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(id, updateOtpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.otpService.remove(id);
  }
}
