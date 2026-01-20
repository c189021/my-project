"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import siteData from "@/data/site.json";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 유저 상태 확인
  useEffect(() => {
    // Supabase URL이 설정되지 않은 경우 스킵
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http")) {
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // 현재 유저 확인
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
        setIsLoading(false);
      });

      // 인증 상태 변경 리스너
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Supabase 초기화 오류:", error);
      setIsLoading(false);
    }
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  // 메뉴 토글
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 메뉴 클릭 시 모바일 메뉴 닫기
  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
          : "bg-white",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[#1e3a5f] hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            {siteData.name}
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1">
            {siteData.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[#1e3a5f] text-white"
                    : "text-slate-600 hover:text-[#1e3a5f] hover:bg-slate-100",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 로그인/유저 버튼 (데스크톱) */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-8 bg-slate-200 animate-pulse rounded" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 max-w-[120px] truncate">
                    {user.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">로그인</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
                  asChild
                >
                  <Link href="/auth/signup">회원가입</Link>
                </Button>
              </>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="px-4 py-4 space-y-1 bg-white border-t border-slate-200">
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#1e3a5f] text-white"
                  : "text-slate-600 hover:text-[#1e3a5f] hover:bg-slate-100",
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* 모바일 로그인 버튼 */}
          <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
            {isLoading ? (
              <div className="w-full h-10 bg-slate-200 animate-pulse rounded" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 truncate">
                    {user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                    handleNavClick();
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/login" onClick={handleNavClick}>
                    로그인
                  </Link>
                </Button>
                <Button
                  className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
                  asChild
                >
                  <Link href="/auth/signup" onClick={handleNavClick}>
                    회원가입
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
