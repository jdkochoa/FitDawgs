"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Mock user data for now
  const user = {
    firstName: "Katherine",
    profilePicture: "/images/profile.jpeg",
    workoutPlan: {
      goal: "Build Muscle",
      fitnessLevel: "Intermediate",
      preferences: ["Strength Training", "Cardio"],
      time: "60 minutes per session",
      frequency: "4 days per week",
      planDuration: "12 weeks",
    },
  };

  const handleRemovePlan = () => {
    // Logic to remove the workout plan
    console.log("Workout plan removed");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white pt-16">
      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-8">
          <img
            src={user.profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-red-700"
          />

          <div className="text-right">
            <h1 className="text-2xl font-semibold text-red-700">
              Hi {user.firstName}!
            </h1>
            <p className="text-lg">
              Welcome back to FitDawgs. On your profile, you can view your current workout plan here, or
              delete your current plan and add a new one!
            </p>
          </div>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Workout Plan</h2>
          <p className="mb-2">
            <strong>Goal:</strong> {user.workoutPlan.goal}
          </p>
          <p className="mb-2">
            <strong>Fitness Level:</strong> {user.workoutPlan.fitnessLevel}
          </p>
          <p className="mb-2">
            <strong>Preferences:</strong> {user.workoutPlan.preferences.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Time:</strong> {user.workoutPlan.time}
          </p>
          <p className="mb-2">
            <strong>Frequency:</strong> {user.workoutPlan.frequency}
          </p>
          <p className="mb-4">
            <strong>Plan Duration:</strong> {user.workoutPlan.planDuration}
          </p>

          <div className="flex justify-between">
            <button
              onClick={() => router.push("/calendar")}
              className="bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:bg-gray-100"
            >
              Calendar & Workout View
            </button>

            <button
              onClick={handleRemovePlan}
              className="bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:bg-gray-100"
            >
              Remove This Workout Plan
            </button>
          </div>
        </div>

        <div
          onClick={() => router.push("/new-workout")}
          className="bg-black text-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-800"
        >
          <h2 className="text-xl font-semibold">Add a New Workout Plan</h2>
        </div>
      </div>
    </div>
  );
}