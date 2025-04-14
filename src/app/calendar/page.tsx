"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";

export default function CalendarPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock workout data for now
  const workouts = [
    {
      title: "Week 1 Workout 1",
      day: "Monday",
      duration: "60 minutes",
      time: "10:30 AM to 11:30 AM",
      details: ["Push-ups", "Squats", "Plank"],
    },
    {
      title: "Week 1 Workout 2",
      day: "Wednesday",
      duration: "45 minutes",
      time: "2:00 PM to 2:45 PM",
      details: ["Running", "Lunges", "Stretching"],
    },
    {
      title: "Week 1 Workout 3",
      day: "Friday",
      duration: "30 minutes",
      time: "6:00 PM to 6:30 PM",
      details: ["Yoga", "Meditation"],
    },
    {
      title: "Week 2 Workout 1",
      day: "Monday",
      duration: "60 minutes",
      time: "9:00 AM to 10:00 AM",
      details: ["Deadlifts", "Bench Press", "Pull-ups"],
    },
    {
      title: "Week 2 Workout 2",
      day: "Wednesday",
      duration: "50 minutes",
      time: "4:00 PM to 4:50 PM",
      details: ["Cycling", "Core Exercises"],
    },
  ];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < workouts.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-semibold mb-6 text-red-700">My Workouts</h1>

      {/* this is the carousel that will move the cards */}
      <div className="relative w-full max-w-7xl">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full z-10"
          disabled={currentIndex === 0}
        >
          &lt;
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 20}rem)`,
            }}
          >
            {workouts.map((workout, index) => (
              <WorkoutCard
                key={index}
                title={workout.title}
                day={workout.day}
                duration={workout.duration}
                time={workout.time}
                details={workout.details}
                onEdit={() => alert(`Edit ${workout.title}`)}
                onDelete={() => alert(`Delete ${workout.title}`)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full z-10"
          disabled={currentIndex >= workouts.length - 3}
        >
          &gt;
        </button>
      </div>

      {/* Buttons at the bottom */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/profile")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
        >
          View Profile and Workout Plan
        </button>
        <button
          onClick={() => router.push("/add-workout")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded"
        >
          Add Workout
        </button>
      </div>
    </div>
  );
}