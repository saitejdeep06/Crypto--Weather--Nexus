"use client";

import { Search } from "lucide-react";

type WeatherSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function WeatherSearch({
  value,
  onChange,
  onSearch,
}: WeatherSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
      >
        <Search className="h-5 w-5" />
        Search
      </button>

    </div>
  );
}