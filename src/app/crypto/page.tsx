"use client";

import { useEffect, useState } from "react";
import CryptoSearch from "@/components/crypto/CryptoSearch";
import CryptoTable from "@/components/crypto/CryptoTable";
import CryptoStats from "@/components/crypto/CryptoStats";

type CryptoData = Record<
  string,
  {
    usd: number;
    usd_24h_change: number;
  }
>;

export default function CryptoPage() {
  const [data, setData] = useState<CryptoData>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCrypto() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/crypto/market");

        if (!response.ok) {
          throw new Error("Failed to load cryptocurrency data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Unable to load cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    }

    loadCrypto();
  }, []);

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([coin]) =>
      coin.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Cryptocurrency
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Crypto Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Track live cryptocurrency prices and 24-hour market changes.
          </p>
        </div>

        <div className="mb-8">
          <CryptoSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading cryptocurrency data...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            <CryptoStats data={data} />

            <section>
              <h2 className="mb-4 text-2xl font-semibold">
                Market Overview
              </h2>

              <CryptoTable data={filteredData} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

