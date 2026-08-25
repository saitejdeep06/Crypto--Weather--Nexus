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

type NewsGridProps = {
  articles: Article[];
};

export default function NewsGrid({
  articles,
}: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        No news articles found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <a
          key={`${article.url}-${index}`}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-blue-500 hover:bg-slate-800"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt=""
              className="h-48 w-full object-cover"
            />
          )}

          <div className="p-5">
            <p className="mb-2 text-xs font-medium text-blue-400">
              {article.source.name}
            </p>

            <h2 className="line-clamp-3 text-lg font-semibold text-white">
              {article.title}
            </h2>

            {article.description && (
              <p className="mt-3 line-clamp-3 text-sm text-slate-400">
                {article.description}
              </p>
            )}

            <p className="mt-4 text-xs text-slate-500">
              {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
