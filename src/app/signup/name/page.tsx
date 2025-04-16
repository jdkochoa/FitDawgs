"use client";

import { useRouter } from "next/navigation";
import { useSignUp } from "../context/SignUpContext";
import bcrypt from "bcryptjs";

export default function NamePage() {
  const router = useRouter();
  const { setData } = useSignUp();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Hash and Salt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    };

    setData(userData);
    router.push("/signup/schedule"); // Redirect to the next page
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Sign up for FitDawgs here!
        </h1>
        <p className="mb-6">
          We are happy you are here. <br />
          Let’s get to know more about you.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3 mb-4 text-lg"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3 mb-4 text-lg"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 mb-4 text-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 text-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 mb-6 text-lg"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center border-2 border-red-600 text-red-600 px-4 py-2 font-semibold hover:bg-red-50"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex items-center bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
