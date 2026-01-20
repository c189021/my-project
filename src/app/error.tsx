"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (실제 프로덕션에서는 Sentry 등 에러 추적 서비스 사용)
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 에러 아이콘 */}
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          문제가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-2">
          죄송합니다. 예상치 못한 오류가 발생했습니다.
        </p>
        <p className="text-gray-500 text-sm mb-8">잠시 후 다시 시도해주세요.</p>

        {/* 에러 상세 (개발 모드에서만 표시) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs text-gray-500 mb-1">Error Details:</p>
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
          <Button onClick={reset} className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              홈으로 이동
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
