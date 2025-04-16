import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserWorkoutPlan from "@/models/userWorkoutPlan";

// Use if you need a specific object containing userId
// and workoutId. The other get in the general does this
// well but in a different way where it looks through objids
// to find userid essentially and return workouts associated
//export async function GET()