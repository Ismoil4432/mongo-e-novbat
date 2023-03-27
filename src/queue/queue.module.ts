import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './schemas/queue.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
    JwtModule.register({}),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
