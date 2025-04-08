import mongoose, { Schema, Document, Model } from "mongoose";

interface IUserClassTime extends Document {
  userId: mongoose.Types.ObjectId;
  classTimes: mongoose.Types.ObjectId[];
}

const userClassTimeSchema = new Schema<IUserClassTime>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  classTimes: [{ type: Schema.Types.ObjectId, ref: "ClassTime" }],
});

const UserClassTime: Model<IUserClassTime> =
  mongoose.models.UserClassTime ||
  mongoose.model<IUserClassTime>("UserClassTime", userClassTimeSchema);

export default UserClassTime;
