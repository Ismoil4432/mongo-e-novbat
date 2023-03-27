import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const createdAdmin = await this.adminModel.create(createAdminDto);
    return createdAdmin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find();
  }

  async findById(id: string) {
    return this.adminModel.findById(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
