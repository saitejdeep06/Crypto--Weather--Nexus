import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          404 Error
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight md:text-8xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold">
          Page not found
        </h2>

        <p className="mt-3 text-slate-400">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}