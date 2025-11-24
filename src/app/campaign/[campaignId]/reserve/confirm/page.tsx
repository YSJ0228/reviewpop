'use client';

import { Suspense, use } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { PageHeader } from '@shared/components';
import { useCampaignDetails } from '@features/campaign';

import styles from './page.module.scss';

/**
 * 예약 정보 확인 페이지
 * - 하단 탭: X
 * - 입력한 예약 정보 확인 및 최종 제출
 *
 * TODO:
 * 1. [ ] ReserveConfirm 컴포넌트 구현 (@features/reserve/components/ReserveConfirm)
 * 2. [ ] 예약 정보 요약 표시 (날짜, 시간, 방문자 정보)
 * 3. [ ] 최종 제출 API 연동 (useReserve 훅)
 * 4. [ ] 제출 완료 시 /campaign/[id]/reserve/complete로 리다이렉트
 * 5. [ ] 수정 버튼 (이전 페이지로 돌아가기)
 */

interface ReserveConfirmPageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ReserveConfirmPage({ params }: ReserveConfirmPageProps) {
  const { campaignId } = use(params);

  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);

  if (isLoading) {
    return (
      <div className={styles.ReserveConfirmPage}>
        <PageHeader showBackButton />
        <div className={styles.ReserveConfirmPage__Loading}>
          <p>체험 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className={styles.ReserveConfirmPage}>
        <PageHeader showBackButton />
        <div className={styles.ReserveConfirmPage__Error}>
          <p>체험 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.ReserveConfirmPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <PageHeader showBackButton title={'예약 정보 확인'} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
