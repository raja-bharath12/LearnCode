-- ============================================================
-- LearnCode — Supabase SQL Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password      TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar        TEXT DEFAULT '',
  stats         JSONB DEFAULT '{
    "neoPAT":            {"score": 0, "level": 1},
    "neoColab":          {"tokens": []},
    "solvedQuestions":   {"total": 0, "easy": 0, "medium": 0, "hard": 0},
    "coding":            {"attempted": 0, "correct": 0, "score": 0, "accuracy": 0},
    "projects":          {"attempted": 0, "score": 0},
    "mcq":               {"attempted": 0, "correct": 0, "score": 0, "accuracy": 0},
    "contributions":     []
  }'::jsonb,
  completed_courses  INTEGER[] DEFAULT '{}',
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Index for fast email lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);


-- ============================================================
-- 2. COURSES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.courses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     INTEGER NOT NULL UNIQUE,   -- numeric ID used by the app
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  language      TEXT NOT NULL,
  level         TEXT NOT NULL,
  lessons_count INTEGER NOT NULL DEFAULT 0,
  duration      TEXT,
  icon          TEXT,
  color         TEXT,
  description   TEXT,
  category      TEXT DEFAULT 'web' CHECK (category IN ('web', 'data', 'mobile', 'backend')),
  topics        TEXT[] DEFAULT '{}',
  instructor    TEXT,
  rating        NUMERIC(3,2),
  enrolled      INTEGER DEFAULT 0,
  visible       BOOLEAN DEFAULT true,
  lessons_list  JSONB DEFAULT '[]'::jsonb,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 3. LESSON CONTENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lesson_contents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   TEXT NOT NULL,
  lesson_id   TEXT NOT NULL,
  content     TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (course_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_contents_course_lesson
  ON public.lesson_contents(course_id, lesson_id);

CREATE TRIGGER lesson_contents_updated_at
  BEFORE UPDATE ON public.lesson_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 4. PROGRESS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.progress (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_id         INTEGER NOT NULL,
  completed_lessons INTEGER[] DEFAULT '{}',
  started_at        TIMESTAMPTZ DEFAULT now(),
  last_activity     TIMESTAMPTZ DEFAULT now(),
  completed         BOOLEAN DEFAULT false,
  completed_at      TIMESTAMPTZ,
  UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course_id ON public.progress(course_id);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Enable RLS on all tables (recommended for production)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Since our backend uses the service_role key (bypasses RLS), 
-- the policies below are only needed if you query directly from the frontend.

-- Courses: publicly readable
CREATE POLICY "Courses are viewable by everyone"
  ON public.courses FOR SELECT USING (true);

-- Lesson contents: publicly readable
CREATE POLICY "Lesson contents are viewable by everyone"
  ON public.lesson_contents FOR SELECT USING (true);

-- Progress: users can only see their own
-- (Backend uses service_role so these won't apply to backend queries)
CREATE POLICY "Users can view own progress"
  ON public.progress FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own progress"
  ON public.progress FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own progress"
  ON public.progress FOR UPDATE
  USING (auth.uid()::text = user_id::text);
