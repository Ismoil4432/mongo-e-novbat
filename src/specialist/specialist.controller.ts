import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Controller('specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post('create')
  async create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistService.create(createSpecialistDto);
  }

  @Get()
  async findAll() {
    return this.specialistService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.specialistService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
  ) {
    return this.specialistService.update(id, updateSpecialistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.specialistService.remove(id);
  }
}
