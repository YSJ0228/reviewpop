import type { ButtonProps } from './types';
import styles from './style.module.scss';

/**
 * Button 컴포넌트
 *
 * 프로젝트 전체에서 사용하는 기본 버튼 컴포넌트입니다.
 *
 * @example
 *
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   클릭하세요
 * </Button>
 *  */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  radius,
  style,
  ...props
}: ButtonProps) {
  // variant와 size를 파스칼 케이스 BEM 형식으로 변환
  const variantClass = `Button--${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
  const sizeClass = `Button--${size.charAt(0).toUpperCase()}${size.slice(1)}`;

  // 클래스명을 조합합니다
  const classNames = [
    styles.Button,
    styles[variantClass],
    styles[sizeClass],
    fullWidth ? styles['Button--FullWidth'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // radius가 제공되면 인라인 스타일로 적용
  const inlineStyle =
    radius !== undefined
      ? { ...style, borderRadius: `${Math.max(0, radius)}px` } // 음수 방지
      : style;

  return (
    <button className={classNames} style={inlineStyle} {...props}>
      {children}
    </button>
  );
}
