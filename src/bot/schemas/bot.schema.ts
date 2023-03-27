import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BotDocument = HydratedDocument<Bot>;

@Schema()
export class Bot {
  @Prop()
  user_id: number;

  @Prop()
  username: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number: string;

  @Prop()
  status: boolean;
}

export const BotSchema = SchemaFactory.createForClass(Bot);
