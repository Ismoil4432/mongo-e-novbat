import mongoose from "mongoose";

export class CreateSpecWorkingDayDto {
  spec_id: mongoose.Schema.Types.ObjectId;
  day_of_week: number;
  start_time: Date;
  finish_time: Date;
  rest_start_time: Date;
  rest_finish_time: Date;
}
