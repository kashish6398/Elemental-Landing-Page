"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Flame, Trophy, Award, Zap } from 'lucide-react';
import { UserStats } from '@/lib/types';

interface HeroTileProps {
  stats?: UserStats;
}

const defaultStats: UserStats = {
  name: 'Kashish Gupta',
  streak: 12,
  completedHours: 34.5,
  rank: 'Top 5%',
  xp: 4850
};

export default function HeroTile({ stats = defaultStats }: HeroTileProps) {
  // Mouse coordinate tracker for spotlight border glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Flame animation variants
  const flameVariants: Variants = {
    animate: {
      scale: [1, 1.12, 1],
      filter: [
        'drop-shadow(0 0 4px rgba(255, 106, 0, 0.4))',
        'drop-shadow(0 0 12px rgba(255, 42, 109, 0.8))',
        'drop-shadow(0 0 4px rgba(255, 106, 0, 0.4))'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  return (
    <motion.article 
      onMouseMove={handleMouseMove}
      whileHover="hover"
      className="col-span-1 lg:col-span-4 bg-card-bg/85 border border-card-border rounded-3xl p-6 relative overflow-hidden group shadow-2xl transition-all duration-300"
    >
      {/* 
        SPOTLIGHT GLOW BORDERS (Apple/Linear style):
        Dual-layer glowing mask borders that track coordinates relative to cursor.
      */}
      <div className="absolute inset-0 rounded-3xl border border-card-border pointer-events-none z-20 group-hover:border-transparent transition-colors duration-300" />
      <div 
        className="absolute inset-0 rounded-3xl border border-accent-cyan pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 75%)',
        }}
      />

      {/* Spotlight backdrop background glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-3xl"
        style={{
          background: 'radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.05), transparent 80%)'
        }}
      />

      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-radial-mesh opacity-80 pointer-events-none" />
      
      {/* Glowing accents in corners */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-accent-cyan/10 to-transparent rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-linear-to-tr from-accent-purple/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 h-full">
        {/* Welcome Text Section */}
        <div className="flex flex-col space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 w-fit text-xs font-semibold tracking-wider text-accent-cyan uppercase">
            <Zap className="w-3.5 h-3.5 fill-accent-cyan" /> Next-Gen Learning
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Welcome back,{' '}
            <span className="bg-linear-to-r from-accent-cyan via-[#58a6ff] to-accent-purple bg-clip-text text-transparent">
              {stats.name}
            </span>
            !
          </h1>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Your algorithm training is yielding high efficiency. You are on track to complete your core modules this week. Keep up the high bandwidth!
          </p>
          
          {/* XP Progress indicator */}
          <div className="pt-2 flex flex-col space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>LEVEL 4 RESEARCHER</span>
              <span className="text-accent-purple font-mono">{stats.xp} / 5000 XP</span>
            </div>
            <div className="h-2 w-full bg-[#181A35] rounded-full overflow-hidden border border-[#232752]/50 p-px">
              <motion.div 
                className="h-full bg-linear-to-r from-accent-cyan to-accent-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp / 5000) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Stats Bento Tiles Section (Right) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-96 shrink-0">
          {/* Streak Indicator */}
          <div className="flex-1 bg-[#121430] border border-[#232752]/50 rounded-2xl p-4 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 sm:gap-1 text-left sm:text-center relative overflow-hidden group/streak shadow-lg w-full sm:w-auto">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-accent-orange/5 opacity-0 group-hover/streak:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <motion.div 
              variants={flameVariants}
              animate="animate"
              className="p-3 bg-accent-orange/10 rounded-full mb-0 sm:mb-2 shrink-0"
            >
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-accent-orange fill-accent-orange" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">{stats.streak}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5 sm:mt-0">Day Streak</span>
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="flex-1 bg-[#121430] border border-[#232752]/50 rounded-2xl p-4 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 sm:gap-1 text-left sm:text-center relative overflow-hidden group/rank shadow-lg w-full sm:w-auto">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-accent-blue/5 opacity-0 group-hover/rank:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="p-3 bg-blue-500/10 rounded-full mb-0 sm:mb-2 shrink-0">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">{stats.rank}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5 sm:mt-0">Global Rank</span>
            </div>
          </div>

          {/* Learning Hours */}
          <div className="flex-1 bg-[#121430] border border-[#232752]/50 rounded-2xl p-4 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 sm:gap-1 text-left sm:text-center relative overflow-hidden group/hours shadow-lg w-full sm:w-auto">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-accent-purple/5 opacity-0 group-hover/hours:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="p-3 bg-accent-purple/10 rounded-full mb-0 sm:mb-2 shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">{stats.completedHours}h</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1.5 sm:mt-0">Study Time</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
