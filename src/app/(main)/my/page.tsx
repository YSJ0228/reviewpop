'use client';

import { Suspense } from 'react';

import { CampaignTabs } from '@features/history';

import styles from './page.module.scss';

function MyPageContent() {
  return (
    <div className={styles.MyPage}>
      {/* 탭 + 컨텐츠 */}
      <main aria-labelledby="page-title" className={styles.MyPage__Main}>
        <CampaignTabs />
      </main>
    </div>
  );
}

import { usePageHeader } from '@shared/hooks/usePageHeader';

export default function MyPage() {
  usePageHeader({
    showBottomNavigation: true,
  });

  return (
    <Suspense
      fallback={
        <div className={styles['MyPage--Loading']} role="status" aria-live="polite">
          로딩 중...
        </div>
      }
    >
      <MyPageContent />
    </Suspense>
  );
}
