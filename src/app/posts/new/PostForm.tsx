"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface PostFormProps {
  action: (formData: FormData) => Promise<{ error: string } | void>;
}

export default function PostForm({ action }: PostFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await action(formData);
      return result || null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      {/* 에러 메시지 */}
      {state?.error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {state.error}
        </div>
      )}

      {/* 제목 */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-700">
          제목 <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="게시글 제목을 입력하세요"
          required
          disabled={isPending}
          className="w-full"
        />
      </div>

      {/* 카테고리 */}
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="text-sm font-medium text-slate-700"
        >
          카테고리
        </label>
        <Select name="category" defaultValue="general" disabled={isPending}>
          <SelectTrigger>
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">일반</SelectItem>
            <SelectItem value="tech">기술</SelectItem>
            <SelectItem value="daily">일상</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 내용 */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-slate-700">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="게시글 내용을 입력하세요"
          rows={10}
          disabled={isPending}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent resize-none disabled:opacity-50"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-[#1e3a5f] hover:bg-[#2d4a6f]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              저장 중...
            </>
          ) : (
            "게시글 작성"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => window.history.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
