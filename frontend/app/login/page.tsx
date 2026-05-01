'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#131314] text-[#e3e3e3] p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#1e1f20] p-10 shadow-2xl border border-[#37393b]">
        <h2 className="text-center text-3xl font-semibold text-white">Login to Primetrade</h2>
        
        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-900/50 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#c4c7c5] mb-1.5 ml-1">Email address</label>
              <input
                type="email"
                required
                className="block w-full rounded-xl border border-[#37393b] bg-[#131314] px-4 py-3 text-[#e3e3e3] shadow-sm focus:border-[#a8c7fa] focus:outline-none focus:ring-1 focus:ring-[#a8c7fa] transition-all placeholder:text-[#8e918f]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#c4c7c5] mb-1.5 ml-1">Password</label>
              <input
                type="password"
                required
                className="block w-full rounded-xl border border-[#37393b] bg-[#131314] px-4 py-3 text-[#e3e3e3] shadow-sm focus:border-[#a8c7fa] focus:outline-none focus:ring-1 focus:ring-[#a8c7fa] transition-all placeholder:text-[#8e918f]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-[#a8c7fa] py-3 px-4 text-sm font-semibold text-[#062e6f] hover:bg-[#c2e7ff] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a8c7fa] focus:ring-offset-2 focus:ring-offset-[#1e1f20]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#c4c7c5]">
          Don't have an account? 
          <Link href="/register" className="ml-1 text-[#a8c7fa] font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}