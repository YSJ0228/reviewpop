import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button 컴포넌트의 Props 타입 정의
 *
 * ButtonHTMLAttributes를 상속받아 기본 button 요소의 모든 속성을 사용할 수 있습니다.
 * (onClick, disabled, type 등)
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내부에 표시될 내용 (텍스트, 아이콘 등) */
  children: ReactNode;
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'warning';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 버튼 모서리 둥글기 */
  radius?: number;
}
