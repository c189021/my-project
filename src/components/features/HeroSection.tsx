"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Github,
  Briefcase,
  MessageSquareText,
} from "lucide-react";
import siteData from "@/data/site.json";

interface HeroSectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showDecorations?: boolean;
}

export default function HeroSection({
  title = "당신의 가치를",
  highlight = "빛나게",
  subtitle,
  primaryCTA = { text: "시작하기", href: "/contact" },
  secondaryCTA = { text: "자세히 보기", href: "/about" },
  showDecorations = true,
}: HeroSectionProps) {
  const defaultSubtitle = `${siteData.description}. 독창적인 디자인으로 방문자에게 잊지 못할 인상을 남기세요.`;

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1e3a5f]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1e3a5f]/5 rounded-full blur-3xl" />
        {/* 그리드 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 텍스트 영역 */}
          <div className="text-center lg:text-left space-y-8">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-medium animate-fade-in">
              <Sparkles size={16} />
              포트폴리오의 새로운 기준
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {title}
              <br />
              <span className="text-[#1e3a5f] relative">
                {highlight}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="#1e3a5f"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-30"
                  />
                </svg>
              </span>{" "}
              보여주세요
            </h1>

            {/* 부제목 */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle || defaultSubtitle}
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-8 py-6 text-lg shadow-lg shadow-[#1e3a5f]/25 hover:shadow-xl hover:shadow-[#1e3a5f]/30 transition-all"
                asChild
              >
                <Link href={primaryCTA.href}>
                  {primaryCTA.text}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-slate-300 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition-all"
                asChild
              >
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </div>

            {/* 소셜 링크 */}
            <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
              <span className="text-sm text-slate-500">Follow me:</span>
              <a
                href={siteData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* 히어로 일러스트 영역 */}
          {showDecorations && (
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* 장식용 카드 1 - 프로젝트 */}
                <div className="absolute top-8 left-8 w-64 h-40 bg-white rounded-2xl shadow-xl p-6 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                      <Briefcase size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">프로젝트</p>
                      <p className="text-sm text-slate-500">12개 완료</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-[#1e3a5f] rounded-full animate-pulse" />
                  </div>
                </div>

                {/* 장식용 카드 2 - Q&A */}
                <div className="absolute bottom-8 right-8 w-64 h-40 bg-white rounded-2xl shadow-xl p-6 transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                      <MessageSquareText size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Q&A</p>
                      <p className="text-sm text-slate-500">실시간 답변</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <p className="text-sm text-slate-600">
                      새로운 질문이 도착했습니다!
                    </p>
                  </div>
                </div>

                {/* 장식용 카드 3 - 스킬 */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-48 bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition-all duration-300">
                  <p className="text-xs text-slate-500 mb-2">기술 스택</p>
                  <div className="flex flex-wrap gap-1">
                    {["React", "Next.js", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 중앙 원형 그라디언트 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full bg-linear-to-br from-[#1e3a5f] to-[#3d5a7f] opacity-10 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
