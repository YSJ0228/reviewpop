'use client';

import styles from './LoadingSpinner.module.scss';

/**
 * 로딩 스피너 컴포넌트
 *
 * TODO:
 * 1. [ ] 디자인 시스템에 맞는 스피너 애니메이션 구현
 */

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'gray';
  message?: string;
}

export function LoadingSpinner({
  size = 'medium',
  color = 'primary',
  message,
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: styles['Spinner--Small'],
    medium: styles['Spinner--Medium'],
    large: styles['Spinner--Large'],
  };

  const colorMap = {
    primary: styles['Circle--Primary'],
    white: styles['Circle--White'],
    gray: styles['Circle--Gray'],
  };

  return (
    <div className={styles.LoadingSpinner}>
      <div className={`${styles.Spinner} ${sizeMap[size]}`}>
        <div className={`${styles.Circle} ${colorMap[color]}`} />
      </div>
      {message && <p className={styles.Message}>{message}</p>}
    </div>
  );
}
