"use client";

import {
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
} from "lucide-react";

type ForecastItem = {
  date: string;
  temperature: number;
  description: string;
  icon: string;
};

type WeatherForecastProps = {
  forecast: ForecastItem[];
};

function getWeatherIcon(icon: string) {
  if (icon.startsWith("01")) {
    return Sun;
  }

  if (icon.startsWith("09") || icon.startsWith("10")) {
    return CloudRain;
  }

  if (
    icon.startsWith("02") ||
    icon.startsWith("03") ||
    icon.startsWith("04")
  ) {
    return CloudSun;
  }

  return Cloud;
}

export default function WeatherForecast({
  forecast,
}: WeatherForecastProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">

      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Forecast
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          5-Day Weather Forecast
        </h2>

        <p className="mt-2 text-slate-400">
          Expected weather conditions for the next five days.
        </p>
      </div>

      {forecast.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
          Forecast data is not available.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {forecast.map((item, index) => {
            const Icon = getWeatherIcon(item.icon);

            return (
              <div
                key={`${item.date}-${index}`}
                className="group rounded-xl border border-slate-800 bg-slate-950 p-5 text-center transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800"
              >
                <p className="font-semibold text-white">
                  {item.date}
                </p>

                <div className="my-6 flex justify-center">
                  <div className="rounded-full bg-blue-500/10 p-4 transition group-hover:bg-blue-500/20">
                    <Icon className="h-9 w-9 text-blue-400" />
                  </div>
                </div>

                <p className="text-3xl font-bold text-white">
                  {item.temperature}°C
                </p>

                <p className="mt-2 min-h-10 text-sm capitalize text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      )}
    </section>
  );
}