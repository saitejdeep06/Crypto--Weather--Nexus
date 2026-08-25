"use client";

import { useEffect, useState } from "react";
import NewsSearch from "@/components/news/NewsSearch";
import NewsGrid from "@/components/news/NewsGrid";

type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("cryptocurrency");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/news?q=${encodeURIComponent(search)}&pageSize=20`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Unable to load news");
        }

        setArticles(result.articles || []);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load news."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Latest News
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            News Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Stay updated with the latest cryptocurrency and market news.
          </p>
        </div>

        <div className="mb-8">
          <NewsSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading latest news...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <NewsGrid articles={articles} />
        )}
      </div>
    </main>
  );
}