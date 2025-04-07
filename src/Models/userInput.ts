import mongoose, { Schema, Document, Model } from "mongoose";

interface Schedule {
  days_per_week: number;
  session_duration: number;
}

export interface IUserInput extends Document {
  goal: string;
  fitness_level: string;
  preferences: string[];
  health_conditions: string[];
  schedule: Schedule;
  plan_duration_weeks: number;
  lang: string;
}

const userInputSchema = new Schema<IUserInput>({
  goal: { type: String, required: true },
  fitness_level: { type: String, required: true },
  preferences: { type: [String], required: true },
  health_conditions: { type: [String], required: true },
  schedule: {
    days_per_week: { type: Number, required: true },
    session_duration: { type: Number, required: true },
  },
  plan_duration_weeks: { type: Number, required: true },
  lang: { type: String, required: true },
});

const UserInput: Model<IUserInput> =
  mongoose.models.UserInput ||
  mongoose.model<IUserInput>("UserInput", userInputSchema);

export default UserInput;
