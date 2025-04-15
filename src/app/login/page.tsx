"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SubmitButton from "../../components/SubmitButton";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();

  // Set isLoggedIn from local storage (to persist the login state)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  /*
Check whether the user is logged in.

If the user is logged in, redirect them to the profile page.
If the user is not logged in, log in.
*/
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn]);

  function handleLogin() {
    // Simulate the login process
    setTimeout(() => {
      sessionStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      // Dispatch a login event for Nav (this is for Nav to change from Log in to Log out)
      const loginEvent = new Event("login");
      window.dispatchEvent(loginEvent);

      router.push("/profile");
    }, 2000);
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 bg-white">
      <div className="border-4 border-red-700 p-10 shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2 text-red-700">Login</h1>
        <p className="mb-6">
          Welcome back! <br />
          Please log in to continue.
        </p>

        <form action="" className="space-y-6">
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
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
            <SubmitButton
              onSubmit={handleLogin}
              className="px-6 py-2 w-auto" 
            />
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