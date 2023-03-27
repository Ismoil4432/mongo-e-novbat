import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('create')
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  async findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.tokenService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTokenDto: UpdateTokenDto,
  ) {
    return this.tokenService.update(id, updateTokenDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}
