'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { IconArrowLeft } from '@pop-ui/foundation';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import { RejectedList } from '@features/history/components/RejectedList';

import styles from './page.module.scss';
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
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className={styles.RejectedCampaignsPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: RejectedList 컴포넌트 추가 */}
          <div className={styles.RejectedCampaignsPage__Header}>
            <button onClick={handleBack} type="button" aria-label="뒤로 가기">
              <IconArrowLeft />
            </button>
            <span className={styles.RejectedCampaignsPage__HeaderTitle}>미선정 체험 내역</span>
          </div>
          <RejectedList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
