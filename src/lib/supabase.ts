import { createClient } from '@supabase/supabase-js';
import { Course } from './types';

let rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

// Scrub trailing '/rest/v1/' or '/rest/v1' to convert REST endpoint to project base URL
if (rawSupabaseUrl.endsWith('/rest/v1/')) {
  rawSupabaseUrl = rawSupabaseUrl.slice(0, -9);
} else if (rawSupabaseUrl.endsWith('/rest/v1')) {
  rawSupabaseUrl = rawSupabaseUrl.slice(0, -8);
}

const supabaseUrl = rawSupabaseUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase only if environment variables are provided
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock data to use as a fallback if Supabase is not configured or fails
export const MOCK_COURSES: Course[] = [
  {
    id: '1-react',
    title: 'Advanced React Patterns',
    progress: 78,
    icon_name: 'Atom',
    created_at: new Date().toISOString(),
  },
  {
    id: '2-ts',
    title: 'Introduction to TypeScript',
    progress: 60,
    icon_name: 'Code2',
    created_at: new Date().toISOString(),
  },
  {
    id: '3-supabase',
    title: 'Supabase Database Mastery',
    progress: 45,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
  {
    id: '4-animations',
    title: 'Framer Motion Animations',
    progress: 92,
    icon_name: 'Sparkles',
    created_at: new Date().toISOString(),
  },
];

export async function getCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(
      'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set. Using offline fallback mock data.'
    );
    // Simulate server latency for realistic loading skeleton states
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return MOCK_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching courses from Supabase:', error.message);
      throw error;
    }

    if (!data || data.length === 0) {
      console.info('Supabase courses table is empty, returning seed courses.');
      return MOCK_COURSES;
    }

    return data as Course[];
  } catch (err) {
    console.error('Database connection failed. Falling back to mock data.', err);
    // Even if Supabase query fails, return mock data so app doesn't crash completely
    return MOCK_COURSES;
  }
}
