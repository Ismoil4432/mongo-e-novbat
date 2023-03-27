import { Injectable } from '@nestjs/common';
import { CreateSpecServiceDto } from './dto/create-spec_service.dto';
import { UpdateSpecServiceDto } from './dto/update-spec_service.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SpecService,
  SpecServiceDocument,
} from './schemas/spec_service.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecServiceService {
  constructor(
    @InjectModel(SpecService.name)
    private specServiceModel: Model<SpecServiceDocument>,
  ) {}

  async create(
    createSpecServiceDto: CreateSpecServiceDto,
  ): Promise<SpecService> {
    const createdSpecService = await this.specServiceModel.create(
      createSpecServiceDto,
    );
    return createdSpecService;
  }

  async findAll(): Promise<SpecService[]> {
    return this.specServiceModel.find();
  }

  async findById(id: string) {
    return this.specServiceModel.findById(id);
  }

  async update(id: string, updateSpecServiceDto: UpdateSpecServiceDto) {
    return this.specServiceModel.findByIdAndUpdate(id, updateSpecServiceDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.specServiceModel.findByIdAndDelete(id);
  }
}
