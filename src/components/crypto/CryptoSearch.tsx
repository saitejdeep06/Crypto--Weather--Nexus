"use client";

type CryptoSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CryptoSearch({
  value,
  onChange,
}: CryptoSearchProps) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search cryptocurrency..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
      />

      <button
        type="button"
        onClick={() => onChange(value)}
        className="rounded-xl bg-blue-600 px-7 py-4 font-medium text-white transition hover:bg-blue-500"
      >
        Search
      </button>
    </div>
  );
}
