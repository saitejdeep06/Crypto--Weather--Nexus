"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Crypto", href: "/crypto" },
  { name: "Weather", href: "/weather" },
  { name: "News", href: "/news" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-lg font-bold tracking-tight text-white sm:text-xl"
        >
          Crypto Weather Nexus
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-800 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" &&
                  pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}