"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface NavBarProps {
  session: Session | null;
}

export default function NavBar({ session }: NavBarProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(!!session?.user);

  console.log("User session (Nav):", session);

  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  function handleLogout() {
    signOut({ callbackUrl: "/" });
    setIsLoggedIn(!!session?.user);
  }

  function handleLogin() {
    router.push("/login");
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md">
      <Link
        href="/splash"
        className="flex items-center gap-2 text-2xl font-bold"
      >
        <span className="material-icons text-red-600">pets</span>
        FitDawgs - UGA
      </Link>

      <div className="flex gap-4">
        <Link href="/signup/name">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </Link>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </nav>
  );
}
