'use client';
import { Suspense, use } from 'react';
import { Loader } from '@mantine/core';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { ApplyForm } from '@features/campaign/components/ApplyForm';

import styles from './page.module.scss';

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
interface CampaignApplyPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function CampaignApplyPage({ params }: CampaignApplyPageProps) {
  const { campaignId } = use(params);

  return (
    <main className={styles.CampaignApplyPage}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          {/* TODO: ApplyForm 컴포넌트 추가 */}
          <ApplyForm campaignId={campaignId} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
