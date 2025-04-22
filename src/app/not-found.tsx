import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white px-4">
      <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
