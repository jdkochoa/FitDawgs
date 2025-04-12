import Link from "next/link";

export default function NavBar() {
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
        <Link href="/name">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
        </Link>
      </div>
    </nav>
  );
}
