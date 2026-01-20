import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createPost } from "./actions";
import PostForm from "./PostForm";

export default async function NewPostPage() {
  const supabase = await createClient();

  // 로그인 체크
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/posts/new");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로 가기 */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/posts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-[#1e3a5f]">
              새 게시글 작성
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm action={createPost} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
