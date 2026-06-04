import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'AetherLearn // Next-Gen Learning Dashboard',
  description: 'Track your engineering syllabus, coding streaks, and course metrics on a hardware-accelerated, dark futuristic Bento Grid interface.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full dark`} suppressHydrationWarning>
      <body 
        className="font-sans antialiased text-foreground bg-background min-h-screen relative selection:bg-accent-cyan/30 selection:text-white" 
        suppressHydrationWarning
      >
        {/* 1. Global Noise Grain Overlay (tangible feel, zero layout redraw impact) */}
        <div className="absolute inset-0 bg-noise pointer-events-none z-30" />

        {/* 2. Hardware-Accelerated Aurora Flow Blobs (GPU-only composite translations) */}
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-accent-cyan/8 rounded-full filter blur-[110px] animate-aurora-blob-1 pointer-events-none z-0" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-accent-purple/6 rounded-full filter blur-[110px] animate-aurora-blob-2 pointer-events-none z-0" />
        <div className="absolute top-[30%] left-[25%] w-[40%] h-[40%] bg-accent-blue/4 rounded-full filter blur-[90px] animate-aurora-blob-1 pointer-events-none z-0" />
        
        {/* Page Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
