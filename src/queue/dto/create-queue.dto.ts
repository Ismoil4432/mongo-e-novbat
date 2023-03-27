import mongoose from "mongoose";

export class CreateQueueDto {
  spec_service_id: mongoose.Schema.Types.ObjectId;
  client_id: mongoose.Schema.Types.ObjectId;
}
