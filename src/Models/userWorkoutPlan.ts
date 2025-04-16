import mongoose, { Schema, Document, Model } from "mongoose";

interface IUserWorkoutPlan extends Document {
  userId: mongoose.Types.ObjectId;
  workoutPlans: mongoose.Types.ObjectId[];
}

const userWorkoutPlanSchema = new Schema<IUserWorkoutPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workoutPlans: [{ type: Schema.Types.ObjectId, ref: "WorkoutPlan" }],
  },
  { timestamps: true }
);

const UserWorkoutPlan: Model<IUserWorkoutPlan> =
  mongoose.models.UserWorkoutPlan ||
  mongoose.model<IUserWorkoutPlan>("UserWorkoutPlan", userWorkoutPlanSchema);

export default UserWorkoutPlan;
