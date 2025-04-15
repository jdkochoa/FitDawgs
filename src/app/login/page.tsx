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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-600">Login</h1>
        <form action="" className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <SubmitButton onSubmit={handleLogin} />
          </div>
          <Link href="/name">Don't have an account? Sign up.</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
