"use client";

import Link from "next/link";

type WeatherOverviewProps = {
  data: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
  };
};

export default function WeatherOverview({
  data,
}: WeatherOverviewProps) {
  const condition = data.weather?.[0];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Weather
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            {data.name}
          </h2>
        </div>

        <Link
          href="/weather"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          View Details →
        </Link>
      </div>

      <div className="flex items-center gap-5">
        {condition?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt={condition.description}
            className="h-20 w-20"
          />
        )}

        <div>
          <p className="text-4xl font-bold text-white">
            {Math.round(data.main.temp)}°C
          </p>

          <p className="mt-1 capitalize text-slate-400">
            {condition?.description || "Current conditions"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-950 p-3">
          <p className="text-xs text-slate-500">
            Feels Like
          </p>
          <p className="mt-1 font-semibold text-white">
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-3">
          <p className="text-xs text-slate-500">
            Humidity
          </p>
          <p className="mt-1 font-semibold text-white">
            {data.main.humidity}%
          </p>
        </div>

        <div className="rounded-xl bg-slate-950 p-3">
          <p className="text-xs text-slate-500">
            Wind
          </p>
          <p className="mt-1 font-semibold text-white">
            {data.wind.speed} m/s
          </p>
        </div>
      </div>
    </section>
  );
}