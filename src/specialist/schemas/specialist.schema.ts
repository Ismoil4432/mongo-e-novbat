import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SpecialistDocument = HydratedDocument<Specialist>;

@Schema()
export class Specialist {
  @Prop()
  spec_position: string;

  @Prop()
  spec_last_name: string;

  @Prop()
  spec_first_name: string;

  @Prop()
  spec_middle_name: string;

  @Prop()
  spec_birth_day: string;

  @Prop()
  spec_photo: string;

  @Prop()
  spec_phone_number: string;

  @Prop()
  spec_info: string;

  @Prop({ default: true })
  spec_is_active: boolean;

  @Prop({ default: true })
  show_position: boolean;

  @Prop({ default: true })
  show_last_name: boolean;

  @Prop({ default: true })
  show_first_name: boolean;

  @Prop({ default: true })
  show_middle_name: boolean;

  @Prop({ default: true })
  show_birth_day: boolean;

  @Prop({ default: true })
  show_photo: boolean;

  @Prop({ default: true })
  show_social: boolean;

  @Prop({ default: true })
  show_phone_number: boolean;

  @Prop({ default: true })
  show_info: boolean;

  @Prop({ default: true })
  show_is_active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Otp' })
  otp_id: mongoose.Schema.Types.ObjectId;
}

export const SpecialistSchema = SchemaFactory.createForClass(Specialist);
