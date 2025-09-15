'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { Menu } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { stores, selected, selectStore } = useTenant();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
                Shopify Insights
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/tenants" className="hover:text-indigo-600">Tenants</Link>
                <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
                <Link href="/sync" className="hover:text-indigo-600">Sync</Link>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Store selector */}
              {stores.length > 0 && (
                <select
                  value={selected?.id || ''}
                  onChange={(e) => selectStore(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.shopDomain}
                    </option>
                  ))}
                </select>
              )}

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => signOut()}
                  >
                    <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-600 hover:text-indigo-600"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col px-4 py-3 space-y-2 text-sm font-medium text-gray-600">
              <Link href="/tenants" className="hover:text-indigo-600">Tenants</Link>
              <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
              <Link href="/sync" className="hover:text-indigo-600">Sync</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          Built with ❤️ · Shopify Insights © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
