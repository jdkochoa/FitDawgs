"use client";
import {useRouter} from "next/navigation";

export default function WorkoutPage() {

    return (
        <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
            <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
            <h1 className="text-2xl font-semibold mb-2">My Workouts</h1>
            </div>
        </div>
    )

}
