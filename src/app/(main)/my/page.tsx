'use client';

import { Suspense } from 'react';

import { CampaignTabs } from '@features/history';

import styles from './page.module.scss';

function MyPageContent() {
  return (
    <div className={styles.MyPage}>
      {/* 헤더 (sticky) */}
      <header className={styles.MyPage__Header}>
        <h1 id="page-title">체험단 신청 내역</h1>
      </header>

      {/* 탭 + 컨텐츠 */}
      <main aria-labelledby="page-title" className={styles.MyPage__Main}>
        <CampaignTabs />
      </main>
    </div>
  );
}

export default function MyPage() {
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
