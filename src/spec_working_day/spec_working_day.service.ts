import { Injectable } from '@nestjs/common';
import { CreateSpecWorkingDayDto } from './dto/create-spec_working_day.dto';
import { UpdateSpecWorkingDayDto } from './dto/update-spec_working_day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SpecWorkingDay, SpecWorkingDayDocument } from './schemas/spec_working_day.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecWorkingDayService {
  constructor(
    @InjectModel(SpecWorkingDay.name) private specWorkingDayModel: Model<SpecWorkingDayDocument>,
  ) {}

  async create(createSpecWorkingDayDto: CreateSpecWorkingDayDto): Promise<SpecWorkingDay> {
    const createdSpecWorkingDay = await this.specWorkingDayModel.create(createSpecWorkingDayDto);
    return createdSpecWorkingDay;
  }

  async findAll(): Promise<SpecWorkingDay[]> {
    return this.specWorkingDayModel.find();
  }

  async findById(id: string) {
    return this.specWorkingDayModel.findById(id);
  }

  async update(id: string, updateSpecWorkingDayDto: UpdateSpecWorkingDayDto) {
    return this.specWorkingDayModel.findByIdAndUpdate(id, updateSpecWorkingDayDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.specWorkingDayModel.findByIdAndDelete(id);
  }
}
