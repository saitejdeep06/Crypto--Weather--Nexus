"use client";

import { useEffect, useState } from "react";
import WeatherSearch from "@/components/weather/WeatherSearch";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherStats from "@/components/weather/WeatherStats";
import WeatherForecast from "@/components/weather/WeatherForecast";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

type ForecastItem = {
  date: string;
  temperature: number;
  description: string;
  icon: string;
};

export default function WeatherPage() {
  const [city, setCity] = useState("Anantapur");
  const [search, setSearch] = useState("Anantapur");
  const [data, setData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function loadWeather(cityName: string) {
    try {
      setLoading(true);
      setForecastLoading(true);
      setError("");

      const [weatherResponse, forecastResponse] =
        await Promise.all([
          fetch(
            `/api/weather?city=${encodeURIComponent(cityName)}`,
            {
              cache: "no-store",
            }
          ),
          fetch(
            `/api/weather/forecast?city=${encodeURIComponent(cityName)}`,
            {
              cache: "no-store",
            }
          ),
        ]);

      const weatherResult = await weatherResponse.json();
      const forecastResult = await forecastResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(
          weatherResult?.message ||
            "Unable to load weather data."
        );
      }

      setData(weatherResult);

      if (forecastResponse.ok) {
        setForecast(forecastResult.forecast || []);
      } else {
        setForecast([]);
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load weather data."
      );
    } finally {
      setLoading(false);
      setForecastLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(city);

    const interval = setInterval(() => {
      loadWeather(city);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  function handleSearch() {
    const trimmed = search.trim();

    if (trimmed && trimmed.toLowerCase() !== city.toLowerCase()) {
      setCity(trimmed);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                Weather
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                Weather Dashboard
              </h1>

              <p className="mt-3 text-slate-400">
                Check current weather conditions and forecasts for
                any city.
              </p>
            </div>

            {lastUpdated && !loading && (
              <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-400">
                Last updated:{" "}
                <span className="font-medium text-slate-200">
                  {lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <WeatherSearch
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <div className="space-y-8">
            <WeatherCard data={data} />

            <WeatherStats data={data} />

            {forecastLoading ? (
              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-slate-400">
                  Loading forecast...
                </p>
              </section>
            ) : (
              <WeatherForecast forecast={forecast} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}