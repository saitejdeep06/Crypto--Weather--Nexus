"use client";

import Link from "next/link";

type Article = {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

type NewsOverviewProps = {
  articles: Article[];
};

export default function NewsOverview({
  articles,
}: NewsOverviewProps) {
  const latest = articles.slice(0, 5);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Latest
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            News Overview
          </h2>
        </div>

        <Link
          href="/news"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {latest.length === 0 && (
          <p className="text-slate-400">
            No news available.
          </p>
        )}

        {latest.map((article, index) => (
          <a
            key={`${article.url}-${index}`}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700 hover:bg-slate-800"
          >
            <h3 className="font-semibold text-white">
              {article.title}
            </h3>

            <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
              <span>{article.source.name}</span>

              <span>•</span>

              <span>
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}