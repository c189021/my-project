import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// 보호된 라우트 (로그인 필요)
const protectedRoutes = ["/dashboard", "/profile"];

// 인증 라우트 (비로그인만 접근 가능)
const authRoutes = ["/auth/login", "/auth/signup"];

/**
 * 미들웨어에서 세션을 갱신하는 함수
 * 모든 요청에서 쿠키의 세션을 확인하고 갱신함
 */
export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  // Supabase URL이 설정되지 않은 경우 미들웨어 스킵
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl?.startsWith("http") || !supabaseAnonKey) {
    // Supabase 미설정 시 보호된 라우트 접근 차단
    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  let response = supabaseResponse;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // 중요: createClient와 supabase.auth.getUser() 사이에
  // 어떤 코드도 작성하지 마세요. 사소한 실수가
  // 사용자가 무작위로 로그아웃되는 문제를 일으킬 수 있습니다.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 보호된 라우트: 비로그인 → /auth/login으로 리다이렉트
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    // 로그인 후 원래 가려던 페이지로 돌아가기 위해 redirect 파라미터 추가
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 인증 라우트: 로그인 상태 → /dashboard로 리다이렉트
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 중요: response 객체를 반드시 반환해야 합니다.
  // NextResponse.next()로 새 응답을 만들면 쿠키가 손실됩니다.
  return response;
}
