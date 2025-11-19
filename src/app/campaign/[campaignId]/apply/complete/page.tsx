'use client';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 체험 신청 완료 페이지
 * - 하단 탭: X
 * - 신청 완료 메시지 및 안내
 *
 * TODO:
 * 1. [ ] ApplyComplete 컴포넌트 구현 (@features/campaign/components/ApplyComplete)
 * 2. [ ] 신청 정보 요약 표시
 * 3. [ ] "나의 체험으로 이동" 버튼 추가
 * 4. [ ] "홈으로 이동" 버튼 추가
 */
export default function CampaignApplyCompletePage({ params }: { params: { campaignId: string } }) {
  return (
    <main className={styles.CampaignApplyCompletePage}>
      <ErrorBoundary>
        {/* TODO: ApplyComplete 컴포넌트 추가 */}
        <div className={styles.Placeholder}>
          <p>✅ 신청이 완료되었습니다!</p>
          <p>체험 ID: {params.campaignId}</p>
          <p className={styles.Todo}>
            features/campaign/components/ApplyComplete 컴포넌트를 구현하세요
          </p>
        </div>
      </ErrorBoundary>
    </main>
  );
}
