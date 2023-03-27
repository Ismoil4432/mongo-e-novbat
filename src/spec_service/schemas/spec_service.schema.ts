import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SpecServiceDocument = HydratedDocument<SpecService>;

@Schema()
export class SpecService {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' })
  spec_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Service' })
  service_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  spec_service_price: number;
}

export const SpecServiceSchema = SchemaFactory.createForClass(SpecService);
