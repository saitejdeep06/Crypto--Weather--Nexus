"use client";

type CryptoChartProps = {
  prices: [number, number][];
};

export default function CryptoChart({
  prices,
}: CryptoChartProps) {
  const validPrices = prices.filter(
    (point) =>
      Array.isArray(point) &&
      point.length >= 2 &&
      typeof point[0] === "number" &&
      typeof point[1] === "number"
  );

  if (validPrices.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Price History
        </h2>

        <p className="mt-2 text-slate-400">
          No historical price data is available.
        </p>
      </section>
    );
  }

  const firstPrice = validPrices[0][1];
  const lastPrice = validPrices[validPrices.length - 1][1];

  const change =
    firstPrice !== 0
      ? ((lastPrice - firstPrice) / firstPrice) * 100
      : 0;

  const minPrice = Math.min(
    ...validPrices.map((point) => point[1])
  );

  const maxPrice = Math.max(
    ...validPrices.map((point) => point[1])
  );

  const step = Math.max(
    1,
    Math.floor(validPrices.length / 60)
  );

  const displayPrices = validPrices.filter(
    (_, index) => index % step === 0
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Market History
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            7-Day Price History
          </h2>
        </div>

        <div
          className={
            change >= 0
              ? "font-semibold text-green-400"
              : "font-semibold text-red-400"
          }
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </div>

      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs uppercase text-slate-500">
            Current
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ${lastPrice.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs uppercase text-slate-500">
            Lowest
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ${minPrice.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs uppercase text-slate-500">
            Highest
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ${maxPrice.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">
        <div className="flex h-72 min-w-[700px] items-end gap-1 rounded-xl bg-slate-950 p-4">

          {displayPrices.map(([timestamp, price], index) => {

            const range = maxPrice - minPrice;

            const height =
              range === 0
                ? 50
                : ((price - minPrice) / range) * 85 + 10;

            return (
              <div
                key={`${timestamp}-${index}`}
                className="flex-1 rounded-t bg-blue-500/70 transition hover:bg-blue-400"
                style={{
                  height: `${height}%`,
                }}
                title={`$${price.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}`}
              />
            );
          })}

        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Hover over the bars to view historical prices.
      </p>

    </section>
  );
}