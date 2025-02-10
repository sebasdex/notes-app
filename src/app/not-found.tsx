// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
      <h1 className="text-8xl font-bold text-gray-800 tracking-wide">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        No encontramos esta página. Tal vez quieras volver al inicio.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2 text-lg font-medium text-white bg-gray-900 rounded-full shadow-md hover:bg-gray-700 transition"
      >
        Regresar al inicio
      </Link>
      <div className="mt-10 flex space-x-3">
        <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
        <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
      </div>
    </div>
  );
}
