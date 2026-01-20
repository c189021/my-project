"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  // 현재 로그인한 사용자 확인 (보안!)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  // 유효성 검사
  if (!title?.trim()) {
    return { error: "제목을 입력해주세요." };
  }

  // 게시글 저장
  const { error } = await supabase.from("posts").insert({
    title: title.trim(),
    content: content?.trim() || "",
    category: category || "general",
    author_id: user.id, // 서버에서 안전하게 가져온 user_id
    author_name: user.email?.split("@")[0] || "익명", // 이메일에서 이름 추출
  });

  if (error) {
    console.error("Post creation error:", error);
    return { error: "게시글 저장에 실패했습니다." };
  }

  // 캐시 갱신 및 리다이렉트
  revalidatePath("/posts");
  redirect("/posts");
}
