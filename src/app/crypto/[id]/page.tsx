"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CryptoChart from "@/components/crypto/CryptoChart";

type ChartData = {
  prices: [number, number][];
};

export default function CryptoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadChart() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/crypto/${encodeURIComponent(id)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load cryptocurrency chart."
          );
        }

        setData(result);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load cryptocurrency data."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadChart();
    }
  }, [id]);

  const coinName =
    id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/crypto"
          className="mb-8 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to Crypto
        </Link>

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Cryptocurrency
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            {coinName}
          </h1>

          <p className="mt-3 text-slate-400">
            7-day cryptocurrency price history.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading price history...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <div className="space-y-8">

            <section className="grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">
                  Asset
                </p>

                <p className="mt-2 text-2xl font-bold capitalize">
                  {coinName}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">
                  Data Points
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {data.prices?.length ?? 0}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">
                  Period
                </p>

                <p className="mt-2 text-2xl font-bold">
                  7 Days
                </p>
              </div>

            </section>

            <CryptoChart prices={data.prices} />

          </div>
        )}

      </div>
    </main>
  );
}