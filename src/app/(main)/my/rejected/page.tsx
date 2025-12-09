'use client';

import { Suspense } from 'react';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import { RejectedList } from '@features/history/components/RejectedList';

import styles from './page.module.scss';
import { LoadingSpinner } from '@shared/components';

/**
 * 미선정 체험 페이지
 * - 하단 탭: O (나의 체험 활성화)
 * - 신청했지만 선정되지 않은 체험 목록
 *
 * TODO:
 * 1. [ ] RejectedList 컴포넌트 구현 (@features/history/components/RejectedList)
 * 2. [ ] 미선정 체험 API 연동 (useRejectedCampaigns 훅)
 * 3. [ ] 빈 상태 UI 추가 (선정되지 않은 체험이 없을 때)
 * 4. [ ] 체험 카드 클릭 시 상세 페이지 이동
 */
export default function RejectedCampaignsPage() {
  usePageHeader({
    showBackButton: true,
    title: '미선정 체험 내역',
    showBottomNavigation: false,
  });

  return (
    <main className={styles.RejectedCampaignsPage}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RejectedList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
