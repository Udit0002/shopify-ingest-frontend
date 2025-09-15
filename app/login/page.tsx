'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user, loading, signInWithMagicLink } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await signInWithMagicLink(email);
    if (error) setStatus('error:' + error.message);
    else setStatus('sent');
  }

  if (loading) return <div>Checking auth...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">
          <div className="text-sm">Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </label>
        <button className="mt-2 bg-blue-600 px-4 py-2 text-white rounded">Send magic link</button>
        {status === 'sending' && <div className="mt-3 text-gray-600">Sending...</div>}
        {status === 'sent' && <div className="mt-3 text-green-600">Magic link sent. Check your email.</div>}
        {status?.startsWith('error:') && <div className="mt-3 text-red-600">{status}</div>}
      </form>
    </div>
  );
}
