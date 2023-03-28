import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { JwtModule } from '@nestjs/jwt';
import { BotModule } from '../bot/bot.module';
import { Client, ClientSchema } from '../client/schemas/client.schema';
import { SpecialistModule } from '../specialist/specialist.module';
import { Specialist, SpecialistSchema } from '../specialist/schemas/specialist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialist.name, schema: SpecialistSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    JwtModule.register({}),
    BotModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
