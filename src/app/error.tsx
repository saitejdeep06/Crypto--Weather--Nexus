"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
          Something went wrong
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          We hit an unexpected error
        </h1>

        <p className="mt-4 text-slate-400">
          Please try again. If the problem continues, return to the dashboard.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Try Again
          </button>

          <a
            href="/"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}