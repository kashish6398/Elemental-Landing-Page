import { getCourses } from '@/lib/supabase';
import DashboardContainer from '@/components/DashboardContainer';

export const revalidate = 0; // Ensure data is fetched fresh

export default async function Home() {
  try {
    const courses = await getCourses();
    return <DashboardContainer initialCourses={courses} />;
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    
    // In case of a major server-side crash, render container with empty array (client can fallback)
    return <DashboardContainer initialCourses={[]} />;
  }
}
