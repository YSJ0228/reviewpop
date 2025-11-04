'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 캠페인 방문 예약 페이지
 * - 하단 탭: X
 * - 선정된 캠페인의 방문 예약 폼
 * - 진입점: 나의 체험 > 신청 탭 > 예약하기 버튼
 *
 * TODO:
 * 1. [ ] ReserveForm 컴포넌트 구현 (@features/reserve/components/ReserveForm)
 * 2. [ ] 날짜/시간 선택 UI 구현
 * 3. [ ] 예약 가능한 시간 확인 API 연동
 * 4. [ ] 예약 정보 입력 (방문자 정보 등)
 * 5. [ ] 예약 확인 페이지로 이동 (/campaign/[id]/reserve/confirm)
 */
export default function CampaignReservePage({ params }: { params: { campaignId: string } }) {
  return (
    <main className={styles.CampaignReservePage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: ReserveForm 컴포넌트 추가 */}
          <div className={styles.Placeholder}>
            <p>캠페인 ID: {params.campaignId}</p>
            <p>방문 예약하기</p>
            <p className={styles.Todo}>
              features/reserve/components/ReserveForm 컴포넌트를 구현하세요
            </p>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
