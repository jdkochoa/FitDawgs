"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("/api/exercisesAPI")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto">
      <h1>Back Exercises</h1>
      <ul>
        {exercises.map((exercise: any) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>

      <Link href="/">
        <button className="bg-blue-500 text-white p-2 mt-4">Go Home</button>
      </Link>
    </div>
  );
}
