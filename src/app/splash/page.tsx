"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SplashPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const goToSchedule = () => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      router.push("/profile");
    } else {
      router.push("/signup/name");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
        backgroundBlendMode: "overlay",
      }}
      className="flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-white font-extrabold text-6xl sm:text-8xl mb-4">
        Fit Dawgs
      </h1>
      <p className="text-white text-2xl sm:text-3xl font-medium mb-8">
        Helping UGA students fit exercising into their busy school schedules!
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl flex items-center gap-2"
        // ===================Landon Mod to Katherine================
        onClick={goToSchedule} // later add navigation to other side
        // ==========================================================
      >
        Get Started
        <span className="material-icons">arrow_forward</span>
      </button>
    </div>
  );
}
