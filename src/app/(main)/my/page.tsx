'use client';

import { Suspense } from 'react';
import { CampaignTabs } from '@/features/history/ui/CampaignTabs/CampaignTabs';
import styles from './page.module.scss';

function MyPageContent() {
  return (
    <div className={styles.container}>
      {/* 헤더 (sticky) */}
      <header className={styles.header}>
        <h1 id="page-title">체험단 신청 내역</h1>
      </header>

      {/* 탭 + 컨텐츠 */}
      <main aria-labelledby="page-title" className={styles.main}>
        <CampaignTabs />
      </main>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading} role="status" aria-live="polite">
          로딩 중...
        </div>
      }
    >
      <MyPageContent />
    </Suspense>
  );
}
