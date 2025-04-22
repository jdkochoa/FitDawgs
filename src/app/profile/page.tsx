"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.id) {
        setError("User session not found");
        router.push("/login");
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch(`/api/user/${session.user.id}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const user = await userResponse.json();
        setUserData(user);

        // Fetch user workout plans
        const userWorkoutResponse = await fetch(
          `/api/userWorkoutPlan?userId=${session.user.id}`
        );
        if (!userWorkoutResponse.ok) {
          throw new Error("Failed to fetch user workout plans");
        }
        const userWorkoutData = await userWorkoutResponse.json();

        // Fetch details for all workout plans
        const workoutPlansDetails = await Promise.all(
          userWorkoutData.workoutPlans.map(async (plan) => {
            const planId = typeof plan === "string" ? plan : plan._id; // Extract _id if it's an object
            const workoutPlanResponse = await fetch(`/api/workoutPlan/${planId}`);
            if (!workoutPlanResponse.ok) {
              throw new Error(`Failed to fetch workout plan details for ID: ${planId}`);
            }
            return await workoutPlanResponse.json();
          })
        );

        setWorkoutPlans(workoutPlansDetails);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session, router]);

  async function handleDelete(planId) {
    try {
      const deleteResponse = await fetch(`/api/userWorkoutPlan/${planId}`, {
        method: "DELETE",
      });
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete workout plan");
      }

      // Remove the deleted plan from the state
      setWorkoutPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== planId)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete workout plan");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white pt-16">
      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-8">
          <img
            src={userData?.profilePicture || "/images/profile.jpeg"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-red-700"
          />

          <div className="text-right">
            <h1 className="text-2xl font-semibold text-red-700">
              Hi {session?.user.name || "User"}!
            </h1>
            <p className="text-lg">
              Welcome back to FitDawgs. On your profile, you can view your
              current workout plans here, or delete your current plans and add new ones!
            </p>
          </div>
        </div>

        {workoutPlans.length > 0 ? (
          workoutPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-red-600 text-white p-6 rounded-lg shadow-lg mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Workout Plan {index + 1}</h2>
              <p className="mb-2">
                <strong>Goal:</strong> {plan.goal}
              </p>
              <p className="mb-2">
                <strong>Fitness Level:</strong> {plan.fitness_level}
              </p>
              <p className="mb-2">
                <strong>Total Weeks:</strong> {plan.total_weeks}
              </p>
              <p className="mb-2">
                <strong>Days per Week:</strong>{" "}
                {plan.schedule?.days_per_week || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Session Duration:</strong>{" "}
                {plan.schedule?.session_duration || "N/A"} minutes
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => router.push("/calendar")}
                  className="bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:bg-gray-100"
                >
                  Calendar & Workout View
                </button>

                <button
                  onClick={() => handleDelete(plan._id)}
                  className="bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:bg-gray-100"
                >
                  Remove This Workout Plan
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">No Workout Plan</h2>
            <p>You do not have a current workout plan.</p>
          </div>
        )}

        <div
          onClick={() => workoutPlans.length === 0 && router.push("/new-workout")}
          className={`${
            workoutPlans.length > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          } text-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-800`}
        >
          <h2 className="text-xl font-semibold">Add a New Workout Plan</h2>
        </div>
      </div>
    </div>
  );
}