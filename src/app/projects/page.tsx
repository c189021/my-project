"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FolderKanban, Star } from "lucide-react";
import { dummyProjects } from "@/data/projects-dummy";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects =
    filter === "featured"
      ? dummyProjects.filter((p) => p.featured)
      : dummyProjects;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <FolderKanban className="text-[#1e3a5f]" />
            프로젝트
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            지금까지 진행한 프로젝트들입니다. 각 프로젝트를 클릭하면 자세한
            내용을 확인할 수 있습니다.
          </p>
        </div>

        {/* 필터 */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-[#1e3a5f] hover:bg-[#2d4a6f]" : ""
            }
          >
            전체 ({dummyProjects.length})
          </Button>
          <Button
            variant={filter === "featured" ? "default" : "outline"}
            onClick={() => setFilter("featured")}
            className={
              filter === "featured" ? "bg-[#1e3a5f] hover:bg-[#2d4a6f]" : ""
            }
          >
            <Star size={16} className="mr-1" />
            주요 프로젝트 ({dummyProjects.filter((p) => p.featured).length})
          </Button>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* 이미지 영역 */}
              <div className="relative h-48 bg-gradient-to-br from-[#1e3a5f] to-[#3d5a7f] overflow-hidden">
                {/* 실제 이미지가 있으면 표시, 없으면 플레이스홀더 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <FolderKanban size={48} className="text-white/30" />
                </div>
                {/* Featured 배지 */}
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-amber-400 text-amber-900 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Star size={12} />
                    Featured
                  </div>
                )}
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#1e3a5f] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                {/* 기술 스택 */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">
            더 많은 프로젝트가 궁금하시다면?
          </p>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} className="mr-2" />
              GitHub에서 더 보기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
