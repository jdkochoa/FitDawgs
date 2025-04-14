"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWorkoutForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    day: "",
    week: "",
    duration: "",
    startTime: "",
    endTime: "",
    activities: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log the data to the console
    console.log("New Workout Submitted:", formData);

    // Clear the form fields
    setFormData({
      day: "",
      week: "",
      duration: "",
      startTime: "",
      endTime: "",
      activities: "",
    });

    // Navigate back to the calendar page
    router.push("/calendar");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
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
            <label htmlFor="week" className="block text-left font-semibold mb-1">
              Week of the Plan
            </label>
            <select
              id="week"
              name="week"
              value={formData.week}
              onChange={handleChange}
              className="w-full border p-3 text-lg"
              required
            >
              <option value="">Select a week</option>
              {[...Array(15)].map((_, i) => (
                <option key={i + 1}>{`Week ${i + 1}`}</option>
              ))}
            </select>
          </div>

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
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
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
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 font-semibold hover:bg-red-700"
      >
        Add Workout
      </button>

      {/* Return to Calendar Button */}
      <button
        type="button"
        onClick={() => router.push("/calendar")}
        className="w-full bg-gray-600 text-white py-3 font-semibold hover:bg-gray-700"
      >
        Return to Calendar
      </button>
    </form>
  );
}