-- =============================================
-- Posts 테이블 생성 SQL
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- 1. posts 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'general',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. updated_at 자동 업데이트 함수 생성
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. updated_at 트리거 설정
DROP TRIGGER IF EXISTS set_updated_at ON public.posts;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. RLS (Row Level Security) 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 설정

-- 5-1. 읽기: 모든 사용자 (로그인 안 해도) 가능
CREATE POLICY "posts_select_policy" ON public.posts
  FOR SELECT
  USING (true);

-- 5-2. 생성: 로그인한 사용자만 가능 (본인 user_id로만)
CREATE POLICY "posts_insert_policy" ON public.posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5-3. 수정: 본인 글만 가능
CREATE POLICY "posts_update_policy" ON public.posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5-4. 삭제: 본인 글만 가능
CREATE POLICY "posts_delete_policy" ON public.posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS posts_category_idx ON public.posts(category);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at DESC);

-- 7. 테이블 코멘트
COMMENT ON TABLE public.posts IS '게시글 테이블';
COMMENT ON COLUMN public.posts.id IS '게시글 고유 ID';
COMMENT ON COLUMN public.posts.title IS '게시글 제목';
COMMENT ON COLUMN public.posts.content IS '게시글 내용';
COMMENT ON COLUMN public.posts.category IS '카테고리 (general, notice, qna 등)';
COMMENT ON COLUMN public.posts.user_id IS '작성자 ID (auth.users 참조)';
COMMENT ON COLUMN public.posts.created_at IS '생성 시간';
COMMENT ON COLUMN public.posts.updated_at IS '수정 시간';

-- =============================================
-- 실행 완료! 
-- Supabase Dashboard > Table Editor에서 확인하세요
-- =============================================
