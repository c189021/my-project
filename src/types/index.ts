/**
 * 공통 타입 정의
 */

// 사이트 정보 타입
export interface SiteInfo {
  name: string;
  description: string;
  author: string;
  email: string;
  url: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Q&A 게시판 타입
export interface QAPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  answers: QAAnswer[];
}

export interface QAAnswer {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: Date;
}

// 포트폴리오 프로젝트 타입
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// 이력/경력 타입
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

// 스킬 타입
export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
}

// 연락처 폼 타입
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Profile 타입 (Supabase)
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateInput {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
}

// Profile 타입 (Supabase)
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateInput {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
