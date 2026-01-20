import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import siteData from "@/data/site.json";

const footerLinks = {
  services: [
    { name: "포트폴리오", href: "/projects" },
    { name: "Q&A 게시판", href: "/qna" },
    { name: "이력 소개", href: "/experience" },
    { name: "연락하기", href: "/contact" },
  ],
  resources: [
    { name: "블로그", href: "#" },
    { name: "가이드", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "도움말", href: "#" },
  ],
  legal: [
    { name: "이용약관", href: "#" },
    { name: "개인정보처리방침", href: "#" },
    { name: "쿠키 정책", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: siteData.social.github,
    icon: Github,
  },
  {
    name: "Twitter",
    href: siteData.social.twitter,
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: siteData.social.linkedin,
    icon: Linkedin,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 Footer 콘텐츠 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1e3a5f] text-sm font-bold">M</span>
              </div>
              <span className="font-bold text-xl">{siteData.name}</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              {siteData.description}
            </p>
            {/* 소셜 링크 */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">서비스</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 리소스 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">리소스</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail size={16} className="flex-shrink-0" />
                <a
                  href={`mailto:${siteData.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteData.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Phone size={16} className="flex-shrink-0" />
                <span>010-1234-5678</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  서울특별시 강남구
                  <br />
                  테헤란로 123
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} {siteData.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
