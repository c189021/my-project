import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  ChevronRight,
  Download,
} from "lucide-react";
import {
  dummyExperiences,
  dummyEducation,
  dummyCertifications,
} from "@/data/experience-dummy";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Briefcase className="text-[#1e3a5f]" />
            이력서
          </h1>
          <p className="text-slate-600 mt-3">저의 경력과 경험을 소개합니다.</p>
          <Button variant="outline" className="mt-6" asChild>
            <a href="#" download>
              <Download size={16} className="mr-2" />
              이력서 다운로드 (PDF)
            </a>
          </Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 경력 섹션 */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
            <Briefcase size={24} className="text-[#1e3a5f]" />
            경력
          </h2>

          <div className="relative">
            {/* 타임라인 라인 */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

            <div className="space-y-8">
              {dummyExperiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 md:pl-20">
                  {/* 타임라인 도트 */}
                  <div className="absolute left-0 md:left-8 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#1e3a5f] border-4 border-white shadow" />

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {exp.position}
                          </h3>
                          <p className="text-[#1e3a5f] font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500 flex-shrink-0">
                          <Calendar size={14} />
                          <span>
                            {exp.startDate} - {exp.endDate || "현재"}
                          </span>
                          {!exp.endDate && (
                            <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              재직중
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 학력 섹션 */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
            <GraduationCap size={24} className="text-[#1e3a5f]" />
            학력
          </h2>

          <div className="space-y-4">
            {dummyEducation.map((edu) => (
              <Card key={edu.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {edu.school}
                      </h3>
                      <p className="text-slate-600">{edu.degree}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar size={14} />
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 자격증 섹션 */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
            <Award size={24} className="text-[#1e3a5f]" />
            자격증
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {dummyCertifications.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                      <Award size={24} className="text-[#1e3a5f]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-slate-600">{cert.issuer}</p>
                      <p className="text-sm text-slate-500 mt-1">{cert.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-8 border-t">
          <p className="text-slate-600 mb-4">더 자세한 내용이 궁금하시다면?</p>
          <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f]" asChild>
            <Link href="/contact">
              연락하기
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
