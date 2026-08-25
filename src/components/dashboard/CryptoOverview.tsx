"use client";

import Link from "next/link";

type CryptoValue = {
  usd?: number;
  usd_24h_change?: number;
};

type CryptoOverviewProps = {
  data: Record<string, CryptoValue>;
};

export default function CryptoOverview({
  data,
}: CryptoOverviewProps) {
  const entries = Object.entries(data).filter(
    (
      entry
    ): entry is [string, CryptoValue & { usd: number }] =>
      typeof entry[1]?.usd === "number"
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Market
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Crypto Overview
          </h2>
        </div>

        <Link
          href="/crypto"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-slate-400">
            Loading cryptocurrency data...
          </p>
        )}

        {entries.map(([coin, values]) => {
          const change =
            typeof values.usd_24h_change === "number"
              ? values.usd_24h_change
              : 0;

          return (
            <Link
              key={coin}
              href={`/crypto/${coin}`}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700 hover:bg-slate-800"
            >
              <span className="font-semibold capitalize text-white">
                {coin}
              </span>

              <span className="text-slate-200">
                ${values.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </span>

              <span
                className={
                  change >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}