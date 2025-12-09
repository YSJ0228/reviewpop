'use client';

import { Suspense } from 'react';

import { CampaignTabs } from '@features/history';

import styles from './page.module.scss';

import { usePageHeader } from '@shared/hooks/usePageHeader';
import { LoadingSpinner } from '@shared/components';

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

export default function MyPage() {
  usePageHeader({
    showBottomNavigation: true,
    showBackButton: false,
  });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MyPageContent />
    </Suspense>
  );
}
