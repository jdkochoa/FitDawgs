import mongoose, { Schema, Document, Model } from "mongoose";

interface IExercise {
  name: string;
  duration: string;
  repetitions: string;
  sets: string;
  equipment: string;
}

interface IWorkoutDay {
  day: string;
  exercises: IExercise[];
}

interface ISchedule {
  days_per_week: number;
  session_duration: number;
}

export interface IWorkoutPlan extends Document {
  goal: string;
  fitness_level: string;
  total_weeks: number;
  schedule: ISchedule;
  exercises: IWorkoutDay[];
  seo_title: string;
  seo_content: string;
  seo_keywords: string;
  cacheTime?: number;
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  repetitions: { type: String, required: true },
  sets: { type: String, required: true },
  equipment: { type: String, required: true },
});

const workoutDaySchema = new Schema<IWorkoutDay>({
  day: { type: String, required: true },
  exercises: { type: [exerciseSchema], required: true },
});

const scheduleSchema = new Schema<ISchedule>({
  days_per_week: { type: Number, required: true },
  session_duration: { type: Number, required: true },
});

const workoutPlanSchema = new Schema<IWorkoutPlan>({
  goal: { type: String, required: true },
  fitness_level: { type: String, required: true },
  total_weeks: { type: Number, required: true },
  schedule: { type: scheduleSchema, required: true },
  exercises: { type: [workoutDaySchema], required: true },
  seo_title: { type: String, required: true },
  seo_content: { type: String, required: true },
  seo_keywords: { type: String, required: true },
  cacheTime: { type: Number },
});

const WorkoutPlan: Model<IWorkoutPlan> =
  mongoose.models.WorkoutPlan ||
  mongoose.model<IWorkoutPlan>("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
