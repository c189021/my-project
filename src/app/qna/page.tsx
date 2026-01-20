"use client";

import { useState } from "react";
import { QAPost, QAAnswer } from "@/types";
import { dummyQAPosts } from "@/data/qna-dummy";
import QAList from "@/components/features/qna/QAList";
import QADetail from "@/components/features/qna/QADetail";
import QAForm from "@/components/features/qna/QAForm";

type ViewMode = "list" | "detail" | "form";

export default function QnAPage() {
  const [posts, setPosts] = useState<QAPost[]>(dummyQAPosts);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPost, setSelectedPost] = useState<QAPost | null>(null);

  // 게시글 선택
  const handleSelectPost = (post: QAPost) => {
    setSelectedPost(post);
    setViewMode("detail");
  };

  // 새 질문 작성 화면으로
  const handleNewPost = () => {
    setViewMode("form");
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setViewMode("list");
    setSelectedPost(null);
  };

  // 새 질문 등록
  const handleSubmitPost = (title: string, content: string, author: string) => {
    const newPost: QAPost = {
      id: String(Date.now()),
      title,
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
      answers: [],
    };
    setPosts([newPost, ...posts]);
    setViewMode("list");
  };

  // 답변 등록
  const handleAddAnswer = (postId: string, content: string) => {
    const newAnswer: QAAnswer = {
      id: String(Date.now()),
      postId,
      content,
      author: "익명", // 실제로는 로그인 사용자 정보
      createdAt: new Date(),
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, answers: [...post.answers, newAnswer] }
          : post,
      ),
    );

    // 선택된 게시글 업데이트
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        answers: [...selectedPost.answers, newAnswer],
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {viewMode === "list" && (
          <QAList
            posts={posts}
            onSelectPost={handleSelectPost}
            onNewPost={handleNewPost}
          />
        )}

        {viewMode === "detail" && selectedPost && (
          <QADetail
            post={selectedPost}
            onBack={handleBackToList}
            onAddAnswer={handleAddAnswer}
          />
        )}

        {viewMode === "form" && (
          <QAForm onBack={handleBackToList} onSubmit={handleSubmitPost} />
        )}
      </div>
    </div>
  );
}
