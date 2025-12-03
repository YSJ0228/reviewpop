'use client';

import { Suspense, use } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import styles from './page.module.scss';
import { ReserveForm } from '@features/reserve/components/ReserveForm';

/**
 * 체험 방문 예약 페이지
 * - 하단 탭: X
 * - 선정된 체험의 방문 예약 폼
 * - 진입점: 나의 체험 > 신청 탭 > 예약하기 버튼
 *
 * TODO:
 * 1. [ ] ReserveForm 컴포넌트 구현 (@features/reserve/components/ReserveForm)
 * 2. [ ] 날짜/시간 선택 UI 구현
 * 3. [ ] 예약 가능한 시간 확인 API 연동
 * 4. [ ] 예약 정보 입력 (방문자 정보 등)
 * 5. [ ] 예약 확인 페이지로 이동 (/campaign/[id]/reserve/confirm)
 */
export default function CampaignReservePage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  usePageHeader({
    showBackButton: true,
    title: '체험 방문 예약 폼 헤더',
  });

  return (
    <main className={styles.CampaignReservePage}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ReserveForm campaignId={campaignId} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
