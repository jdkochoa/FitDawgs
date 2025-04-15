"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { doCredentialLogin } from "../actions";
import SubmitButton from "../../components/SubmitButton";
import Link from "next/link";

function LoginPage() {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      console.log("Submitting form...");
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error.message || "An error occurred");
      } else {
        router.push("/profile");
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2 text-red-700">Login</h1>
        <p className="mb-6">
          Welcome back! <br />
          Please log in to continue.
        </p>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 text-lg"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full border p-3 mb-6 text-lg"
            required
          />

          <div className="flex justify-between">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex items-center border-2 border-red-600 text-red-600 px-4 py-2 font-semibold hover:bg-red-50"
            >
              ← Back
            </button>
            <SubmitButton />
          </div>
        </form>

        <p className="mt-6">
          <Link href="/name" className="text-red-600 hover:underline">
            Don't have an account? Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
