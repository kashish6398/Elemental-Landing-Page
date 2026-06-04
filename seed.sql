-- 1. Create the courses table schema
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a public read policy
CREATE POLICY "Allow public read access to courses"
ON public.courses
FOR SELECT
USING (true);

-- 4. Seed sample courses
INSERT INTO public.courses (title, progress, icon_name)
VALUES 
    ('Advanced React Patterns', 78, 'Atom'),
    ('Introduction to TypeScript', 60, 'Code2'),
    ('Supabase Database Mastery', 45, 'Database'),
    ('Framer Motion Animations', 92, 'Sparkles')
ON CONFLICT (id) DO NOTHING;
