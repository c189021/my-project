import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Calendar,
  Shield,
  FileText,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    redirect("/auth/login");
  }

  // 가입 날짜 포맷
  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "알 수 없음";

  // 마지막 로그인 시간
  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "알 수 없음";

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">대시보드</h1>
            <p className="text-slate-600 mt-1">
              환영합니다! 계정 정보를 확인하세요.
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* 사용자 정보 카드 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* 프로필 카드 */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#1e3a5f]" />
                프로필
              </CardTitle>
              <CardDescription>계정 기본 정보</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{user.email}</p>
                  <p className="text-sm text-slate-500">
                    {user.email_confirmed_at
                      ? "이메일 인증됨"
                      : "이메일 미인증"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 이메일 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#1e3a5f]" />
                이메일
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-slate-900 truncate">
                {user.email}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {user.email_confirmed_at ? (
                  <span className="text-emerald-600">✓ 인증 완료</span>
                ) : (
                  <span className="text-amber-600">⚠ 인증 필요</span>
                )}
              </p>
            </CardContent>
          </Card>

          {/* 가입일 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1e3a5f]" />
                가입 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-slate-900">{createdAt}</p>
              <p className="text-sm text-slate-500 mt-1">가입일</p>
            </CardContent>
          </Card>
        </div>

        {/* 상세 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1e3a5f]" />
              계정 상세 정보
            </CardTitle>
            <CardDescription>보안 및 인증 관련 정보</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">사용자 ID</p>
                <p className="font-mono text-sm text-slate-700 truncate">
                  {user.id}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">마지막 로그인</p>
                <p className="text-sm text-slate-700">{lastSignIn}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">인증 방식</p>
                <p className="text-sm text-slate-700">
                  {user.app_metadata?.provider || "이메일"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">역할</p>
                <p className="text-sm text-slate-700">
                  {user.role || "authenticated"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 링크 */}
        <Card>
          <CardHeader>
            <CardTitle>빠른 링크</CardTitle>
            <CardDescription>
              자주 사용하는 기능에 빠르게 접근하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/qna"
                className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#1e3a5f] hover:bg-slate-50 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-[#1e3a5f]" />
                <div>
                  <p className="font-medium text-slate-900">Q&A 게시판</p>
                  <p className="text-sm text-slate-500">질문하고 답변받기</p>
                </div>
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#1e3a5f] hover:bg-slate-50 transition-colors"
              >
                <Briefcase className="w-5 h-5 text-[#1e3a5f]" />
                <div>
                  <p className="font-medium text-slate-900">프로젝트</p>
                  <p className="text-sm text-slate-500">작업물 살펴보기</p>
                </div>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#1e3a5f] hover:bg-slate-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-[#1e3a5f]" />
                <div>
                  <p className="font-medium text-slate-900">문의하기</p>
                  <p className="text-sm text-slate-500">연락처 및 문의</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
