import { Module } from '@nestjs/common';
import { SpecServiceService } from './spec_service.service';
import { SpecServiceController } from './spec_service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecService, SpecServiceSchema } from './schemas/spec_service.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SpecService.name, schema: SpecServiceSchema }]),
    JwtModule.register({}),
  ],
  controllers: [SpecServiceController],
  providers: [SpecServiceService],
})
export class SpecServiceModule {}
