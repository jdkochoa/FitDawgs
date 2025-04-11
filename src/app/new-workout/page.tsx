"use client";

import WorkoutForm from "@/components/WorkoutForm";

export default function AddWorkoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-4xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Create Your Workout Plan</h1>
        <p className="mb-6">
          Let’s customize your workout plan to fit your goals and preferences.
        </p>
        <WorkoutForm />
      </div>
    </div>
  );
}