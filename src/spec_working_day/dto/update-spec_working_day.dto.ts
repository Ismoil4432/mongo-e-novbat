import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecWorkingDayDto } from './create-spec_working_day.dto';

export class UpdateSpecWorkingDayDto extends PartialType(CreateSpecWorkingDayDto) {}
