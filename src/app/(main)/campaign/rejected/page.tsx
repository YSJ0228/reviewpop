'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 미선정 캠페인 페이지
 * - 하단 탭: O (나의 체험 활성화)
 * - 신청했지만 선정되지 않은 캠페인 목록
 *
 * TODO:
 * 1. [ ] RejectedList 컴포넌트 구현 (@features/history/components/RejectedList)
 * 2. [ ] 미선정 캠페인 API 연동 (useRejectedCampaigns 훅)
 * 3. [ ] 빈 상태 UI 추가 (선정되지 않은 캠페인이 없을 때)
 * 4. [ ] 캠페인 카드 클릭 시 상세 페이지 이동
 */
export default function RejectedCampaignsPage() {
  return (
    <main className={styles.RejectedCampaignsPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: RejectedList 컴포넌트 추가 */}
          <div className={styles.Placeholder}>
            <p>미선정 캠페인 목록</p>
            <p className={styles.Todo}>
              features/history/components/RejectedList 컴포넌트를 구현하세요
            </p>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
