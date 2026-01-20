-- =============================================
-- Profiles 테이블 생성 SQL
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- 1. profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. updated_at 자동 업데이트 트리거 (이미 있으면 재사용)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. 회원가입 시 프로필 자동 생성 함수
-- SECURITY DEFINER: 함수 소유자 권한으로 실행 (RLS 우회)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    -- 이메일에서 @ 앞부분을 기본 username으로 사용
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      SPLIT_PART(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. auth.users에 새 유저 생성 시 트리거 설정
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 5. RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS 정책 설정

-- 6-1. 읽기: 모든 사용자 (로그인 안 해도) 가능
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT
  USING (true);

-- 6-2. 생성: 본인만 가능 (트리거로 자동 생성되므로 보통 필요 없음)
CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 6-3. 수정: 본인 프로필만 가능
CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 6-4. 삭제: 본인만 가능 (계정 삭제 시 CASCADE로 자동 삭제됨)
CREATE POLICY "profiles_delete_policy" ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- 7. 인덱스 생성
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles(username);

-- 8. 테이블 코멘트
COMMENT ON TABLE public.profiles IS '사용자 프로필 테이블';
COMMENT ON COLUMN public.profiles.id IS '사용자 ID (auth.users 참조)';
COMMENT ON COLUMN public.profiles.username IS '사용자 이름 (고유값)';
COMMENT ON COLUMN public.profiles.avatar_url IS '프로필 이미지 URL';
COMMENT ON COLUMN public.profiles.bio IS '자기소개';
COMMENT ON COLUMN public.profiles.created_at IS '생성 시간';
COMMENT ON COLUMN public.profiles.updated_at IS '수정 시간';

-- =============================================
-- 실행 완료!
-- 
-- 테스트 방법:
-- 1. 새 사용자 회원가입
-- 2. profiles 테이블에 자동으로 레코드 생성 확인
-- =============================================
