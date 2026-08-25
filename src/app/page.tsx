"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CloudSun,
  Coins,
  Newspaper,
} from "lucide-react";
import CryptoOverview from "@/components/dashboard/CryptoOverview";
import WeatherOverview from "@/components/dashboard/WeatherOverview";
import NewsOverview from "@/components/dashboard/NewsOverview";

type CryptoData = Record<
  string,
  {
    usd: number;
    usd_24h_change: number;
  }
>;

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

type Article = {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

export default function Home() {
  const [crypto, setCrypto] = useState<CryptoData>({});
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [cryptoResponse, weatherResponse, newsResponse] =
          await Promise.all([
            fetch("/api/crypto/bitcoin"),
            fetch("/api/weather?city=Anantapur"),
            fetch("/api/news?q=cryptocurrency&pageSize=5"),
          ]);

        if (cryptoResponse.ok) {
          setCrypto(await cryptoResponse.json());
        }

        if (weatherResponse.ok) {
          setWeather(await weatherResponse.json());
        }

        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          setArticles(newsData.articles || []);
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Cryptocurrency",
      description:
        "Explore live prices, market changes, and charts.",
      href: "/crypto",
      icon: Coins,
    },
    {
      title: "Weather",
      description:
        "Check weather conditions and forecasts.",
      href: "/weather",
      icon: CloudSun,
    },
    {
      title: "Latest News",
      description:
        "Read the latest cryptocurrency and market news.",
      href: "/news",
      icon: Newspaper,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Market Intelligence
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Crypto Weather Nexus
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            Your unified dashboard for cryptocurrency markets,
            weather conditions, and the latest financial news.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <CryptoOverview data={crypto} />

          {weather ? (
            <WeatherOverview data={weather} />
          ) : (
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-400">
                Loading weather...
              </p>
            </section>
          )}
        </div>

        <div className="mt-8">
          <NewsOverview articles={articles} />
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400"
                  />
                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  {card.title}
                </h2>

                <p className="mt-2 text-slate-400">
                  {card.description}
                </p>

                <span className="mt-5 block text-sm font-semibold text-blue-400">
                  Explore
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}