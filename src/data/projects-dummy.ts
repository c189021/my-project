import { Project } from "@/types";

// 더미 프로젝트 데이터 - 나중에 Supabase로 교체 예정
export const dummyProjects: Project[] = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    description:
      "Next.js와 Tailwind CSS를 활용한 개인 포트폴리오 사이트입니다. Q&A 게시판, 메일 컨택 기능을 포함하고 있으며, Supabase를 백엔드로 활용했습니다.",
    image: "/images/project-portfolio.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://my-portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce 플랫폼",
    description:
      "소규모 비즈니스를 위한 이커머스 솔루션입니다. 상품 관리, 장바구니, 결제 시스템을 구현했습니다.",
    image: "/images/project-ecommerce.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://demo-shop.com",
    githubUrl: "https://github.com/username/ecommerce",
    featured: true,
  },
  {
    id: "3",
    title: "태스크 관리 앱",
    description:
      "팀 협업을 위한 칸반 보드 스타일의 태스크 관리 애플리케이션입니다. 실시간 업데이트와 드래그앤드롭을 지원합니다.",
    image: "/images/project-taskapp.png",
    technologies: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
    liveUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/username/task-manager",
    featured: true,
  },
  {
    id: "4",
    title: "날씨 대시보드",
    description:
      "실시간 날씨 정보를 제공하는 대시보드입니다. OpenWeather API를 활용하여 전세계 도시의 날씨를 확인할 수 있습니다.",
    image: "/images/project-weather.png",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
    liveUrl: "https://weather-dashboard-demo.com",
    featured: false,
  },
  {
    id: "5",
    title: "블로그 플랫폼",
    description:
      "Markdown을 지원하는 개인 블로그 플랫폼입니다. SEO 최적화와 다크모드를 지원합니다.",
    image: "/images/project-blog.png",
    technologies: ["Next.js", "MDX", "Prisma", "Vercel"],
    githubUrl: "https://github.com/username/blog",
    featured: false,
  },
  {
    id: "6",
    title: "API 문서화 도구",
    description:
      "REST API를 자동으로 문서화하는 도구입니다. Swagger와 유사한 인터페이스를 제공합니다.",
    image: "/images/project-apidocs.png",
    technologies: ["TypeScript", "Express", "React"],
    githubUrl: "https://github.com/username/api-docs",
    featured: false,
  },
];
