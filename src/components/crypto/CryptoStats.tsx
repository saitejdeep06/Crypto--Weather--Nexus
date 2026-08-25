type CryptoStatsProps = {
  data: Record<
    string,
    {
      usd: number;
      usd_24h_change: number;
    }
  >;
};

export default function CryptoStats({ data }: CryptoStatsProps) {
  const coins = Object.values(data);

  const averageChange =
    coins.length > 0
      ? coins.reduce((sum, coin) => sum + coin.usd_24h_change, 0) /
        coins.length
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Tracked Coins</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {coins.length}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Average 24h Change</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {averageChange.toFixed(2)}%
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Data Source</p>
        <p className="mt-2 text-3xl font-bold text-white">
          CoinGecko
        </p>
      </div>
    </div>
  );
}
