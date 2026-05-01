'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#131314] text-[#e3e3e3] p-6">
      <main className="flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e1f20] border border-[#37393b] shadow-xl">
          <span className="text-2xl font-bold text-[#a8c7fa]">P</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Primetrade <span className="text-[#a8c7fa]">Tasks</span>
        </h1>
        
        <p className="mt-6 max-w-lg text-lg leading-8 text-[#c4c7c5]">
          A secure, high-performance task management system built for the next generation of professional workflows.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="flex h-12 w-48 items-center justify-center rounded-xl bg-[#a8c7fa] text-sm font-semibold text-[#062e6f] transition-all hover:bg-[#c2e7ff] hover:scale-105"
          >
            Sign In
          </Link>
          
          <Link
            href="/register"
            className="flex h-12 w-48 items-center justify-center rounded-xl border border-[#37393b] bg-[#1e1f20] text-sm font-semibold text-white transition-all hover:bg-[#3c4043] hover:scale-105"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-[#37393b] p-4">
            <h3 className="font-semibold text-[#a8c7fa]">Secure</h3>
            <p className="text-xs text-[#8e918f] mt-1">HTTP-only cookie authentication for maximum safety.</p>
          </div>
          <div className="rounded-xl border border-[#37393b] p-4">
            <h3 className="font-semibold text-[#a8c7fa]">Fast</h3>
            <p className="text-xs text-[#8e918f] mt-1">Built on Next.js 15 for lightning-fast page transitions.</p>
          </div>
          <div className="rounded-xl border border-[#37393b] p-4">
            <h3 className="font-semibold text-[#a8c7fa]">RBAC</h3>
            <p className="text-xs text-[#8e918f] mt-1">Role-based access control built into the core API.</p>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-sm text-[#5f6368]">
        © 2026 Primetrade Intern Project
      </footer>
    </div>
  );
}