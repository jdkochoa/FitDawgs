import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
export interface IUserInput extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Define the Mongoose schema
const UserInputSchema = new Schema<IUserInput>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model re-compilation
const UserInputModel = mongoose.models.UserInput || mongoose.model<IUserInput>("UserInput", UserInputSchema);

export default UserInputModel;
