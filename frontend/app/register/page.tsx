'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#131314] text-[#e3e3e3]">
      <div className="w-full max-w-md bg-[#1e1f20] p-8 rounded-2xl shadow-2xl border border-[#37393b]">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">Create Account</h2>
        
        {error && (
          <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-[#131314] border border-[#37393b] rounded-xl focus:border-[#a8c7fa] focus:outline-none transition-colors placeholder:text-[#8e918f]"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-[#131314] border border-[#37393b] rounded-xl focus:border-[#a8c7fa] focus:outline-none transition-colors placeholder:text-[#8e918f]"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div>
            <select 
              className="w-full p-3 bg-[#131314] border border-[#37393b] rounded-xl focus:border-[#a8c7fa] focus:outline-none transition-colors text-[#e3e3e3]"
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full bg-[#a8c7fa] text-[#062e6f] font-semibold py-3 rounded-xl hover:bg-[#c2e7ff] transition-all duration-200 mt-2">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#c4c7c5]">
          Already have an account? 
          <Link href="/login" className="text-[#a8c7fa] ml-1 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}