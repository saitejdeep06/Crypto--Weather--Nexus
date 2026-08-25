import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">
            Crypto Weather Nexus
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Crypto, weather, and market intelligence in one place.
          </p>
        </div>

        <div className="flex gap-5 text-sm text-slate-400">
          <Link href="/crypto" className="hover:text-white">
            Crypto
          </Link>
          <Link href="/weather" className="hover:text-white">
            Weather
          </Link>
          <Link href="/news" className="hover:text-white">
            News
          </Link>
        </div>
      </div>
    </footer>
  );
}