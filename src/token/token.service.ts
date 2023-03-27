import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const createdToken = await this.tokenModel.create(createTokenDto);
    return createdToken;
  }

  async findAll(): Promise<Token[]> {
    return this.tokenModel.find();
  }

  async findById(id: string) {
    return this.tokenModel.findById(id);
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.tokenModel.findByIdAndUpdate(id, updateTokenDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.tokenModel.findByIdAndDelete(id);
  }
}
