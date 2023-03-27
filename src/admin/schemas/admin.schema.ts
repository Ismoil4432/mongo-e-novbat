import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  admin_name: string;

  @Prop()
  admin_phone_number: string;

  @Prop()
  admin_hashed_password: string;

  @Prop({ default: true })
  admin_is_active: boolean;

  @Prop({ default: true })
  admin_is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
