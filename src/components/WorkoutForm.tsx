"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type CustomSelectProps = {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

function CustomSelect({
  options,
  selectedOptions,
  setSelectedOptions,
}: CustomSelectProps) {
  const handleClick = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="border p-3 grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
      {options.map((option) => (
        <div
          key={option}
          onClick={() => handleClick(option)}
          className={`p-2 cursor-pointer border ${
            selectedOptions.includes(option)
              ? "bg-red-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default function WorkoutForm() {
  const { data: session, status } = useSession();
  
    if (status === "loading") {
      return <p>Loading...</p>; // or a skeleton UI
    }
  const router = useRouter();

  const [goal, setGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [planDurationWeeks, setPlanDurationWeeks] = useState("");
  const [result, setResult] = useState<any>(null);

  // Example of getting users workouts (only shows in console (use f12 to see console))
  // ===================== BEGIN: inserted GET request =====================
  useEffect(() => {
    const fetchUserWorkoutPlans = async () => {
      try {
        const userId = session?.user?.id;
        const res = await fetch(`/api/userWorkoutPlan?userId=${userId}`);
        const data = await res.json();
        console.log("Fetched user workout plans:", data);
      } catch (err) {
        console.error("Error fetching user workout plans:", err);
      }
    };

    fetchUserWorkoutPlans();
  }, []);
  // ===================== END: inserted GET request =====================

  const handleSaveWorkoutPlan = async (planData: any) => {
    try {
      const res = await fetch("/api/workoutPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planData),
      });

      const data = await res.json();
      if (res.ok) {
        const savedPlanId = data._id; //This is specifically the id in interface of api/workoutPlan
        console.log("WorkoutPlan POST returned data:", data);
        console.log("Workout plan saved:", savedPlanId);

        // Now save to userWorkoutPlans

        const userId = session?.user?.id;
        const userPlanRes = await fetch("/api/userWorkoutPlan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, workoutPlans: [savedPlanId] }),
        });

        const userPlanData = await userPlanRes.json();
        if (!userPlanRes.ok) {
          console.error(
            "Failed to update userWorkoutPlan:",
            userPlanData.message
          );
        } else {
          console.log("User workout plans updated:", userPlanData.data);
        }
      } else {
        console.error("Failed to save workout plan:", data.message);
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !goal ||
      !fitnessLevel ||
      preferences.length === 0 ||
      !sessionDuration ||
      !daysPerWeek ||
      !planDurationWeeks
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const requestData = {
      goal: goal,
      fitness_level: fitnessLevel,
      preferences: preferences,
      health_conditions: ["None"],
      schedule: {
        days_per_week: parseInt(daysPerWeek),
        session_duration: parseInt(sessionDuration),
      },
      plan_duration_weeks: parseInt(planDurationWeeks),
      lang: "en",
    };

    try {
      const res = await fetch("/api/generateWorkoutPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      setResult(data);

      if (res.ok && data.result) {
        await handleSaveWorkoutPlan(data.result);
      } else {
        console.error("Plan generation failed or returned no result.");
      }
    } catch (err) {
      console.error("Error during generation:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-4">
          <SelectField
            label="Goal"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            options={[
              "Build Muscle",
              "Lose Weight",
              "Increase Endurance",
              "Improve Flexibility",
              "Gain Strength",
              "Enhance Athletic Performance",
              "Tone and Sculpt",
              "Improve Heart Health",
              "Increase Mobility",
              "Support Mental Health/Stress Relief",
            ]}
          />

          <SelectField
            label="Fitness Level"
            id="fitnessLevel"
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            required
            options={["Beginner", "Intermediate", "Advanced"]}
          />

          <div>
            <label className="block font-semibold mb-1">Preferences</label>
            <CustomSelect
              options={[
                "Weight Training",
                "Cardio",
                "HIIT (High-Intensity Interval Training)",
                "Yoga",
                "Pilates",
                "Bodyweight Workouts",
                "CrossFit or Functional Fitness",
                "Dance-Based Workouts (e.g., Zumba)",
                "Running or Walking",
                "Cycling or Spinning",
              ]}
              selectedOptions={preferences}
              setSelectedOptions={setPreferences}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <SelectField
            label="Daily Workout Duration (Minutes)"
            id="sessionDuration"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
            required
            options={["30", "60", "90", "120"]}
          />

          <SelectField
            label="Workouts Per Week"
            id="daysPerWeek"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            required
            options={Array.from({ length: 7 }, (_, i) => (i + 1).toString())}
          />

          <SelectField
            label="Plan Duration (Weeks)"
            id="planDuration"
            value={planDurationWeeks}
            onChange={(e) => setPlanDurationWeeks(e.target.value)}
            required
            options={Array.from({ length: 15 }, (_, i) => (i + 1).toString())}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 font-semibold hover:bg-red-700"
      >
        Create Workout Plan
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-2">Generated Plan:</h2>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}

type SelectFieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: string[];
};

function SelectField({
  label,
  id,
  value,
  onChange,
  required,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border p-3 text-lg"
        required={required}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
