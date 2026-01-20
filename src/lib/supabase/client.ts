import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

/**
 * 브라우저/클라이언트 컴포넌트에서 사용하는 Supabase 클라이언트
 * 싱글톤 패턴으로 구현하여 여러 번 호출해도 동일한 인스턴스 반환
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
