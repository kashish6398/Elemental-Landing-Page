import React from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Cpu, GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-6">
      {/* Sidebar Placeholder (Pulsing) */}
      <nav aria-label="Loading Navigation" className="hidden md:flex flex-col h-[calc(100vh-2rem)] w-20 lg:w-64 bg-card-bg/40 border border-card-border/50 rounded-2xl p-4 shrink-0 animate-pulse">
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="p-2 rounded-xl bg-slate-800">
            <GraduationCap className="w-6 h-6 text-slate-600" />
          </div>
          <span className="font-bold text-lg text-slate-800 hidden lg:block uppercase">
            Loading...
          </span>
        </div>
        <ul className="flex flex-col gap-2 grow">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="h-12 w-full bg-[#1C1F42]/80 rounded-xl" />
          ))}
        </ul>
        <div className="border-t border-card-border/50 pt-4 mt-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800" />
          <div className="hidden lg:flex flex-col text-left space-y-1">
            <div className="h-3.5 w-20 bg-slate-800 rounded" />
            <div className="h-2.5 w-12 bg-slate-800 rounded" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="grow flex flex-col space-y-6 overflow-hidden">
        {/* Top Header bar placeholder */}
        <header className="flex justify-between items-center px-2 py-1 animate-pulse">
          <div className="space-y-1">
            <div className="h-3 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-4.5 w-32 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-7 w-28 bg-card-bg/80 border border-card-border/50 rounded-full" />
        </header>

        {/* Bento Skeleton Loader */}
        <SkeletonLoader />
      </main>

      {/* Mobile Bottom Navigation Placeholder */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card-bg/90 border-t border-card-border px-4 py-2 z-50 flex items-center justify-around shadow-2xl">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-12 h-10 bg-[#1C1F42]/80 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
