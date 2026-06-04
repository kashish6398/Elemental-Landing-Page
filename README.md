# AetherLearn // Next-Gen Learning Dashboard

A high-fidelity, hardware-accelerated learning dashboard built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, backed by a live **Supabase** database with seamless local fallback.

## 🚀 Features

- **Futuristic Dark Theme**: Curated near-black colors, custom mesh grid overlays, and subtle glowing borders/gradients.
- **Bento Grid Layout**: Responsive tiles dividing dashboard analytics, stats, recommendations, and syllabi.
- **Next.js Server Components (RSC)**: Data is fetched directly from the database server-side, reducing client-side bundle size.
- **Zero Layout Shifts (CLS) Protection**:
  - Custom pulsing skeletons replicate the exact Bento Grid during data loading.
  - Hover states and animations utilize `transform` and `opacity` exclusively to prevent browser repaints or layout shifts.
- **Animated Progress Bars**: Dynamically animate on mount from `0` to the current course completion metrics.
- **Interactive Heatmap**: Visual GitHub-style commitment log of learning hours with mouse-follow tooltips.
- **Adaptive Responsive Design**:
  - **Desktop (>1024px)**: Full sidebar layout with active hover and glowing items.
  - **Tablet (768px-1024px)**: Sidebar collapses to icons only; Bento grid reflows to 2-columns.
  - **Mobile (<768px)**: Bottom sticky navigation bar and single-column stacked scrolling bento grids.
- **Robust Supabase Integration**: Preconfigured to connect to Supabase database. If env credentials are not set, a smart local fallback mock data mode takes over so the project runs out-of-the-box.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database/BaaS**: Supabase
- **Icons**: Lucide React

---

## 🏗️ Architectural Decisions

### Server vs. Client Component Split
To maximize performance and interactivity, we separated the components into:
- **Server Components (`src/app/page.tsx`)**: Fetches data securely from Supabase using `@supabase/supabase-js` without exposing API credentials to the client. This handles database errors, server-side caching, and enables instant loader boundaries (`loading.tsx`).
- **Client Components (`src/components/*`)**: Interactive views like the navigation menu, streak card, dynamic heatmap chart, and course cards are client components since they use state, event handlers (`onMouseMove`, `onClick`), and Framer Motion spring physics.

### Zero Layout Shifts & Hardware-Acceleration
To align with strict layout guidelines, card hover glows do not scale borders or add margins. Instead, cards use absolute overlays representing the glow state, and we animate `opacity` from `0` to `1` on hover. The hover scaling uses `transform: scale()` which is fully hardware-accelerated and does not trigger document reflows.

---

## 🗄️ Database Setup (Supabase)

1. Create a free project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and execute the statements inside the `seed.sql` file in the root of this project.
3. This script will create a `courses` table, configure Row Level Security (RLS) policies for secure public reading, and seed mock database records.
4. Retrieve your **Project URL** and **API Anon Key** from your Supabase dashboard settings under API.
5. Create a `.env.local` file in your root folder and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```

---

## 📥 Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
