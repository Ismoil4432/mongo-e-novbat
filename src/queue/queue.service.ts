import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Queue, QueueDocument } from './schemas/queue.schema';
import { Model } from 'mongoose';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name) private queueModel: Model<QueueDocument>,
  ) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const createdQueue = await this.queueModel.create(createQueueDto);
    return createdQueue;
  }

  async findAll(): Promise<Queue[]> {
    return this.queueModel.find();
  }

  async findById(id: string) {
    return this.queueModel.findById(id);
  }

  async update(id: string, updateQueueDto: UpdateQueueDto) {
    return this.queueModel.findByIdAndUpdate(id, updateQueueDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.queueModel.findByIdAndDelete(id);
  }
}
