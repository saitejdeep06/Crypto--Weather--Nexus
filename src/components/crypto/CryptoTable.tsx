"use client";

import Link from "next/link";

type CryptoTableProps = {
  data: Record<
    string,
    {
      usd: number;
      usd_24h_change: number;
    }
  >;
};

const coinNames: Record<string, string> = {
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  solana: "Solana",
  cardano: "Cardano",
  dogecoin: "Dogecoin",
};

export default function CryptoTable({ data }: CryptoTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="grid grid-cols-3 border-b border-slate-800 px-6 py-4 font-semibold text-slate-300">
        <span>Coin</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      {Object.entries(data).map(([coin, values]) => {
        const coinName = coinNames[coin] ?? coin;

        return (
          <Link
            key={coin}
            href={`/crypto/${encodeURIComponent(coin)}`}
            className="grid grid-cols-3 border-b border-slate-800 px-6 py-5 text-white transition hover:bg-slate-800/70 last:border-0"
          >
            <span className="font-medium">
              {coinName}
            </span>

            <span>
              ${values.usd.toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}
            </span>

            <span
              className={
                values.usd_24h_change >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {values.usd_24h_change >= 0 ? "+" : ""}
              {values.usd_24h_change.toFixed(2)}%
            </span>
          </Link>
        );
      })}
    </div>
  );
}
