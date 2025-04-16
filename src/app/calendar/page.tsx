"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log("Fetching workout data...");

    //This will be used (or something similar) to get specific users
    /*  import { useSession } from "next-auth/react";
    const { data: session } = useSession();
    const userId = session?.user?.id;*/
    const planId = "67fe76929ac558fd9e8773fd";
    const userClass = "67f459aa82fa6fa47b198cbb";

    //const classIds = array of classtime ids

    const fetchWorkoutData = async () => {
      try {
        // Get the workout plan for use in populating cards
        const res = await fetch(`/api/workoutPlan/${planId}`);
        const data = await res.json();

        console.log("Workout plan data:", data);
        const exercises = data.exercises || [];

        // For testing (use F12 while Fitdawgs tab active to see console)
        //const jsonString = JSON.stringify(data);
        //console.log("Workout plan JSON:", jsonString);

        /*
        Here is where logic will go for getting user class times
        and setting the workouts at times that are not the user class times
        this is to be done for the cards. A pseudo logic is below in comments
        */
        /*===================================================================
        const res1 = await fetch(`/api/userClassTime/${userClass}`);
        const data1 = await res1.json();

        console.log("UserClass plan data:", data1);
        const exercises1 = data1.exercises1 || [];

        const jsonString1 = JSON.stringify(data1);
        console.log("UserClass plan JSON:", jsonString1);
        //======================
        const res2 = await fetch(`/api/classTime/67f44fed6413f4d095ac3a40`); //classid[0], 1, 2 etc
        const data2 = await res2.json();

        console.log("ClassTime plan data:", data2);
        const exercises2 = data2.exercises2 || [];

        const jsonString2 = JSON.stringify(data2);
        console.log("ClassTime plan JSON:", jsonString2);
        //==============================================================*/
        // Map the exercises to the structure for the workout cards
        // Look at this in the website, use pay attention to the DB to see what
        // is being added and how
        const mappedWorkouts = exercises.map((dayBlock: any, i: number) => ({
          title: `Week ${Math.floor(i / 3) + 1} Workout ${(i % 3) + 1}`,
          day: dayBlock.day || "Monday",
          duration:
            "Duration:" +
            dayBlock.exercises.map((e: any) => e.duration).join(", "), // Combine durations into a single string
          time: "10:00 AM to 11:00 AM", // depending on card day and class day make time not equal to time in classtime
          details: dayBlock.exercises.map((e: any) => e.name),
        }));

        setWorkouts(mappedWorkouts);
      } catch (err) {
        console.error("Failed to fetch workout data:", err);
      }
    };

    fetchWorkoutData();
  }, []);

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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/workoutDay/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Delete failed");
      }
  
      // Remove the deleted workout from the UI
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error(err);
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
                onEdit={() => handleDelete(workout._id)}
                onDelete={() => alert("Edit" + workout._id)}
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
