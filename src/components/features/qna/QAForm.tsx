"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";

interface QAFormProps {
  onBack: () => void;
  onSubmit: (title: string, content: string, author: string) => void;
}

export default function QAForm({ onBack, onSubmit }: QAFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    author?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    } else if (title.length < 5) {
      newErrors.title = "제목은 5자 이상 입력해주세요";
    }

    if (!content.trim()) {
      newErrors.content = "내용을 입력해주세요";
    } else if (content.length < 10) {
      newErrors.content = "내용은 10자 이상 입력해주세요";
    }

    if (!author.trim()) {
      newErrors.author = "이름을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(title, content, author);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* 뒤로가기 */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-600 hover:text-[#1e3a5f]"
      >
        <ArrowLeft size={18} className="mr-2" />
        목록으로
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">새 질문 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <div className="space-y-2">
              <Label htmlFor="author">이름 (닉네임)</Label>
              <Input
                id="author"
                placeholder="이름을 입력하세요"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && (
                <p className="text-sm text-red-500">{errors.author}</p>
              )}
            </div>

            {/* 제목 */}
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                placeholder="질문 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* 내용 */}
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <textarea
                id="content"
                placeholder="질문 내용을 자세히 작성해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent resize-none ${
                  errors.content ? "border-red-500" : "border-slate-200"
                }`}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onBack}>
                취소
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
              >
                {isSubmitting ? (
                  "등록 중..."
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    질문 등록
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
