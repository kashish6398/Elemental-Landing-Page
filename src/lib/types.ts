export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export type SidebarItem = 'dashboard' | 'courses' | 'analytics' | 'settings';

export interface UserStats {
  name: string;
  streak: number;
  completedHours: number;
  rank: string;
  xp: number;
}
