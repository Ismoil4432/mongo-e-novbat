import { Injectable } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Specialist, SpecialistDocument } from './schemas/specialist.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialistService {
  constructor(
    @InjectModel(Specialist.name) private specialistModel: Model<SpecialistDocument>,
  ) {}

  async create(createSpecialistDto: CreateSpecialistDto): Promise<Specialist> {
    const createdSpecialist = await this.specialistModel.create(createSpecialistDto);
    return createdSpecialist;
  }

  async findAll(): Promise<Specialist[]> {
    return this.specialistModel.find();
  }

  async findById(id: string) {
    return this.specialistModel.findById(id);
  }

  async update(id: string, updateSpecialistDto: UpdateSpecialistDto) {
    return this.specialistModel.findByIdAndUpdate(id, updateSpecialistDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.specialistModel.findByIdAndDelete(id);
  }
}
