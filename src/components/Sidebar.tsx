"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { SidebarItem } from '@/lib/types';

interface SidebarProps {
  activeTab: SidebarItem;
  setActiveTab: (tab: SidebarItem) => void;
}

interface NavItem {
  id: SidebarItem;
  label: string;
  icon: React.ComponentType<any>;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar (Left) */}
      <nav aria-label="Main Navigation" className="hidden md:flex flex-col h-[calc(100vh-2rem)] w-20 lg:w-64 bg-card-bg/80 backdrop-blur-md border border-card-border rounded-2xl p-4 shrink-0 transition-all duration-300 relative overflow-hidden group shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent-cyan/10 rounded-full filter blur-xl pointer-events-none" />
        
        {/* Logo / Header */}
        <div className="flex lg:flex-row flex-col items-center justify-center lg:justify-start gap-3 px-0 lg:px-2 py-4 mb-8">
          <div className="p-2 rounded-xl bg-linear-to-tr from-accent-cyan to-accent-purple shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-sans font-bold text-lg bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent hidden lg:block tracking-wide uppercase">
            AetherLearn
          </span>
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col gap-2 grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-center lg:justify-start gap-4 px-0 lg:px-4 py-3.5 rounded-xl transition-colors duration-200 text-sm font-medium relative ${
                    isActive 
                      ? 'text-accent-cyan' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {/* Framer Motion Layout Animation for background highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-accent-cyan/10 border-l-2 border-accent-cyan rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  
                  <span className="relative z-10 shrink-0">
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]' : ''}`} />
                  </span>
                  
                  <span className="relative z-10 hidden lg:block tracking-wide">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer profile area */}
        <div className="border-t border-card-border pt-4 mt-auto flex lg:flex-row flex-col items-center justify-center lg:justify-start gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent-orange to-[#FF2A6D] flex items-center justify-center font-bold text-sm text-white shadow-md relative group/avatar cursor-pointer">
            KG
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-card-bg rounded-full" />
          </div>
          <div className="hidden lg:flex flex-col text-left overflow-hidden">
            <span className="text-sm font-semibold text-slate-200 truncate">Kashish Gupta</span>
            <span className="text-xs text-slate-500 truncate flex items-center gap-1">
              PRO Scholar <Sparkles className="w-3 h-3 text-amber-500" />
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card-bg/90 backdrop-blur-lg border-t border-card-border px-4 py-2 z-50 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg relative text-xs font-medium ${
                isActive ? 'text-accent-cyan' : 'text-slate-400'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavBgMobile"
                  className="absolute inset-0 bg-accent-cyan/10 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]' : ''}`} />
              <span className="scale-90">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
