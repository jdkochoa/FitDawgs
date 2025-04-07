import mongoose, { Schema, Document, Model } from "mongoose";

interface IClassTime extends Document {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    start: string;
    end: string;
  }
  
  const classTimeSchema = new Schema<IClassTime>({
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
  });
  

const ClassTime: Model<IClassTime> =
  mongoose.models.ClassTime || mongoose.model<IClassTime>("ClassTime", classTimeSchema);

export default ClassTime;
