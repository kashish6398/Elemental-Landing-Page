"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Activity, ShieldAlert, Cpu, Sparkles, Flame } from 'lucide-react';

interface WeeklyMetric {
  week: string;
  hours: number;
  focus: number;
  x: number;
  y: number;
}

interface SubjectLoad {
  subject: string;
  hours: number;
  percent: number;
  color: string;
}

export default function ActivityTile() {
  const [hoveredPoint, setHoveredPoint] = useState<WeeklyMetric | null>(null);
  const [activeMetric, setActiveMetric] = useState<'hours' | 'focus'>('hours');

  // Timezone-independent, static data for hydration safety
  const weeklyData: WeeklyMetric[] = [
    { week: 'Wk 1', hours: 4.2, focus: 82, x: 30, y: 110 },
    { week: 'Wk 2', hours: 8.5, focus: 88, x: 104, y: 72 },
    { week: 'Wk 3', hours: 6.0, focus: 80, x: 178, y: 94 },
    { week: 'Wk 4', hours: 14.2, focus: 95, x: 252, y: 22 },
    { week: 'Wk 5', hours: 9.8, focus: 91, x: 326, y: 60 },
    { week: 'Wk 6', hours: 12.5, focus: 93, x: 400, y: 37 }
  ];

  const subjects: SubjectLoad[] = [
    { subject: 'React Core', hours: 15.5, percent: 85, color: 'bg-accent-cyan shadow-[0_0_8px_rgba(0,242,254,0.4)]' },
    { subject: 'TypeScript', hours: 10.2, percent: 55, color: 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.3)]' },
    { subject: 'Supabase', hours: 8.0, percent: 45, color: 'bg-accent-purple shadow-[0_0_8px_rgba(185,39,252,0.3)]' },
    { subject: 'Motion Craft', hours: 12.0, percent: 70, color: 'bg-accent-orange shadow-[0_0_8px_rgba(255,106,0,0.3)]' }
  ];

  // Mouse coordinate tracker for Apple cursor spotlight border glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // SVG drawing paths
  // Line path: M x0 y0 L x1 y1 ...
  const linePathHours = "M 30 110 L 104 72 L 178 94 L 252 22 L 326 60 L 400 37";
  const areaPathHours = "M 30 110 L 104 72 L 178 94 L 252 22 L 326 60 L 400 37 L 400 130 L 30 130 Z";

  // Focus path calculation (Y mapped differently: Y = 130 - (focus - 75) * 5)
  const linePathFocus = "M 30 95 L 104 65 L 178 105 L 252 30 L 326 50 L 400 40";
  const areaPathFocus = "M 30 95 L 104 65 L 178 105 L 252 30 L 326 50 L 400 40 L 400 130 L 30 130 Z";

  const activeLinePath = activeMetric === 'hours' ? linePathHours : linePathFocus;
  const activeAreaPath = activeMetric === 'hours' ? areaPathHours : areaPathFocus;

  return (
    <motion.article 
      onMouseMove={handleMouseMove}
      whileHover="hover"
      className="col-span-1 lg:col-span-3 bg-card-bg/85 border border-card-border rounded-3xl p-6 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Spotlight glow border */}
      <div className="absolute inset-0 rounded-3xl border border-card-border pointer-events-none z-20 group-hover:border-transparent transition-colors duration-300" />
      <div 
        className="absolute inset-0 rounded-3xl border border-accent-cyan pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
        }}
      />

      {/* Spotlight background glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-3xl"
        style={{
          background: 'radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.05), transparent 80%)'
        }}
      />

      <div className="absolute inset-0 bg-radial-mesh opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl text-accent-cyan">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-sans tracking-wide">Telemetry Diagnostics</h2>
            <p className="text-xs text-slate-400">Live focus load and study output velocity</p>
          </div>
        </div>
        
        {/* Toggle metric tabs */}
        <div className="flex bg-[#121430]/80 p-0.5 border border-[#232752]/50 rounded-xl text-xs font-semibold self-start">
          <button 
            onClick={() => setActiveMetric('hours')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${activeMetric === 'hours' ? 'bg-accent-cyan text-background' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Study Velocity
          </button>
          <button 
            onClick={() => setActiveMetric('focus')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${activeMetric === 'focus' ? 'bg-accent-purple text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Focus Coefficient
          </button>
        </div>
      </div>

      {/* Chart & Distribution Section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left: Animated Area Chart (Spans 2 columns) */}
        <div className="col-span-1 lg:col-span-2 relative">
          <svg viewBox="0 0 430 140" className="w-full h-auto overflow-visible select-none">
            {/* Grid Lines */}
            <line x1="30" y1="20" x2="410" y2="20" stroke="#1F2244" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="30" y1="75" x2="410" y2="75" stroke="#1F2244" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="30" y1="130" x2="410" y2="130" stroke="#1F2244" strokeWidth="1" />

            {/* Area gradient under path */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeMetric === 'hours' ? '#00F2FE' : '#B927FC'} stopOpacity="0.18" />
                <stop offset="100%" stopColor={activeMetric === 'hours' ? '#00F2FE' : '#B927FC'} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Filled Area with Framer Motion path animation */}
            <motion.path
              d={activeAreaPath}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Glowing neon line path with Framer Motion draw animation */}
            <motion.path
              d={activeLinePath}
              fill="none"
              stroke={activeMetric === 'hours' ? '#00F2FE' : '#B927FC'}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Chart Dots */}
            {weeklyData.map((d, index) => {
              // Y mapping matches line path
              const yValue = activeMetric === 'hours' 
                ? d.y 
                : 130 - (d.focus - 75) * 5;

              return (
                <g key={d.week} className="cursor-pointer">
                  {/* Hover ripple */}
                  <circle
                    cx={d.x}
                    cy={yValue}
                    r="8"
                    className="fill-transparent stroke-transparent hover:fill-accent-cyan/10 hover:stroke-accent-cyan/20 transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint(d)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Core dot */}
                  <motion.circle
                    cx={d.x}
                    cy={yValue}
                    r="4"
                    fill={activeMetric === 'hours' ? '#00F2FE' : '#B927FC'}
                    stroke="#070817"
                    strokeWidth="1.5"
                    className="shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  />
                </g>
              );
            })}

            {/* X Axis Labels */}
            {weeklyData.map((d) => (
              <text
                key={d.week}
                x={d.x}
                y="145"
                textAnchor="middle"
                fill="#6B7280"
                className="text-[9px] font-bold font-mono tracking-wider"
              >
                {d.week}
              </text>
            ))}
          </svg>

          {/* Inline Area Tooltip */}
          {hoveredPoint && (
            <div 
              className="absolute z-30 pointer-events-none bg-[#121430]/95 border border-[#2B2F5C] shadow-2xl p-2.5 rounded-xl text-[10px] text-slate-200 backdrop-blur-md transition-all duration-75"
              style={{ 
                left: hoveredPoint.week === 'Wk 1' 
                  ? '10px' 
                  : hoveredPoint.week === 'Wk 6' 
                    ? 'auto' 
                    : `${(hoveredPoint.x / 430) * 100}%`,
                right: hoveredPoint.week === 'Wk 6' ? '10px' : 'auto',
                top: `${(hoveredPoint.y / 140) * 100 - 35}%`,
                transform: hoveredPoint.week === 'Wk 1' || hoveredPoint.week === 'Wk 6' ? 'none' : 'translateX(-50%)'
              }}
            >
              <p className="font-bold text-accent-cyan">{hoveredPoint.week} Summary</p>
              <div className="flex gap-2 text-slate-400 mt-1 font-mono text-[9px]">
                <span>Hours: <strong className="text-white">{hoveredPoint.hours}h</strong></span>
                <span>Focus: <strong className="text-white">{hoveredPoint.focus}%</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Subject Load Distribution (Spans 1 column) */}
        <div className="space-y-3.5 border-t border-card-border/50 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6 h-full mt-6 lg:mt-0">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Syllabus Distribution</div>
          
          {subjects.map((sub, idx) => (
            <div key={sub.subject} className="space-y-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-300">
                <span className="truncate max-w-[120px]">{sub.subject}</span>
                <span className="font-mono text-slate-400">{sub.hours}h</span>
              </div>
              <div className="h-1.5 w-full bg-[#181A35]/50 rounded-full overflow-hidden p-[0.5px]">
                {/* Animated bar growing from left to right */}
                <motion.div
                  className={`h-full rounded-full ${sub.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${sub.percent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Telemetry Metrics */}
      <div className="relative z-10 border-t border-card-border/80 pt-4 mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan" />
            <div>
              <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider">Velocity Peak</span>
              <span className="text-xs font-bold text-slate-200 font-mono">14.2 hrs/wk</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-purple" />
            <div>
              <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider">Focus Coefficient</span>
              <span className="text-xs font-bold text-slate-200 font-mono">92.6% Avg</span>
            </div>
          </div>
        </div>
        
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-accent-cyan" /> Engine Hydrated
        </div>
      </div>
    </motion.article>
  );
}
