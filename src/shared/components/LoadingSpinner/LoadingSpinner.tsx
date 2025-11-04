'use client';

import styles from './LoadingSpinner.module.scss';

/**
 * 로딩 스피너 컴포넌트
 *
 * TODO:
 * 1. [ ] 디자인 시스템에 맞는 스피너 애니메이션 구현
 * 2. [ ] 크기 옵션 추가 (small, medium, large)
 * 3. [ ] 색상 옵션 추가
 */

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
  const sizeMap = {
    small: styles['Spinner--Small'],
    medium: styles['Spinner--Medium'],
    large: styles['Spinner--Large'],
  };

  return (
    <div className={styles.LoadingSpinner}>
      <div className={`${styles.Spinner} ${sizeMap[size]}`}>
        {/* TODO: 실제 스피너 애니메이션 구현 */}
        <div className={styles.Circle} />
      </div>
      {message && <p className={styles.Message}>{message}</p>}
    </div>
  );
}
