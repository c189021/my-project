import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * className 유틸리티 함수
 * clsx와 tailwind-merge를 결합하여 조건부 클래스와 Tailwind 클래스 충돌을 해결합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
