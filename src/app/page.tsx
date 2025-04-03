"use client"; // for Next.js App Router 

export default function Home() {
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
      {/* Title */}
      <h1 className="text-white font-extrabold text-6xl sm:text-8xl mb-4">
        Fit Dawgs
      </h1>
      {/* Tagline */}
      <p className="text-white text-2xl sm:text-3xl font-medium mb-8">
        Helping UGA students fit exercising into their busy school schedules!
      </p>
      {/* Button */}
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl flex items-center gap-2"
        // onClick={() later add navigation to other side
      >
        Get Started
        <span className="material-icons">arrow_forward</span>
      </button>
    </div>
  );
}