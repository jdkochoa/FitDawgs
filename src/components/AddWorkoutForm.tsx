"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWorkoutForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    day: "",
    duration: "",
    startTime: "", // not in the DB yet, but shows on the workout cards
    endTime: "", // not in the Db yet, but shows on the workout cards
    activities: "",
  });

  // change handler for input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const planId = "67fe76929ac558fd9e8773fd"; // NEED TO UPDATE THIS TO WORK DYNAMICALLY

    // Need to see what the user should submit right now I only have it getting the name 
    // Need to have different input fields for exercises reps and sets if that is the case but idk
    const activitiesInput = formData.activities.split(",").map((activity) => ({
      name: activity.trim(),
      duration: `${formData.duration} minutes`,
      repetitions: "N/A",
      sets: "N/A",
      equipment: "None", // Or collect from user if needed
    }));

    const totalInformation = {
      day: formData.day,
      exercises: activitiesInput,
    };

    const res = await fetch(`/api/workoutDay/${planId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(totalInformation),
    });

    const result = await res.json();
    console.log("New Workout Added:", result);

    // Clear form data
    setFormData({
      day: "",
      duration: "",
      startTime: "",
      endTime: "",
      activities: "",
    });

    router.push("/calendar");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Col 1 */}
        <div className="space-y-4">
          <div>
            <label htmlFor="day" className="block text-left font-semibold mb-1">
              Day of the Week
            </label>
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select a day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>


          <div>
            <label htmlFor="startTime" className="block text-left font-semibold mb-1">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="activities" className="block text-left font-semibold mb-1">
              Activities
            </label>
            <textarea
              id="activities"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              rows={4}
              placeholder="Enter activities separated by commas (e.g., Push-ups, Squats, Plank)"
              required
            />
          </div>


        </div>

        {/* Col 2 */}
        <div className="space-y-4">
        <div>
            <label htmlFor="duration" className="block text-left font-semibold mb-1">
              Workout Duration (Minutes)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select duration</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>

          <div>
            <label htmlFor="endTime" className="block text-left font-semibold mb-1">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            />
          </div>


        </div>
      </div >

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 font-semibold hover:bg-red-700"
      >
        Add Workout
      </button>

      <button
        type="button"
        onClick={() => router.push("/calendar")}
        className="w-full bg-gray-600 text-white py-3 font-semibold hover:bg-gray-700"
      >
        Return to Calendar
      </button>
    </form >
  );
}