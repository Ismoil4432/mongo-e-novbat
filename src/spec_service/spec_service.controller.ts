import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecServiceService } from './spec_service.service';
import { CreateSpecServiceDto } from './dto/create-spec_service.dto';
import { UpdateSpecServiceDto } from './dto/update-spec_service.dto';

@Controller('spec-service')
export class SpecServiceController {
  constructor(private readonly specServiceService: SpecServiceService) {}

  @Post('create')
  async create(@Body() createSpecServiceDto: CreateSpecServiceDto) {
    return this.specServiceService.create(createSpecServiceDto);
  }

  @Get()
  async findAll() {
    return this.specServiceService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.specServiceService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpecServiceDto: UpdateSpecServiceDto,
  ) {
    return this.specServiceService.update(id, updateSpecServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.specServiceService.remove(id);
  }
}
