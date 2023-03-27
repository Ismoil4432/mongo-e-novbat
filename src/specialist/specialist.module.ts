import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialist, SpecialistSchema } from './schemas/specialist.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Specialist.name, schema: SpecialistSchema }]),
    JwtModule.register({}),
  ],
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
