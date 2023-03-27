import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('create')
  async create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @Get()
  async findAll() {
    return this.queueService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.queueService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ) {
    return this.queueService.update(id, updateQueueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.queueService.remove(id);
  }
}
