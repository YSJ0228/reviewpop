'use client';

import { useRouter } from 'next/navigation';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export function PageHeader({ title, showBackButton = true }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className={styles.PageHeader}>
      {showBackButton && (
        <button
          type="button"
          onClick={handleBack}
          className={styles.PageHeader__BackButton}
          aria-label="뒤로 가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {title && <h1 className={styles.PageHeader__Title}>{title}</h1>}
    </header>
  );
}
