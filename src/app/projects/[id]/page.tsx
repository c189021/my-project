import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  FolderKanban,
  ChevronRight,
} from "lucide-react";
import { dummyProjects } from "@/data/projects-dummy";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = dummyProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // 관련 프로젝트 (같은 기술 스택을 사용하는 다른 프로젝트)
  const relatedProjects = dummyProjects
    .filter((p) => p.id !== project.id)
    .filter((p) => p.technologies.some((t) => project.technologies.includes(t)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 영역 */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#3d5a7f] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            프로젝트 목록
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button
                asChild
                className="bg-white text-[#1e3a5f] hover:bg-white/90"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} className="mr-2" />
                  라이브 데모
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 프로젝트 이미지 */}
        <div className="mb-12">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* 실제 이미지가 있으면 표시, 없으면 플레이스홀더 */}
            <FolderKanban size={64} className="text-slate-300" />
          </div>
        </div>

        {/* 프로젝트 설명 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            프로젝트 소개
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">주요 기능</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "반응형 디자인으로 모든 디바이스 지원",
              "직관적인 사용자 인터페이스",
              "최적화된 성능과 빠른 로딩 속도",
              "보안을 고려한 설계",
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={16} className="text-[#1e3a5f]" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 기술 스택 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">사용 기술</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-slate-100 rounded-lg flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#1e3a5f]" />
                <span className="font-medium text-slate-700">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 관련 프로젝트 */}
        {relatedProjects.length > 0 && (
          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              관련 프로젝트
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 group-hover:text-[#1e3a5f] transition-colors mb-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 pt-8 border-t text-center">
          <p className="text-slate-600 mb-4">
            이 프로젝트에 대해 더 알고 싶으시다면?
          </p>
          <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f]" asChild>
            <Link href="/contact">문의하기</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

// 정적 생성을 위한 params 생성
export async function generateStaticParams() {
  return dummyProjects.map((project) => ({
    id: project.id,
  }));
}
