"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Loader2,
} from "lucide-react";
import siteData from "@/data/site.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "제목을 입력해주세요";
    }

    if (!formData.message.trim()) {
      newErrors.message = "메시지를 입력해주세요";
    } else if (formData.message.length < 10) {
      newErrors.message = "메시지는 10자 이상 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "문의 전송에 실패했습니다");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setErrors({
        message:
          error instanceof Error
            ? error.message
            : "문의 전송에 실패했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              메시지가 전송되었습니다!
            </h2>
            <p className="text-slate-600 mb-6">
              빠른 시간 내에 답변 드리겠습니다. 감사합니다!
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f]"
            >
              새 메시지 보내기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Mail className="text-[#1e3a5f]" />
            연락하기
          </h1>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            프로젝트 협업, 채용 문의, 또는 궁금한 점이 있으시면 언제든
            연락해주세요. 빠른 시간 내에 답변 드리겠습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 연락처 정보 */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[#1e3a5f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">이메일</h3>
                    <a
                      href={`mailto:${siteData.email}`}
                      className="text-slate-600 hover:text-[#1e3a5f] transition-colors"
                    >
                      {siteData.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-[#1e3a5f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">전화</h3>
                    <p className="text-slate-600">010-1234-5678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-[#1e3a5f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">위치</h3>
                    <p className="text-slate-600">서울특별시 강남구</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 소셜 링크 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  소셜 미디어
                </h3>
                <div className="flex gap-3">
                  <a
                    href={siteData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={siteData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={siteData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1e3a5f] hover:text-white transition-all"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 연락 폼 */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  메시지 보내기
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">제목 *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="문의 제목을 입력하세요"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">메시지 *</Label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="메시지를 입력하세요"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent resize-none ${
                        errors.message ? "border-red-500" : "border-slate-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        메시지 보내기
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
