/**
 * Supabase Database Types
 *
 * 이 파일은 Supabase CLI로 자동 생성됩니다.
 * 직접 수정하지 마세요!
 *
 * 생성 명령어:
 * npm run gen:types
 *
 * 또는:
 * npx supabase gen types typescript --project-id [프로젝트ID] > src/types/database.types.ts
 *
 * 사전 요구사항:
 * 1. Supabase CLI 설치: npm install -g supabase
 * 2. 로그인: npx supabase login
 * 3. .env.local에 SUPABASE_PROJECT_ID 추가
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // 예시: users 테이블
      // users: {
      //   Row: {
      //     id: string;
      //     email: string;
      //     created_at: string;
      //     updated_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     email: string;
      //     created_at?: string;
      //     updated_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     email?: string;
      //     created_at?: string;
      //     updated_at?: string;
      //   };
      // };

      // 예시: projects 테이블
      // projects: {
      //   Row: {
      //     id: string;
      //     user_id: string;
      //     title: string;
      //     description: string | null;
      //     image_url: string | null;
      //     created_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     user_id: string;
      //     title: string;
      //     description?: string | null;
      //     image_url?: string | null;
      //     created_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     user_id?: string;
      //     title?: string;
      //     description?: string | null;
      //     image_url?: string | null;
      //     created_at?: string;
      //   };
      // };

      // Supabase에 테이블을 생성한 후 npm run gen:types를 실행하면
      // 이 부분이 자동으로 채워집니다.
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// 타입 헬퍼
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
