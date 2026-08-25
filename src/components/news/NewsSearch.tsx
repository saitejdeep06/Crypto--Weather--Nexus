"use client";

type NewsSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function NewsSearch({
  value,
  onChange,
}: NewsSearchProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search news..."
      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
    />
  );
}
