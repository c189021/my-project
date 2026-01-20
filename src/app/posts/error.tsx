"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileWarning, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (실제 프로덕션에서는 Sentry 등 에러 추적 서비스 사용)
    console.error("Posts Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-red-200">
          <CardContent className="pt-12 pb-10">
            <div className="text-center">
              {/* 에러 아이콘 */}
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <FileWarning className="w-8 h-8 text-red-500" />
              </div>

              {/* 에러 메시지 */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                게시글을 불러올 수 없습니다
              </h2>
              <p className="text-gray-600 mb-6">
                게시판 데이터를 가져오는 중 문제가 발생했습니다.
                <br />
                잠시 후 다시 시도해주세요.
              </p>

              {/* 에러 상세 (개발 모드에서만 표시) */}
              {process.env.NODE_ENV === "development" && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left max-w-md mx-auto">
                  <p className="text-xs text-gray-500 mb-1 font-medium">
                    🔧 개발자 정보:
                  </p>
                  <p className="text-sm text-red-600 font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-gray-400 mt-2">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={reset}
                  className="bg-[#1e3a5f] hover:bg-[#2d4a6f]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    홈으로 돌아가기
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 도움말 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          문제가 계속되면{" "}
          <Link href="/contact" className="text-[#1e3a5f] hover:underline">
            문의하기
          </Link>
          를 이용해주세요.
        </p>
      </div>
    </div>
  );
}
