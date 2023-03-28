import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
    ]),
    JwtModule.register({}),
    OtpModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
