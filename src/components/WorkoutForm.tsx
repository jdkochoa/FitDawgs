"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    goal: "",
    fitnessLevel: "",
    preferences: "",
    sessionDuration: "",
    daysPerWeek: "",
    planDuration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.goal ||
      !formData.fitnessLevel ||
      !formData.preferences ||
      !formData.sessionDuration ||
      !formData.daysPerWeek ||
      !formData.planDuration
    ) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Workout Plan Submitted:", formData);
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 ^grid there*/}
        <div className="space-y-4">
          <div>
            <label htmlFor="goal" className="block text-left font-semibold mb-1">
              Goal
            </label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select a goal</option>
              <option>Build Muscle</option>
              <option>Lose Weight</option>
              <option>Increase Endurance</option>
              <option>Improve Flexibility</option>
              <option>Gain Strength</option>
              <option>Enhance Athletic Performance</option>
              <option>Tone and Sculpt</option>
              <option>Improve Heart Health</option>
              <option>Increase Mobility</option>
              <option>Support Mental Health/Stress Relief</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="fitnessLevel"
              className="block text-left font-semibold mb-1"
            >
              Fitness Level
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select your fitness level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="preferences"
              className="block text-left font-semibold mb-1"
            >
              Preferences
            </label>
            <select
              id="preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select your preferences</option>
              <option>Weight Training</option>
              <option>Cardio</option>
              <option>HIIT (High-Intensity Interval Training)</option>
              <option>Yoga</option>
              <option>Pilates</option>
              <option>Bodyweight Workouts</option>
              <option>CrossFit or Functional Fitness</option>
              <option>Dance-Based Workouts (e.g., Zumba)</option>
              <option>Running or Walking</option>
              <option>Cycling or Spinning</option>
            </select>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="sessionDuration"
              className="block text-left font-semibold mb-1"
            >
              Daily Workout Duration (Minutes)
            </label>
            <select
              id="sessionDuration"
              name="sessionDuration"
              value={formData.sessionDuration}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select session duration</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="daysPerWeek"
              className="block text-left font-semibold mb-1"
            >
              Workouts Per Week
            </label>
            <select
              id="daysPerWeek"
              name="daysPerWeek"
              value={formData.daysPerWeek}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select number of workouts per week</option>
              {[...Array(7)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="planDuration"
              className="block text-left font-semibold mb-1"
            >
              Plan Duration (Weeks)
            </label>
            <select
              id="planDuration"
              name="planDuration"
              value={formData.planDuration}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select duration</option>
              {[...Array(15)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 font-semibold hover:bg-red-700"
      >
        Create Workout Plan
      </button>
    </form>
  );
}