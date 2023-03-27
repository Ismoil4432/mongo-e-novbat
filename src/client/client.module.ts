import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { JwtModule } from '@nestjs/jwt';
import { BotModule } from '../bot/bot.module';
import { OtpModule } from '../otp/otp.module';
import { Otp, OtpSchema } from '../otp/schemas/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    JwtModule.register({}),
    BotModule,
    OtpModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
