import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareText, Briefcase, Sparkles, Mail } from "lucide-react";
import siteData from "@/data/site.json";
import HeroSection from "@/components/features/HeroSection";

const features = [
  {
    icon: MessageSquareText,
    title: "Q&A 게시판",
    description:
      "방문자들과 실시간으로 소통하고, 질문에 답변하며 전문성을 보여주세요. 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.",
  },
  {
    icon: Briefcase,
    title: "이력 & 경험 정리",
    description:
      "커리어 히스토리를 타임라인 형태로 깔끔하게 정리하세요. 프로젝트, 기술 스택, 성과를 한눈에 보여줍니다.",
  },
  {
    icon: Sparkles,
    title: "독창적인 디자인",
    description:
      "흔하지 않은 레이아웃과 인터랙션으로 방문자에게 강렬한 인상을 남기세요. 당신만의 개성을 표현합니다.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 기능 소개 섹션 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              왜 <span className="text-[#1e3a5f]">{siteData.name}</span>인가요?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              단순한 포트폴리오를 넘어, 방문자와 소통하고 당신의 전문성을
              효과적으로 전달하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-slate-200 hover:border-[#1e3a5f]/30 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#1e3a5f] group-hover:scale-110 transition-all duration-300">
                    <feature.icon
                      size={28}
                      className="text-[#1e3a5f] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "완료 프로젝트" },
              { number: "5+", label: "년 경력" },
              { number: "100%", label: "열정" },
              { number: "24/7", label: "문의 가능" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
                  {stat.number}
                </p>
                <p className="text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 lg:py-28 bg-[#1e3a5f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            함께 일할 준비가 되셨나요?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            새로운 프로젝트나 협업에 대해 이야기하고 싶으시다면 언제든
            연락주세요. 빠른 시간 내에 답변 드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1e3a5f] hover:bg-slate-100 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2" size={20} />
                연락하기
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/projects">프로젝트 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
