'use client';
import React, { useState } from 'react';
import { registerTenant } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { useTenant } from '../../context/TenantContext';

export default function TenantsPage() {
  const [tenantName, setTenantName] = useState('');
  const [shopDomain, setShopDomain] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const { addStore } = useTenant();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await registerTenant({ tenantName, shopDomain, accessToken });
      if (res?.store) {
        addStore(res.store);
        router.push('/dashboard');
      } else {
        setErr('Invalid server response');
      }
    } catch (error: any) {
      setErr(error.response?.data || error.message || String(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Onboard Tenant</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow max-w-lg">
        <label className="block mb-2">
          <div className="text-sm font-medium">Tenant name</div>
          <input value={tenantName} onChange={(e)=>setTenantName(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
        </label>

        <label className="block mb-2">
          <div className="text-sm font-medium">Shop domain</div>
          <input value={shopDomain} onChange={(e)=>setShopDomain(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
        </label>

        <label className="block mb-4">
          <div className="text-sm font-medium">Access Token</div>
          <input value={accessToken} onChange={(e)=>setAccessToken(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
        </label>

        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Registering...' : 'Register Tenant'}
        </button>
      </form>

      {err && <div className="mt-4 text-red-600">Error: {err}</div>}
    </div>
  );
}
