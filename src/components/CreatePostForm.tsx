"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const categories = [
  { value: "general", label: "일반" },
  { value: "tech", label: "기술" },
  { value: "question", label: "질문" },
  { value: "share", label: "공유" },
];

export default function CreatePostForm() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 유효성 검사
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      // 현재 로그인한 사용자 확인
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("로그인이 필요합니다.");
        router.push("/auth/login?redirect=/posts/new");
        return;
      }

      // 게시글 저장
      const { error: insertError } = await supabase.from("posts").insert({
        title: title.trim(),
        content: content.trim(),
        category,
        author_id: user.id,
        author_name: user.email?.split("@")[0] || "익명",
      });

      if (insertError) {
        console.error("Post creation error:", insertError);
        setError("게시글 저장에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // 성공 시 목록 페이지로 이동 + 새로고침
      router.push("/posts");
      router.refresh();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("예상치 못한 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 에러 메시지 */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* 카테고리 선택 */}
      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select value={category} onValueChange={setCategory} disabled={loading}>
          <SelectTrigger id="category">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 제목 입력 */}
      <div className="space-y-2">
        <Label htmlFor="title">
          제목 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="게시글 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="focus-visible:ring-[#1e3a5f]"
        />
      </div>

      {/* 내용 입력 */}
      <div className="space-y-2">
        <Label htmlFor="content">
          내용 <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="content"
          placeholder="게시글 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          rows={10}
          className="resize-none focus-visible:ring-[#1e3a5f]"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#1e3a5f] hover:bg-[#2d4a6f]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              저장 중...
            </>
          ) : (
            "게시글 작성"
          )}
        </Button>
      </div>
    </form>
  );
}
