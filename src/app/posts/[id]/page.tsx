import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

interface PostWithProfile {
  id: number;
  title: string;
  content: string;
  category: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      category,
      created_at,
      updated_at,
      user_id,
      profiles (
        username,
        avatar_url
      )
    `,
    )
    .eq("id", id)
    .single<PostWithProfile>();

  if (error || !post) {
    notFound();
  }

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 카테고리 라벨
  const categoryLabels: Record<string, string> = {
    tech: "기술",
    daily: "일상",
    general: "일반",
  };

  const profile = post.profiles as {
    username: string;
    avatar_url: string | null;
  } | null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로 가기 */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/posts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Link>
        </Button>

        <Card>
          <CardHeader className="border-b">
            {/* 카테고리 */}
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#1e3a5f]" />
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f]">
                {categoryLabels[post.category || "general"] || post.category}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {post.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {profile?.username?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <span>{profile?.username || "익명"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              {post.updated_at && post.updated_at !== post.created_at && (
                <span className="text-slate-400">
                  (수정됨: {formatDate(post.updated_at)})
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent className="py-8">
            {/* 본문 */}
            <div className="prose prose-slate max-w-none">
              {post.content ? (
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {post.content}
                </div>
              ) : (
                <p className="text-slate-400 italic">내용이 없습니다.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 하단 네비게이션 */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
