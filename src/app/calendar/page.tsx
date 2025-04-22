"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  useEffect(() => {
    const userId = session?.user?.id;

    const fetchFirstWorkoutPlanId = async () => {
      const res = await fetch(`/api/userWorkoutPlan2?userId=${userId}`);
      const data = await res.json();
      return res.ok ? data.firstWorkoutPlanId : null;
    };

    const fetchClassTimeIds = async () => {
      const res = await fetch(`/api/userClassTime?userId=${userId}`);
      const data = await res.json();
      return res.ok ? data.classTimes : [];
    };

    const fetchClassTimes = async () => {
      const timeIds = await fetchClassTimeIds();

      const classTimes = await Promise.all(
        timeIds.map(async (id: string) => {
          const res = await fetch(`/api/classTime/${id}`);
          const data = await res.json();
          return data.classTime;
        })
      );

      const takenTimes = classTimes.map((item: any) => ({
        day: item.day,
        start: item.start,
        end: item.end,
      }));

      console.log("Taken Times with Day:", takenTimes);
      return takenTimes;
    };

    const toMinutes = (timeStr: string): number => {
      const [hourStr, minutePart] = timeStr.toLowerCase().split(":");
      const minutes = parseInt(minutePart);
      const hour = parseInt(hourStr);
      const isPM = timeStr.toLowerCase().includes("pm");

      let hour24 = hour;
      if (hour === 12) hour24 = isPM ? 12 : 0;
      else hour24 = isPM ? hour + 12 : hour;

      return hour24 * 60 + minutes;
    };

    const toTimeString = (minutes: number): string => {
      const hour24 = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const suffix = hour24 >= 12 ? "PM" : "AM";
      const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
      return `${hour12}:${mins.toString().padStart(2, "0")} ${suffix}`;
    };

    const generateValidTime = (
      takenTimes: { day: string; start: string; end: string }[],
      targetDay: string
    ): string => {
      const takenRanges = takenTimes
        .filter((t) => t.day === targetDay)
        .map((t) => ({
          start: toMinutes(t.start),
          end: toMinutes(t.end),
        }));

      for (let m = 8 * 60; m <= 22 * 60; m += 60) {
        const end = m + 60;
        const conflict = takenRanges.some(
          (t) => !(end <= t.start || m >= t.end)
        );
        if (!conflict) {
          return `${toTimeString(m)} to ${toTimeString(end)}`;
        }
      }

      return "6:00 AM to 7:00 AM";
    };

    const fetchWorkoutData = async () => {
      try {
        const planId = await fetchFirstWorkoutPlanId();
        if (!planId) return console.error("No workout plan ID available");

        const res = await fetch(`/api/workoutPlan/${planId}`);
        const data = await res.json();
        const exercises = data.exercises || [];
        const daysPerWeek = data.schedule.days_per_week;

        const takenTimes = await fetchClassTimes();

        const mappedWorkouts = exercises.map((dayBlock: any, i: number) => {
          const week = Math.floor(i / daysPerWeek) + 1;
          const day = (i % daysPerWeek) + 1;
          const title = `Week ${week} - Day ${day}`;
          const workoutDay = dayBlock.day || "Monday"; // fallback to Monday

          const availableTime = generateValidTime(takenTimes, workoutDay);

          return {
            _id: dayBlock._id,
            title: title,
            day: workoutDay,
            duration:
              "Duration:" +
              dayBlock.exercises.map((e: any) => e.duration).join(", "),
            time: availableTime,
            details: dayBlock.exercises.map((e: any) => e.name),
          };
        });

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
    const res = await fetch(`/api/workoutDay/${id}`, {
      method: "DELETE",
    });
    setWorkouts((prev) => prev.filter((w) => w._id !== id));
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
                _id={workout._id}
                title={workout.title}
                day={workout.day}
                duration={workout.duration}
                time={workout.time}
                details={workout.details}
                onEdit={() => {}}
                onDelete={handleDelete}
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
