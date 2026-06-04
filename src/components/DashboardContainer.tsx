"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle,
  Database,
  Brain,
  Wifi,
  WifiOff,
  Cpu,
  Atom,
  Code2
} from 'lucide-react';
import { Course, SidebarItem } from '@/lib/types';
import Sidebar from './Sidebar';
import HeroTile from './HeroTile';
import CourseCard from './CourseCard';
import CourseGrid from './CourseGrid';
import ActivityTile from './ActivityTile';
import { isSupabaseConfigured } from '@/lib/supabase';

interface DashboardContainerProps {
  initialCourses: Course[];
}

export default function DashboardContainer({ initialCourses }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState<SidebarItem>('dashboard');
  const [courses] = useState<Course[]>(initialCourses);

  // Stagger layout animation for Bento tiles
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const tileVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 18 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-6">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="grow flex flex-col space-y-6 overflow-hidden">
        {/* Top Header bar with status indicators */}
        <header className="flex justify-between items-center px-2 py-1">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Workspace</span>
            <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              Aether Core Node <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
            </span>
          </div>
          
          {/* Connection Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-xs">
            {isSupabaseConfigured ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  Supabase Live <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  Offline Mode <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                </span>
              </>
            )}
          </div>
        </header>

        {/* Tab Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.section
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Row 1: Greeting & Stats (Spans all 4 columns) */}
              <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-4">
                <HeroTile />
              </motion.div>

              {/* Row 2 Section Header (Spans all 4 columns) */}
              <motion.div 
                variants={tileVariants} 
                className="col-span-1 md:col-span-2 lg:col-span-4 flex items-center justify-between mt-2 mb-1"
              >
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-white font-sans tracking-wide">Active Syllabus</h2>
                  <p className="text-xs text-slate-400">Current progress in modular courses</p>
                </div>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="text-xs font-bold text-accent-cyan flex items-center gap-1 hover:text-white transition-colors duration-200"
                >
                  VIEW ALL SYLLABUS <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Row 2: Course 1 (Advanced React) - Spans 2 columns */}
              {courses[0] && (
                <motion.div variants={tileVariants} className="col-span-1 md:col-span-2">
                  <CourseCard course={courses[0]} colSpan="w-full" />
                </motion.div>
              )}

              {/* Row 2: Course 2 (TypeScript) - Spans 1 column */}
              {courses[1] && (
                <motion.div variants={tileVariants} className="col-span-1">
                  <CourseCard course={courses[1]} colSpan="w-full" />
                </motion.div>
              )}

              {/* Row 2: Course 3 (Supabase) - Spans 1 column */}
              {courses[2] && (
                <motion.div variants={tileVariants} className="col-span-1">
                  <CourseCard course={courses[2]} colSpan="w-full" />
                </motion.div>
              )}

              {/* Row 3: Activity Heatmap (Spans 3 columns) */}
              <motion.div variants={tileVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
                <ActivityTile />
              </motion.div>

              {/* Row 3: AI Recommender Card (Spans 1 column) */}
              <motion.div 
                variants={tileVariants} 
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="col-span-1 bg-card-bg/85 border border-card-border rounded-3xl p-6 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Spotlight glow border */}
                <div className="absolute inset-0 rounded-3xl border border-card-border pointer-events-none z-20 group-hover:border-transparent transition-colors duration-300" />
                <div 
                  className="absolute inset-0 rounded-3xl border border-accent-cyan pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    maskImage: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
                  }}
                />

                {/* Spotlight background glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.05), transparent 80%)'
                  }}
                />

                <div className="absolute inset-0 bg-radial-mesh opacity-20 pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg text-accent-cyan">
                      <Brain className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-accent-cyan font-extrabold uppercase tracking-wider">AI Suggestion</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 leading-snug">
                    Next focus: <span className="text-white">Relational Sharding</span>
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Based on your speed in <strong className="text-slate-300">Supabase Database Mastery</strong>, we recommend indexing patterns next.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-card-border/80 flex justify-between items-center">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Estimated: 45 mins</div>
                  <button className="px-3.5 py-1.5 bg-accent-cyan text-background text-xs font-bold rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                    Begin Module
                  </button>
                </div>
              </motion.div>

              {/* Row 4: Course 4 (Animations) - Spans 2 columns on desktop, 1 on tablet */}
              {courses[3] && (
                <motion.div variants={tileVariants} className="col-span-1 md:col-span-1 lg:col-span-2">
                  <CourseCard course={courses[3]} colSpan="w-full" />
                </motion.div>
              )}

              {/* Row 4: Achievements Bento Card (Spans 2 columns) */}
              <motion.div
                variants={tileVariants}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="col-span-1 md:col-span-2 bg-card-bg/85 border border-card-border rounded-3xl p-6 relative overflow-hidden group shadow-2xl transition-all duration-300 flex flex-col justify-between"
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
                    background: 'radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(185, 39, 252, 0.05), transparent 80%)'
                  }}
                />

                <div className="absolute inset-0 bg-radial-mesh opacity-20 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-accent-purple/10 border border-accent-purple/20 rounded-lg text-accent-purple">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-accent-purple font-extrabold uppercase tracking-wider">Milestones</span>
                    </div>
                    <span className="text-[10px] bg-[#1A1C3E] border border-white/5 text-slate-300 font-bold px-2 py-0.5 rounded">4 Completed</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-4">Badge Matrix</h3>
                  
                  {/* Grid of badges - stacks 2x2 on mobile, row on tablet/desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Badge 1 */}
                    <div className="flex flex-col items-center text-center group/badge">
                      <div className="w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_10px_rgba(0,242,254,0.1)] group-hover/badge:scale-110 transition-transform duration-300">
                        <Atom className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 mt-2 truncate max-w-full">React Wizard</span>
                    </div>
                    {/* Badge 2 */}
                    <div className="flex flex-col items-center text-center group/badge">
                      <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)] group-hover/badge:scale-110 transition-transform duration-300">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 mt-2 truncate max-w-full">Type Scholar</span>
                    </div>
                    {/* Badge 3 */}
                    <div className="flex flex-col items-center text-center group/badge">
                      <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple shadow-[0_0_10px_rgba(185,39,252,0.1)] group-hover/badge:scale-110 transition-transform duration-300">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 mt-2 truncate max-w-full">Database Guru</span>
                    </div>
                    {/* Badge 4 */}
                    <div className="flex flex-col items-center text-center group/badge opacity-50 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 group-hover/badge:scale-110 transition-transform duration-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 mt-2 truncate max-w-full">Motion Craft</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-card-border/80 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 font-bold uppercase">Master Certificate</span>
                  <span className="text-accent-cyan font-bold">75% UNLOCKED</span>
                </div>
              </motion.div>
            </motion.section>
          )}

          {activeTab === 'courses' && (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-white">My Syllabus</h1>
                <p className="text-slate-400 text-sm">Review, configure, and continue your active courses.</p>
              </div>
              <CourseGrid courses={courses} />
            </motion.section>
          )}

          {activeTab === 'analytics' && (
            <motion.section
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="col-span-1 lg:col-span-3">
                <h1 className="text-2xl font-bold text-white">Intellectual Analytics</h1>
                <p className="text-slate-400 text-sm">Deep telemetry regarding focus sessions and commit heatmaps.</p>
              </div>
              <div className="col-span-1 lg:col-span-3">
                <ActivityTile />
              </div>
            </motion.section>
          )}

          {activeTab === 'settings' && (
            <motion.section
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card-bg/80 border border-card-border rounded-3xl p-6 relative overflow-hidden w-full max-w-2xl"
            >
              <div className="absolute inset-0 bg-radial-mesh opacity-20 pointer-events-none" />
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-cyan" /> Supabase Connection Settings
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                This project is configured to read courses directly from a PostgreSQL database hosted on Supabase.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#121430] border border-[#232752]/50 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold uppercase">Database Status</span>
                    {isSupabaseConfigured ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        CONNECTED <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold">
                        OFFLINE (FALLBACK ENROLLED)
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    To link your own database, define the following variables in a <code className="text-slate-300">.env.local</code> file in your root folder:
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">NEXT_PUBLIC_SUPABASE_URL</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co'} 
                      className="w-full bg-[#121430] border border-[#232752]/50 rounded-xl px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</label>
                    <input 
                      type="password" 
                      readOnly 
                      value={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '••••••••••••••••••••••••••••••••' : 'your-anon-public-key'} 
                      className="w-full bg-[#121430] border border-[#232752]/50 rounded-xl px-4 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-card-border text-[11px] text-slate-500 leading-relaxed">
                  💡 Check the <code className="text-slate-400 font-bold">README.md</code> and <code className="text-slate-400 font-bold">seed.sql</code> files in the root folder to see how to create the database table and insert mock data.
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
