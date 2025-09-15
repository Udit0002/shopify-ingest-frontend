// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            SI
          </div>
          <span className="text-lg font-semibold text-slate-900">Shopify Insights</span>
        </div>
        <nav>
          <Link
            href="/dashboard"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Actionable Analytics for Shopify Stores
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Track customers, orders, and revenue in real-time.  
          Identify top customers, visualize trends, and make smarter business decisions — all in one simple dashboard.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium shadow hover:bg-indigo-700"
          >
            Open Dashboard
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Realtime metrics</h3>
          <p className="mt-2 text-sm text-gray-600">
            Instantly see customers, orders, and revenue — no spreadsheets, no delays.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Top customers</h3>
          <p className="mt-2 text-sm text-gray-600">
            Discover who spends the most and build loyalty campaigns with ease.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Simple syncs</h3>
          <p className="mt-2 text-sm text-gray-600">
            One-click imports keep your Shopify data fresh and reliable, always.
          </p>
        </div>
      </section>

    </div>
  );
}
