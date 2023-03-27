import mongoose from "mongoose";

export class CreateSpecServiceDto {
  spec_id: mongoose.Schema.Types.ObjectId;
  service_id: mongoose.Schema.Types.ObjectId;
  spec_service_price: number;
}
