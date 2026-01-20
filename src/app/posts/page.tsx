import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, User, Plus } from "lucide-react";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";

// 카테고리 설정
const categories = [
  { value: "all", label: "전체" },
  { value: "tech", label: "기술" },
  { value: "daily", label: "일상" },
  { value: "general", label: "일반" },
];

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category } = await searchParams;
  const supabase = await createClient();

  // 게시글 조회 (테이블이 없을 수도 있으므로 안전하게 처리)
  let posts: Array<{
    id: string;
    title: string;
    content: string | null;
    category: string | null;
    created_at: string;
    author_id: string | null;
    author_name: string | null;
  }> | null = null;

  try {
    let query = supabase
      .from("posts")
      .select(
        "id, title, content, category, created_at, author_id, author_name",
      )
      .order("created_at", { ascending: false });

    // 카테고리 필터 적용
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      // 테이블이 없는 경우 (42P01) 또는 다른 에러
      if (error.code !== "42P01") {
        console.error("Posts fetch error:", error.message);
      }
    } else {
      posts = data;
    }
  } catch (e) {
    console.error("Unexpected error fetching posts:", e);
  }

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 카테고리 라벨 가져오기
  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || value;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">게시글</h1>
            <p className="text-slate-600 mt-1">
              총 {posts?.length || 0}개의 게시글
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* 카테고리 필터 */}
            <CategoryFilter
              categories={categories}
              currentCategory={category || "all"}
            />

            {/* 새 글 작성 버튼 */}
            <Button asChild className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
              <Link href="/posts/new">
                <Plus className="w-4 h-4 mr-2" />새 글 작성
              </Link>
            </Button>
          </div>
        </div>

        {/* 게시글 목록 */}
        {!posts || posts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                아직 게시글이 없습니다
              </h3>
              <p className="text-slate-500">
                {category && category !== "all"
                  ? `'${getCategoryLabel(category)}' 카테고리에 게시글이 없습니다.`
                  : "첫 번째 게시글을 작성해보세요!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    {/* 카테고리 뱃지 */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f]">
                        {getCategoryLabel(post.category || "general")}
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-[#1e3a5f] transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* 내용 미리보기 */}
                    {post.content && (
                      <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                        {post.content}
                      </p>
                    )}

                    {/* 메타 정보 */}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author_name || "익명"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
