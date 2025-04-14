//add a new individual workout
"use client";

import AddWorkoutForm from "../../components/AddWorkoutForm";

export default function AddWorkoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-4xl text-center">
        <h1 className="text-2xl font-semibold mb-6 text-red-700">Add a New Workout</h1>
        <AddWorkoutForm />
      </div>
    </div>
  );
}