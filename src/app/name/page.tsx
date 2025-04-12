"use client";
import { useRouter } from "next/navigation";

export default function NamePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">
          What is your first name?
        </h1>
        <p className="mb-6">
          We are happy you are here. <br />
          Let’s get to know more about you.
        </p>

        <input
          type="text"
          placeholder="First Name"
          className="w-full border p-3 mb-4 text-lg"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full border p-3 mb-4 text-lg"
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 mb-4 text-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 text-lg"
        />

        <div className="flex justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center border-2 border-red-600 text-red-600 px-4 py-2 font-semibold hover:bg-red-50"
          >
            ← Back
          </button>
          <button
            onClick={() => router.push("/schedule")}
            className="flex items-center bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
