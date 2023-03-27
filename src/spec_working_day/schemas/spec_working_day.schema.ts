import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SpecWorkingDayDocument = HydratedDocument<SpecWorkingDay>;

@Schema()
export class SpecWorkingDay {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' })
  spec_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  day_of_week: number;

  @Prop()
  start_time: Date;

  @Prop()
  finish_time: Date;

  @Prop()
  rest_start_time: Date;

  @Prop()
  rest_finish_time: Date;
}

export const SpecWorkingDaySchema =
  SchemaFactory.createForClass(SpecWorkingDay);
