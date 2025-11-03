import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

/**
 * Input 컴포넌트의 Props 타입 정의
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** input 라벨 */
  label?: string;
  /** 에러 메시지 (있으면 에러 상태로 표시) */
  error?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * Input 컴포넌트
 *
 * 프로젝트 전체에서 사용하는 기본 input 컴포넌트입니다.
 * forwardRef를 사용하여 ref를 전달받을 수 있습니다.
 *
 * @example
 * ```tsx
 * <Input
 *   label="이메일"
 *   type="email"
 *   placeholder="email@example.com"
 *   error={errors.email}
 *   onChange={handleChange}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const containerClassName = [styles.Input, fullWidth ? styles['Input--FullWidth'] : '']
      .filter(Boolean)
      .join(' ');

    const inputClassName = [
      styles.Input__Field,
      error ? styles['Input__Field--Error'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClassName}>
        {label && <label className={styles.Input__Label}>{label}</label>}
        <input ref={ref} className={inputClassName} {...props} />
        {error && <span className={styles.Input__ErrorMessage}>{error}</span>}
      </div>
    );
  },
);

// displayName을 설정하면 React DevTools에서 컴포넌트 이름이 표시됩니다
Input.displayName = 'Input';
