import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Hero Tile Skeleton (Spans 4 columns) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-card-bg/40 border border-card-border/50 rounded-3xl p-6 h-[260px] animate-pulse flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-5 w-32 bg-[#1C1F42]/80 rounded-full" />
          <div className="h-9 w-2/3 bg-[#1C1F42]/80 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#1C1F42]/80 rounded" />
            <div className="h-4 w-5/6 bg-[#1C1F42]/80 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-28 bg-[#1C1F42]/80 rounded" />
          <div className="h-2 w-full bg-[#1C1F42]/80 rounded-full" />
        </div>
      </div>

      {/* Row 2: Course 1 Skeleton (Spans 2 columns) */}
      <div className="col-span-1 md:col-span-2 bg-card-bg/40 border border-card-border/50 rounded-2xl p-5 h-[220px] animate-pulse flex flex-col justify-between">
        <div className="w-11 h-11 bg-[#1C1F42]/80 rounded-xl" />
        <div className="h-5 w-1/2 bg-[#1C1F42]/80 rounded mt-4" />
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between">
            <div className="h-3.5 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-3.5 w-8 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-2 w-full bg-[#1C1F42]/80 rounded-full" />
        </div>
      </div>

      {/* Row 2: Course 2 Skeleton (Spans 1 column) */}
      <div className="col-span-1 bg-card-bg/40 border border-card-border/50 rounded-2xl p-5 h-[220px] animate-pulse flex flex-col justify-between">
        <div className="w-11 h-11 bg-[#1C1F42]/80 rounded-xl" />
        <div className="h-5 w-4/5 bg-[#1C1F42]/80 rounded mt-4" />
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between">
            <div className="h-3.5 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-3.5 w-8 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-2 w-full bg-[#1C1F42]/80 rounded-full" />
        </div>
      </div>

      {/* Row 2: Course 3 Skeleton (Spans 1 column) */}
      <div className="col-span-1 bg-card-bg/40 border border-card-border/50 rounded-2xl p-5 h-[220px] animate-pulse flex flex-col justify-between">
        <div className="w-11 h-11 bg-[#1C1F42]/80 rounded-xl" />
        <div className="h-5 w-4/5 bg-[#1C1F42]/80 rounded mt-4" />
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between">
            <div className="h-3.5 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-3.5 w-8 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-2 w-full bg-[#1C1F42]/80 rounded-full" />
        </div>
      </div>

      {/* Row 3: Activity Tile Skeleton (Spans 3 columns) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card-bg/40 border border-card-border/50 rounded-3xl p-6 h-[250px] animate-pulse flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1C1F42]/80 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4.5 w-24 bg-[#1C1F42]/80 rounded" />
            <div className="h-3 w-40 bg-[#1C1F42]/80 rounded" />
          </div>
        </div>
        <div className="h-16 w-full bg-[#1C1F42]/40 rounded-lg flex items-center justify-center">
          <div className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">Initializing Telemetry...</div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            <div className="h-8 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-8 w-16 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-3.5 w-32 bg-[#1C1F42]/80 rounded" />
        </div>
      </div>

      {/* Row 3: AI Recommender Skeleton (Spans 1 column) */}
      <div className="col-span-1 bg-card-bg/40 border border-card-border/50 rounded-3xl p-6 h-[250px] animate-pulse flex flex-col justify-between">
        <div className="space-y-3">
          <div className="w-8 h-8 bg-[#1C1F42]/80 rounded-lg" />
          <div className="h-5 w-4/5 bg-[#1C1F42]/80 rounded" />
          <div className="h-3.5 w-full bg-[#1C1F42]/80 rounded" />
          <div className="h-3.5 w-2/3 bg-[#1C1F42]/80 rounded" />
        </div>
        <div className="h-8 w-full bg-[#1C1F42]/80 rounded-xl mt-4" />
      </div>

      {/* Row 4: Course 4 Skeleton (Spans 2 columns) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-card-bg/40 border border-card-border/50 rounded-2xl p-5 h-[220px] animate-pulse flex flex-col justify-between">
        <div className="w-11 h-11 bg-[#1C1F42]/80 rounded-xl" />
        <div className="h-5 w-1/2 bg-[#1C1F42]/80 rounded mt-4" />
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between">
            <div className="h-3.5 w-16 bg-[#1C1F42]/80 rounded" />
            <div className="h-3.5 w-8 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="h-2 w-full bg-[#1C1F42]/80 rounded-full" />
        </div>
      </div>

      {/* Row 4: Achievements Skeleton (Spans 2 columns) */}
      <div className="col-span-1 md:col-span-2 bg-card-bg/40 border border-card-border/50 rounded-3xl p-6 h-[220px] animate-pulse flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="h-4.5 w-24 bg-[#1C1F42]/80 rounded" />
            <div className="h-4 w-12 bg-[#1C1F42]/80 rounded" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(id => (
              <div key={id} className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-[#1C1F42]/80 rounded-full" />
                <div className="h-2 w-10 bg-[#1C1F42]/80 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-3 w-full bg-[#1C1F42]/80 rounded mt-auto" />
      </div>
    </div>
  );
}
