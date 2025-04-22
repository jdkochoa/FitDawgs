import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserWorkoutPlan from "@/models/userWorkoutPlan";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    // Find the matching userWorkoutPlan
    const userWorkoutPlan = await UserWorkoutPlan.findOne({ userId });

    if (!userWorkoutPlan || !userWorkoutPlan.workoutPlans.length) {
      return NextResponse.json({ error: "No workout plans found" }, { status: 404 });
    }

    // Return just the first workout plan ID
    return NextResponse.json({ firstWorkoutPlanId: userWorkoutPlan.workoutPlans[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
