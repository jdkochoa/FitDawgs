"use client";

import { useRouter } from "next/navigation";

export default function NavBar() {

  const router = useRouter();

  const goToName = () => {
    router.push("/name");
  };

    return (
      <nav className="flex justify-between items-center px-6 py-4 bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="material-icons text-red-600">pets</span>
          FitDawgs - UGA
        </div>

        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={goToName} >
            Sign Up
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
        </div>
      </nav>
    );
  }