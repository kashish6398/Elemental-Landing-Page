"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Atom, 
  Code2, 
  Database, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { Course } from '@/lib/types';

// Map database string to Lucide component
const iconMap: Record<string, React.ComponentType<any>> = {
  Atom: Atom,
  Code2: Code2,
  Database: Database,
  Sparkles: Sparkles,
  BookOpen: BookOpen
};

interface CourseCardProps {
  course: Course;
  colSpan?: string;
}

export default function CourseCard({ course, colSpan = 'col-span-1' }: CourseCardProps) {
  const IconComponent = iconMap[course.icon_name] || BookOpen;

  // Mouse coordinate tracker for Apple/Linear cursor spotlight border glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Stagger entrance variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl p-px group shadow-2xl flex flex-col justify-between min-h-[220px] ${colSpan}`}
      style={{ transformOrigin: 'center' }}
    >
      {/* 
        1. BASE BORDER & SPOTLIGHT GLOW BORDER:
        Instead of a static border, we overlay a bright neon border that is masked by a radial 
        gradient centered at the mouse coordinates. This creates a spotlight border segment 
        that tracks the user's cursor dynamically.
      */}
      <div className="absolute inset-0 rounded-2xl border border-card-border pointer-events-none z-20 group-hover:border-transparent transition-colors duration-300" />
      <div 
        className="absolute inset-0 rounded-2xl border border-accent-cyan pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 70%)',
        }}
      />
      <div 
        className="absolute inset-0 rounded-2xl border border-accent-purple pointer-events-none z-20 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          maskImage: 'radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), white, transparent 80%)',
        }}
      />

      {/* 2. SPOTLIGHT BACKGROUND BACKDROP GLOW */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-2xl"
        style={{
          background: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.08), transparent 80%)'
        }}
      />

      {/* 3. GLASSMORPHISM INNER PANEL */}
      <motion.article 
        className="relative z-10 w-full h-full grow bg-[#070817]/90 backdrop-blur-xl rounded-[15px] p-5 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
        variants={{
          hover: {
            scale: 1.015,
            transition: { type: 'spring' as const, stiffness: 350, damping: 20 }
          }
        }}
      >
        {/* Subtle mesh background inside card */}
        <div className="absolute inset-0 bg-radial-mesh opacity-10 pointer-events-none rounded-[15px]" />
        
        {/* Card Header: Glowing Icon & Bookmark */}
        <div className="relative z-10 flex items-start justify-between">
          {/* Better icon container with neon shadow */}
          <div className="p-3 bg-[#11132F]/80 border border-white/5 rounded-xl text-accent-cyan relative group-hover:text-white group-hover:border-accent-cyan/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
            <div className="absolute inset-0 bg-accent-cyan/10 rounded-xl blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <IconComponent className="w-5 h-5 relative z-10" />
          </div>
          
          <button 
            aria-label="Bookmark course" 
            className="text-slate-500 hover:text-slate-200 transition-colors p-1.5 bg-[#11132F]/40 hover:bg-[#11132F]/80 border border-white/5 rounded-lg"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Course Title */}
        <div className="relative z-10 mt-5 mb-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-white tracking-wide leading-snug line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Progress Bar with Glow Effect */}
        <div className="relative z-10 mt-auto space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-wider">
            <span className="text-slate-400 uppercase">Syllabus Progress</span>
            <span className="text-accent-cyan font-mono">{course.progress}%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-2 w-full bg-slate-950/60 rounded-full relative overflow-visible border border-white/5 p-[0.5px]">
            {/* 3. GLOW EFFECT FILL (BLURRED LAYER BEHIND) */}
            <motion.div
              className="absolute h-full bg-linear-to-r from-accent-cyan to-accent-purple rounded-full blur-xs"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
            {/* SHARP ACCENT FILL */}
            <motion.div
              className="absolute h-full bg-linear-to-r from-accent-cyan to-accent-purple rounded-full shadow-[0_0_8px_rgba(0,242,254,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          
          {/* Action indicator link */}
          <div className="flex items-center gap-1.5 text-[9px] text-accent-cyan font-black pt-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            ACCESS CORE TERMINAL <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
