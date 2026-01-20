import { PostgrestError } from "@supabase/supabase-js";

/**
 * Supabase/PostgreSQL 에러 코드별 사용자 친화적 메시지 매핑
 */
const ERROR_MESSAGES: Record<string, string> = {
  // PostgreSQL 에러 코드
  "42501": "이 작업을 수행할 권한이 없습니다.",
  "23505": "이미 존재하는 데이터입니다.",
  "23503": "연결된 데이터가 존재하지 않습니다.",
  "23502": "필수 입력 항목이 누락되었습니다.",
  "22001": "입력한 내용이 너무 깁니다.",
  "22P02": "잘못된 형식의 데이터입니다.",
  "42P01": "요청한 테이블을 찾을 수 없습니다.",
  "42703": "요청한 필드를 찾을 수 없습니다.",
  "28000": "인증에 실패했습니다.",
  "28P01": "비밀번호가 올바르지 않습니다.",
  "57014": "요청 시간이 초과되었습니다.",

  // PostgREST 에러 코드
  PGRST116: "요청한 데이터를 찾을 수 없습니다.",
  PGRST301: "요청한 리소스를 찾을 수 없습니다.",
  PGRST100: "잘못된 요청 형식입니다.",
  PGRST200: "서버 내부 오류가 발생했습니다.",

  // Supabase Auth 에러
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 필요합니다.",
  user_already_exists: "이미 가입된 이메일입니다.",
  weak_password: "비밀번호가 너무 약합니다. 최소 6자 이상 입력해주세요.",
  invalid_email: "올바른 이메일 형식이 아닙니다.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  user_not_found: "등록되지 않은 사용자입니다.",
  session_expired: "세션이 만료되었습니다. 다시 로그인해주세요.",
};

/**
 * 기본 에러 메시지
 */
const DEFAULT_ERROR_MESSAGE = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

/**
 * PostgrestError를 사용자 친화적 메시지로 변환
 */
export function getErrorMessage(error: PostgrestError | null): string {
  if (!error) return DEFAULT_ERROR_MESSAGE;

  // 에러 코드로 메시지 찾기
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  // 에러 메시지에서 특정 패턴 찾기
  const message = error.message?.toLowerCase() || "";

  if (message.includes("jwt expired") || message.includes("token expired")) {
    return "세션이 만료되었습니다. 다시 로그인해주세요.";
  }

  if (message.includes("network") || message.includes("fetch")) {
    return "네트워크 연결을 확인해주세요.";
  }

  if (message.includes("timeout")) {
    return "요청 시간이 초과되었습니다. 다시 시도해주세요.";
  }

  // 개발 모드에서는 원본 에러 메시지 표시
  if (process.env.NODE_ENV === "development" && error.message) {
    return `[DEV] ${error.message}`;
  }

  return DEFAULT_ERROR_MESSAGE;
}

/**
 * Supabase 에러 처리 결과 타입
 */
export interface SupabaseErrorResult {
  success: boolean;
  error: string | null;
  code: string | null;
  details?: string;
}

/**
 * Supabase 에러를 처리하고 구조화된 결과 반환
 */
export function handleSupabaseError(
  error: PostgrestError | Error | null,
): SupabaseErrorResult {
  // 에러가 없으면 성공
  if (!error) {
    return {
      success: true,
      error: null,
      code: null,
    };
  }

  // PostgrestError인 경우
  if ("code" in error && "message" in error && "details" in error) {
    const pgError = error as PostgrestError;
    return {
      success: false,
      error: getErrorMessage(pgError),
      code: pgError.code,
      details:
        process.env.NODE_ENV === "development" ? pgError.details : undefined,
    };
  }

  // 일반 Error인 경우
  if (error instanceof Error) {
    // Auth 에러 처리 (Supabase Auth는 message에 에러 코드 포함)
    const authErrorCode = Object.keys(ERROR_MESSAGES).find(
      (key) =>
        error.message.toLowerCase().includes(key.toLowerCase()) ||
        error.message.includes(key),
    );

    if (authErrorCode) {
      return {
        success: false,
        error: ERROR_MESSAGES[authErrorCode],
        code: authErrorCode,
      };
    }

    return {
      success: false,
      error:
        process.env.NODE_ENV === "development"
          ? `[DEV] ${error.message}`
          : DEFAULT_ERROR_MESSAGE,
      code: null,
    };
  }

  // 알 수 없는 에러
  return {
    success: false,
    error: DEFAULT_ERROR_MESSAGE,
    code: null,
  };
}

/**
 * 에러 로깅 유틸리티 (프로덕션에서는 외부 서비스로 전송)
 */
export function logError(
  context: string,
  error: PostgrestError | Error | unknown,
): void {
  const timestamp = new Date().toISOString();

  if (process.env.NODE_ENV === "development") {
    console.error(`[${timestamp}] ${context}:`, error);
  } else {
    // 프로덕션: Sentry, LogRocket 등으로 전송
    // Sentry.captureException(error, { extra: { context } });
    console.error(`[${timestamp}] ${context}:`, {
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Auth 에러인지 확인
 */
export function isAuthError(error: unknown): boolean {
  if (!error) return false;

  const authErrorCodes = [
    "invalid_credentials",
    "email_not_confirmed",
    "user_already_exists",
    "session_expired",
    "user_not_found",
  ];

  if (error instanceof Error) {
    return authErrorCodes.some(
      (code) =>
        error.message.includes(code) ||
        error.message.toLowerCase().includes("auth"),
    );
  }

  return false;
}

/**
 * RLS (Row Level Security) 에러인지 확인
 */
export function isRLSError(error: PostgrestError | null): boolean {
  return error?.code === "42501";
}

/**
 * 네트워크 에러인지 확인
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("failed to fetch") ||
      message.includes("networkerror")
    );
  }
  return false;
}
