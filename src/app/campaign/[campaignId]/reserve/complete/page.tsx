'use client';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 예약 완료 페이지
 * - 하단 탭: X
 * - 예약 완료 메시지 및 예약 정보 확인
 *
 * TODO:
 * 1. [ ] ReserveComplete 컴포넌트 구현 (@features/reserve/components/ReserveComplete)
 * 2. [ ] 예약 정보 요약 표시 (예약 번호, 날짜, 시간, 장소)
 * 3. [ ] "나의 체험으로 이동" 버튼 추가
 * 4. [ ] "홈으로 이동" 버튼 추가
 * 5. [ ] 캘린더에 추가 기능 (선택적)
 */
export default function ReserveCompletePage({ params }: { params: { campaignId: string } }) {
  return (
    <main className={styles.ReserveCompletePage}>
      <ErrorBoundary>
        {/* TODO: ReserveComplete 컴포넌트 추가 */}
        <div className={styles.Placeholder}>
          <p>✅ 예약이 완료되었습니다!</p>
          <p>캠페인 ID: {params.campaignId}</p>
          <p className={styles.Todo}>
            features/reserve/components/ReserveComplete 컴포넌트를 구현하세요
          </p>
        </div>
      </ErrorBoundary>
    </main>
  );
}
