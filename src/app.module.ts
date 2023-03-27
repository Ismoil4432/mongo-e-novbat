import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OtpModule } from './otp/otp.module';
import { SpecialistModule } from './specialist/specialist.module';
import { SpecWorkingDayModule } from './spec_working_day/spec_working_day.module';
import { ServiceModule } from './service/service.module';
import { SpecServiceModule } from './spec_service/spec_service.module';
import { QueueModule } from './queue/queue.module';
import { AdminModule } from './admin/admin.module';
import { TokenModule } from './token/token.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constant';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ClientModule,
    OtpModule,
    SpecialistModule,
    SpecWorkingDayModule,
    ServiceModule,
    SpecServiceModule,
    QueueModule,
    AdminModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
