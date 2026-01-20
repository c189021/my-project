import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getErrorMessage,
  handleSupabaseError,
  logError,
} from "@/lib/supabase/error-handler";

/**
 * 일관된 API 응답 형식
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

function jsonResponse<T>(
  data: ApiResponse<T>,
  status: number = 200,
): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * GET /api/posts - 게시글 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // 쿼리 빌드
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from("posts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) {
      logError("GET /api/posts", error);
      return jsonResponse(
        {
          success: false,
          error: getErrorMessage(error),
          code: error.code,
        },
        500,
      );
    }

    return jsonResponse({
      success: true,
      data: {
        posts: data,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
    });
  } catch (error) {
    logError("GET /api/posts (unexpected)", error);
    return jsonResponse(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      500,
    );
  }
}

/**
 * POST /api/posts - 게시글 작성
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. 인증 체크 → 401
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return jsonResponse(
        {
          success: false,
          error: "로그인이 필요합니다.",
          code: "UNAUTHORIZED",
        },
        401,
      );
    }

    // 2. 요청 바디 파싱
    let body: { title?: string; content?: string; category?: string };
    try {
      body = await request.json();
    } catch {
      return jsonResponse(
        {
          success: false,
          error: "잘못된 요청 형식입니다.",
          code: "INVALID_JSON",
        },
        400,
      );
    }

    const { title, content, category } = body;

    // 3. 유효성 검사 → 400
    if (!title?.trim()) {
      return jsonResponse(
        {
          success: false,
          error: "제목을 입력해주세요.",
          code: "VALIDATION_ERROR",
        },
        400,
      );
    }

    if (!content?.trim()) {
      return jsonResponse(
        {
          success: false,
          error: "내용을 입력해주세요.",
          code: "VALIDATION_ERROR",
        },
        400,
      );
    }

    if (title.trim().length > 200) {
      return jsonResponse(
        {
          success: false,
          error: "제목은 200자 이내로 입력해주세요.",
          code: "VALIDATION_ERROR",
        },
        400,
      );
    }

    // 4. 게시글 저장
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("posts")
      .insert({
        title: title.trim(),
        content: content.trim(),
        category: category || "general",
        author_id: user.id,
        author_name: user.email?.split("@")[0] || "익명",
      })
      .select()
      .single();

    // 5. Supabase 에러 처리
    if (error) {
      logError("POST /api/posts", error);
      const result = handleSupabaseError(error);
      return jsonResponse(
        {
          success: false,
          error: result.error || "게시글 저장에 실패했습니다.",
          code: result.code || undefined,
        },
        500,
      );
    }

    return jsonResponse(
      {
        success: true,
        data: data,
      },
      201,
    );
  } catch (error) {
    // 6. 예상치 못한 에러 → 500
    logError("POST /api/posts (unexpected)", error);
    return jsonResponse(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      500,
    );
  }
}

/**
 * DELETE /api/posts?id=xxx - 게시글 삭제
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");

    // 1. 인증 체크
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return jsonResponse(
        {
          success: false,
          error: "로그인이 필요합니다.",
          code: "UNAUTHORIZED",
        },
        401,
      );
    }

    // 2. 유효성 검사
    if (!postId) {
      return jsonResponse(
        {
          success: false,
          error: "삭제할 게시글 ID가 필요합니다.",
          code: "VALIDATION_ERROR",
        },
        400,
      );
    }

    // 3. 게시글 존재 및 권한 확인
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: post, error: fetchError } = await (supabase as any)
      .from("posts")
      .select("author_id")
      .eq("id", postId)
      .single();

    if (fetchError || !post) {
      return jsonResponse(
        {
          success: false,
          error: "게시글을 찾을 수 없습니다.",
          code: "NOT_FOUND",
        },
        404,
      );
    }

    if ((post as { author_id: string }).author_id !== user.id) {
      return jsonResponse(
        {
          success: false,
          error: "본인이 작성한 게시글만 삭제할 수 있습니다.",
          code: "FORBIDDEN",
        },
        403,
      );
    }

    // 4. 삭제 실행
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      logError("DELETE /api/posts", error);
      return jsonResponse(
        {
          success: false,
          error: getErrorMessage(error),
          code: error.code,
        },
        500,
      );
    }

    return jsonResponse({
      success: true,
      data: { id: postId, message: "게시글이 삭제되었습니다." },
    });
  } catch (error) {
    logError("DELETE /api/posts (unexpected)", error);
    return jsonResponse(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      500,
    );
  }
}
