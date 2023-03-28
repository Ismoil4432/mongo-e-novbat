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
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('verify/:typeModel')
  async verifyOtp(
    @Param('typeModel') typeModel,
    @Body() verifyOtpDto: VerifyOtpDto,
  ) {
    return this.otpService.verifyOtp(verifyOtpDto, typeModel);
  }

  @Get()
  async findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.otpService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.otpService.remove(id);
  }
}
