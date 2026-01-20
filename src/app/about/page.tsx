import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Palette,
  Rocket,
  Heart,
} from "lucide-react";
import siteData from "@/data/site.json";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase"],
  },
  { category: "Tools", items: ["Git", "VS Code", "Figma", "Vercel"] },
];

const values = [
  {
    icon: Code,
    title: "깔끔한 코드",
    description: "읽기 쉽고 유지보수하기 좋은 코드를 작성합니다.",
  },
  {
    icon: Palette,
    title: "사용자 경험",
    description: "직관적이고 아름다운 인터페이스를 설계합니다.",
  },
  {
    icon: Rocket,
    title: "지속적 성장",
    description: "새로운 기술을 배우고 적용하는 것을 즐깁니다.",
  },
  {
    icon: Heart,
    title: "협업과 소통",
    description: "팀과의 원활한 커뮤니케이션을 중요시합니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 프로필 이미지 */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#3d5a7f] p-1">
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                    {/* 실제 이미지로 교체 가능 */}
                    <span className="text-6xl sm:text-8xl font-bold text-[#1e3a5f]">
                      {siteData.author.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* 장식 요소 */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#1e3a5f]/10 rounded-full blur-xl" />
              </div>
            </div>

            {/* 소개 텍스트 */}
            <div className="text-center lg:text-left space-y-6">
              <div>
                <p className="text-[#1e3a5f] font-medium mb-2">
                  안녕하세요, 저는
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                  {siteData.author}
                </h1>
                <p className="text-xl text-slate-600 mt-2">풀스택 개발자</p>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                사용자 중심의 웹 애플리케이션을 만드는 것을 좋아하는
                개발자입니다. React와 Next.js를 주로 사용하며, 깔끔한 코드와
                아름다운 UI를 추구합니다. 새로운 기술을 배우고 문제를 해결하는
                과정에서 성장의 기쁨을 느낍니다.
              </p>

              {/* 소셜 링크 */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <a
                  href={siteData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href={siteData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={siteData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`mailto:${siteData.email}`}
                  className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 가치관 섹션 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            제가 중요하게 생각하는 것들
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1e3a5f]/10 flex items-center justify-center mb-4">
                    <value.icon size={28} className="text-[#1e3a5f]" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 스킬 섹션 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            기술 스택
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            함께 일해보실래요?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            새로운 프로젝트나 협업 기회에 대해 언제든 연락해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-8"
              asChild
            >
              <Link href="/contact">연락하기</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link href="/projects">프로젝트 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
