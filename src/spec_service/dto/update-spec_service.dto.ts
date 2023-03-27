import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecServiceDto } from './create-spec_service.dto';

export class UpdateSpecServiceDto extends PartialType(CreateSpecServiceDto) {}
