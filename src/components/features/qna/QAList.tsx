"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Search,
  Plus,
  ChevronRight,
  Clock,
  User,
  MessageCircle,
} from "lucide-react";
import { QAPost } from "@/types";
import { formatDistanceToNow } from "@/lib/utils/date";

interface QAListProps {
  posts: QAPost[];
  onSelectPost: (post: QAPost) => void;
  onNewPost: () => void;
}

export default function QAList({
  posts,
  onSelectPost,
  onNewPost,
}: QAListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <MessageSquare className="text-[#1e3a5f]" />
            Q&A 게시판
          </h1>
          <p className="text-slate-600 mt-1">
            궁금한 점을 질문하고 답변을 받아보세요
          </p>
        </div>
        <Button
          onClick={onNewPost}
          className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
        >
          <Plus size={18} className="mr-2" />
          질문하기
        </Button>
      </div>

      {/* 검색 */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <Input
          placeholder="질문 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 text-lg"
        />
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate-500">검색 결과가 없습니다.</p>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:border-[#1e3a5f]/30 hover:shadow-md transition-all group"
              onClick={() => onSelectPost(post)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#1e3a5f] transition-colors truncate">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mt-2 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatDistanceToNow(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        답변 {post.answers.length}개
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {post.answers.length > 0 ? (
                      <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        답변완료
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                        답변대기
                      </span>
                    )}
                    <ChevronRight className="ml-2 text-slate-400 group-hover:text-[#1e3a5f] transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
