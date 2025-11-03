import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

/**
 * Button 컴포넌트의 Props 타입 정의
 *
 * ButtonHTMLAttributes를 상속받아 기본 button 요소의 모든 속성을 사용할 수 있습니다.
 * (onClick, disabled, type 등)
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내부에 표시될 내용 (텍스트, 아이콘 등) */
  children: ReactNode;
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * Button 컴포넌트
 *
 * 프로젝트 전체에서 사용하는 기본 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   클릭하세요
 * </Button>
 * ```
 */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  // 클래스명을 조합합니다
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
