import mongoose from "mongoose";

export class CreateTokenDto {
  table_name: string;
  user_id: mongoose.Schema.Types.ObjectId;
  user_os: string;
  user_device: string;
}
