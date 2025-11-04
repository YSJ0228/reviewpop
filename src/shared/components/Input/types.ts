import { InputHTMLAttributes } from 'react';

/**
 * Input 컴포넌트의 Props 타입 정의
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** input 라벨 */
  label?: string;
  /** 에러 메시지 (있으면 에러 상태로 표시) */
  error?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}
