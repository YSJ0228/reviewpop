'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';
import { CampaignList } from '@features/campaign';

/**
 * 홈 페이지 (체험 목록)
 * - 하단 탭: O
 * - 전체 체험 목록 + 필터 + 배너
 *
 * TODO:
 * 1. [ ] Banner 컴포넌트 구현 (@shared/components/Banner)
 * 2. [ ] CampaignFilter 컴포넌트 구현 (@features/campaign/components/CampaignFilter)
 * 3. [ ] CampaignList 컴포넌트 구현 (@features/campaign/components/CampaignList)
 * 5. [ ] 필터 기능 구현 (카테고리, 지역, 상태 등)
 * 6. [ ] 무한 스크롤 또는 페이지네이션
 */
export default function Home() {
  return (
    <main className={styles.HomeContainer}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: Banner 컴포넌트 추가 */}
          {/* TODO: CampaignFilter 컴포넌트 추가 */}
          <div className={styles.ListContainer}>
            <CampaignList status="active" />
            <CampaignList status="before_recruiting" />
            <CampaignList status="closed" />
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
