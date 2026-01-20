-- =============================================
-- [테이블명] 테이블 생성 SQL 템플릿
-- Supabase SQL Editor에서 실행하세요
-- 
-- 사용법:
-- 1. [테이블명]을 실제 테이블 이름으로 변경 (예: comments, projects)
-- 2. [컬럼 정의]에 필요한 컬럼 추가
-- 3. RLS 정책을 필요에 맞게 수정
-- =============================================

-- 1. 테이블 생성
CREATE TABLE IF NOT EXISTS public.[테이블명] (
  -- 기본 컬럼 (대부분의 테이블에 필요)
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- ========================================
  -- [컬럼 정의] 여기에 필요한 컬럼 추가
  -- ========================================
  -- 예시:
  -- title TEXT NOT NULL,
  -- content TEXT,
  -- status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  -- is_featured BOOLEAN DEFAULT false,
  -- view_count INTEGER DEFAULT 0,
  -- metadata JSONB DEFAULT '{}',
  -- parent_id UUID REFERENCES public.[테이블명](id) ON DELETE CASCADE,
  -- ========================================
  
  title TEXT NOT NULL,
  content TEXT
);

-- 2. updated_at 자동 업데이트 함수 (없으면 생성)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. updated_at 트리거 설정
DROP TRIGGER IF EXISTS set_[테이블명]_updated_at ON public.[테이블명];
CREATE TRIGGER set_[테이블명]_updated_at
  BEFORE UPDATE ON public.[테이블명]
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. RLS 활성화
ALTER TABLE public.[테이블명] ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책
-- ========================================
-- 정책 옵션 (필요한 것 선택/수정)
-- ========================================

-- 옵션 A: 공개 읽기 (누구나 조회 가능)
CREATE POLICY "[테이블명]_select_public" ON public.[테이블명]
  FOR SELECT
  USING (true);

-- 옵션 B: 로그인 사용자만 읽기
-- CREATE POLICY "[테이블명]_select_authenticated" ON public.[테이블명]
--   FOR SELECT
--   USING (auth.role() = 'authenticated');

-- 옵션 C: 본인 것만 읽기
-- CREATE POLICY "[테이블명]_select_own" ON public.[테이블명]
--   FOR SELECT
--   USING (auth.uid() = user_id);

-- 생성: 로그인 사용자 + 본인 user_id로만
CREATE POLICY "[테이블명]_insert_own" ON public.[테이블명]
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 수정: 본인 것만
CREATE POLICY "[테이블명]_update_own" ON public.[테이블명]
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 삭제: 본인 것만
CREATE POLICY "[테이블명]_delete_own" ON public.[테이블명]
  FOR DELETE
  USING (auth.uid() = user_id);

-- 6. 인덱스 (자주 검색하는 컬럼에 추가)
CREATE INDEX IF NOT EXISTS [테이블명]_user_id_idx ON public.[테이블명](user_id);
CREATE INDEX IF NOT EXISTS [테이블명]_created_at_idx ON public.[테이블명](created_at DESC);
-- 추가 인덱스 예시:
-- CREATE INDEX IF NOT EXISTS [테이블명]_status_idx ON public.[테이블명](status);
-- CREATE INDEX IF NOT EXISTS [테이블명]_title_idx ON public.[테이블명] USING gin(to_tsvector('korean', title));

-- 7. 코멘트
COMMENT ON TABLE public.[테이블명] IS '[테이블 설명]';

-- =============================================
-- 완료! 
-- [테이블명]을 실제 이름으로 바꾼 후 실행하세요
-- =============================================
