"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  User,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";
import { QAPost } from "@/types";
import { formatDistanceToNow } from "@/lib/utils/date";

interface QADetailProps {
  post: QAPost;
  onBack: () => void;
  onAddAnswer: (postId: string, content: string) => void;
}

export default function QADetail({ post, onBack, onAddAnswer }: QADetailProps) {
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return;

    setIsSubmitting(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 500));
    onAddAnswer(post.id, newAnswer);
    setNewAnswer("");
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

      {/* 질문 카드 */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {post.title}
            </h1>
            {post.answers.length > 0 ? (
              <span className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1">
                <CheckCircle size={12} />
                답변완료
              </span>
            ) : (
              <span className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                답변대기
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-2">
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatDistanceToNow(post.createdAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </CardContent>
      </Card>

      {/* 답변 섹션 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <MessageCircle size={20} className="text-[#1e3a5f]" />
          답변 {post.answers.length}개
        </h2>

        {post.answers.length === 0 ? (
          <Card className="p-8 text-center bg-slate-50">
            <p className="text-slate-500">
              아직 답변이 없습니다. 첫 번째 답변을 남겨주세요!
            </p>
          </Card>
        ) : (
          post.answers.map((answer) => (
            <Card key={answer.id} className="border-l-4 border-l-[#1e3a5f]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {answer.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-slate-900">
                        {answer.author}
                      </span>
                      {answer.author === "관리자" && (
                        <span className="px-2 py-0.5 text-xs bg-[#1e3a5f] text-white rounded-full">
                          관리자
                        </span>
                      )}
                      <span className="text-sm text-slate-500">
                        {formatDistanceToNow(answer.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {answer.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 답변 작성 폼 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">답변 작성</h3>
          <div className="space-y-4">
            <textarea
              placeholder="답변을 입력하세요..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full min-h-[120px] p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitAnswer}
                disabled={!newAnswer.trim() || isSubmitting}
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
              >
                {isSubmitting ? (
                  "등록 중..."
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    답변 등록
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
