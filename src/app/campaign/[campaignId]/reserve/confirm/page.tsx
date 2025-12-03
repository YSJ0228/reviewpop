'use client';

import { Suspense, use } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { ReserveConfirm } from '@features/reserve/components/ReserveConfirm';
import { useCampaignDetails } from '@features/history';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import styles from './page.module.scss';

interface ReserveConfirmPageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ReserveConfirmPage({ params }: ReserveConfirmPageProps) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);

  usePageHeader({
    showBackButton: true,
    title: '예약 정보 확인',
  });

  if (isLoading) {
    return (
      <div className={styles.ReserveConfirmPage}>
        <div className={styles.ReserveConfirmPage__Loading}>
          <p>체험 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className={styles.ReserveConfirmPage}>
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
          <ReserveConfirm campaignId={campaignId} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
