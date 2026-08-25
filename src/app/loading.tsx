export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
          <div className="mt-4 h-12 w-96 max-w-full animate-pulse rounded bg-slate-800" />
          <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-800" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
          <div className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
        </div>

        <div className="mt-8 h-80 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
          <div className="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
          <div className="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
        </div>
      </div>
    </main>
  );
}