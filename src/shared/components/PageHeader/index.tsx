'use client';

import { useRouter } from 'next/navigation';
import { IconChevronLeft, IconClose } from '@pop-ui/foundation';

import type { PageHeaderProps } from './types';
import styles from './style.module.scss';

export function PageHeader({
  title,
  showBackButton = true,
  showXButton = false,
  onBack,
  onX,
  rightAction,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={`${styles.PageHeader} ${showXButton ? styles.HasXButton : ''}`}>
      {showBackButton && (
        <button
          type="button"
          onClick={handleBack}
          className={styles.PageHeader__BackButton}
          aria-label="뒤로 가기"
        >
          <IconChevronLeft />
        </button>
      )}
      {title && <h1 className={styles.PageHeader__Title}>{title}</h1>}
      {showXButton && (
        <button
          type="button"
          onClick={onX}
          className={styles.PageHeader__BackButton}
          aria-label="닫기"
        >
          <IconClose />
        </button>
      )}
      {rightAction && <div className={styles.PageHeader__RightAction}>{rightAction}</div>}
    </header>
  );
}
