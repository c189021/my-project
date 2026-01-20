import { QAPost } from "@/types";

// 더미 데이터 - 나중에 Supabase로 교체 예정
export const dummyQAPosts: QAPost[] = [
  {
    id: "1",
    title: "React와 Next.js의 차이점이 궁금합니다",
    content:
      "프론트엔드 개발을 시작하려고 하는데, React로 시작해야 할지 Next.js로 시작해야 할지 고민됩니다. 두 기술의 차이점과 각각 어떤 상황에서 사용하면 좋을지 알려주세요.",
    author: "개발초보",
    createdAt: new Date("2026-01-15T10:30:00"),
    updatedAt: new Date("2026-01-15T10:30:00"),
    answers: [
      {
        id: "a1",
        postId: "1",
        content:
          "React는 UI 라이브러리이고, Next.js는 React 기반의 풀스택 프레임워크입니다. Next.js는 서버 사이드 렌더링, 파일 기반 라우팅, API 라우트 등을 기본 제공합니다. 입문자라면 React 기초를 먼저 익히고 Next.js로 넘어가는 것을 추천드립니다.",
        author: "관리자",
        createdAt: new Date("2026-01-15T14:20:00"),
      },
    ],
  },
  {
    id: "2",
    title: "포트폴리오 프로젝트 협업 가능한가요?",
    content:
      "안녕하세요! 프로젝트 목록을 보고 연락드립니다. 혹시 사이드 프로젝트나 협업 기회가 있을까요? 저는 백엔드 개발자로 3년차입니다.",
    author: "백엔드개발자",
    createdAt: new Date("2026-01-18T09:15:00"),
    updatedAt: new Date("2026-01-18T09:15:00"),
    answers: [],
  },
  {
    id: "3",
    title: "TypeScript 도입 시 주의할 점이 있나요?",
    content:
      "기존 JavaScript 프로젝트에 TypeScript를 도입하려고 합니다. 마이그레이션 과정에서 주의해야 할 점이나 팁이 있으면 공유해주세요!",
    author: "JS개발자",
    createdAt: new Date("2026-01-17T16:45:00"),
    updatedAt: new Date("2026-01-17T16:45:00"),
    answers: [
      {
        id: "a2",
        postId: "3",
        content:
          "점진적 마이그레이션을 추천드립니다. tsconfig.json에서 strict 모드를 처음엔 끄고, allowJs: true로 설정해서 .js와 .ts 파일을 혼용하세요. 그 다음 파일 하나씩 .ts로 변환하면서 타입을 추가하면 됩니다.",
        author: "관리자",
        createdAt: new Date("2026-01-17T18:30:00"),
      },
      {
        id: "a3",
        postId: "3",
        content:
          "저도 같은 경험이 있는데요, any 타입을 남발하지 않도록 주의하세요. 처음엔 편하지만 나중에 타입 안정성이 떨어집니다. unknown 타입과 타입 가드를 활용하는 것을 추천합니다.",
        author: "TS고수",
        createdAt: new Date("2026-01-18T10:00:00"),
      },
    ],
  },
  {
    id: "4",
    title: "이 사이트는 어떤 기술 스택으로 만들어졌나요?",
    content:
      "디자인이 깔끔하고 좋네요! 이 포트폴리오 사이트가 어떤 기술로 만들어졌는지 궁금합니다.",
    author: "궁금이",
    createdAt: new Date("2026-01-19T08:00:00"),
    updatedAt: new Date("2026-01-19T08:00:00"),
    answers: [
      {
        id: "a4",
        postId: "4",
        content:
          "Next.js 16, TypeScript, Tailwind CSS, Shadcn UI를 사용했습니다. 백엔드는 Supabase를 활용하고 있어요. 감사합니다! 😊",
        author: "관리자",
        createdAt: new Date("2026-01-19T09:30:00"),
      },
    ],
  },
];
