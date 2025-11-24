'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';
import { BottomSheet } from '@shared/components/BottomSheet';

/**
 * 체험 신청 페이지
 * - 하단 탭: X
 * - 체험 신청 폼
 *
 * TODO:
 * 1. [ ] ApplyForm 컴포넌트 구현 (@features/campaign/components/ApplyForm)
 * 2. [ ] 폼 validation 추가 (필수 항목 체크)
 * 3. [ ] 신청 API 연동 (useApplyCampaign 훅)
 * 4. [ ] 신청 완료 시 /campaign/[id]/apply/complete로 리다이렉트
 * 5. [ ] 에러 처리 (이미 신청한 경우, 마감된 경우 등)
 */
export default function CampaignApplyPage({ params }: { params: { campaignId: string } }) {
  return (
    <main className={styles.CampaignApplyPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: ApplyForm 컴포넌트 추가 */}
          <BottomSheet
            onClick={() => {}}
            onClose={() => {}}
            title="블로그 아이디를 입력해주세요"
          ></BottomSheet>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
