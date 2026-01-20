import { Experience } from "@/types";

// 더미 경력 데이터 - 나중에 Supabase로 교체 예정
export const dummyExperiences: Experience[] = [
  {
    id: "1",
    company: "테크 스타트업 A",
    position: "시니어 프론트엔드 개발자",
    startDate: "2024-01",
    endDate: undefined, // 현재 재직 중
    description:
      "핵심 서비스의 프론트엔드 아키텍처 설계 및 개발을 담당했습니다. React와 Next.js 기반의 대시보드 시스템을 구축하고, 성능 최적화를 통해 페이지 로딩 속도를 40% 개선했습니다. 주니어 개발자 멘토링과 코드 리뷰를 통해 팀의 코드 품질 향상에 기여했습니다.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    id: "2",
    company: "IT 서비스 기업 B",
    position: "프론트엔드 개발자",
    startDate: "2022-03",
    endDate: "2023-12",
    description:
      "이커머스 플랫폼의 프론트엔드 개발을 담당했습니다. 상품 상세 페이지, 장바구니, 결제 플로우 등 핵심 기능을 개발하고, A/B 테스트를 통해 전환율을 15% 향상시켰습니다. 디자인 시스템 구축에 참여하여 개발 생산성을 높였습니다.",
    technologies: ["React", "Redux", "Styled Components", "Jest", "Storybook"],
  },
  {
    id: "3",
    company: "웹 에이전시 C",
    position: "웹 개발자",
    startDate: "2020-07",
    endDate: "2022-02",
    description:
      "다양한 클라이언트를 위한 반응형 웹사이트 및 웹 애플리케이션을 개발했습니다. WordPress, Vue.js 등 다양한 기술 스택을 경험하며 풀스택 역량을 키웠습니다. 10개 이상의 프로젝트를 성공적으로 납품했습니다.",
    technologies: ["Vue.js", "PHP", "WordPress", "MySQL", "SCSS"],
  },
  {
    id: "4",
    company: "개인 프로젝트 / 프리랜서",
    position: "풀스택 개발자",
    startDate: "2019-01",
    endDate: "2020-06",
    description:
      "다양한 사이드 프로젝트와 프리랜서 작업을 수행했습니다. 스타트업의 MVP 개발, 소규모 비즈니스의 웹사이트 제작 등 다양한 경험을 쌓았습니다.",
    technologies: ["JavaScript", "Node.js", "MongoDB", "React"],
  },
];

export const dummyEducation = [
  {
    id: "1",
    school: "한국대학교",
    degree: "컴퓨터공학 학사",
    startDate: "2015-03",
    endDate: "2019-02",
  },
];

export const dummyCertifications = [
  {
    id: "1",
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2023-06",
  },
  {
    id: "2",
    name: "정보처리기사",
    issuer: "한국산업인력공단",
    date: "2019-11",
  },
];
