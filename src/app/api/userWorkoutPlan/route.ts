import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserWorkoutPlan from "@/models/userWorkoutPlan";

/*
This post function will add workout plan ids along with the associated user to a
document in the userWorkoutPlans collection
*/
export async function POST(request: NextRequest) {
  try {
    const { userId, workoutPlans } = await request.json();
    await connectMongoDB();

    // Update the workoutPlans array by pushing the new workout plan
    const updated = await UserWorkoutPlan.findOneAndUpdate(
      { userId },
      { $push: { workoutPlans: { $each: workoutPlans } } }, // Use $push to add new plans
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "User workout plans saved", data: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving workout plans", error },
      { status: 500 }
    );
  }
}

/*
This get can get the user specific workout plans
*/
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId in query parameters" },
        { status: 400 }
      );
    }

    /*
    This is the most important line. It finds the desired user (logged in user)
    and then populates the workout plans field in the collection with userid
    with the actual workouts when getting
    */
    const userWorkoutPlan = await UserWorkoutPlan.findOne({ userId }).populate(
      "workoutPlans"
    );

    if (!userWorkoutPlan) {
      return NextResponse.json(
        { message: "No workout plans found for user" },
        { status: 404 }
      );
    }

    return NextResponse.json(userWorkoutPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving workout plans", error },
      { status: 500 }
    );
  }
}
