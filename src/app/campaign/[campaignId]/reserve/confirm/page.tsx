'use client';

import { Suspense, use } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { PageHeader } from '@shared/components';
import { useCampaignDetails } from '@features/campaign';
import { ReserveConfirm } from '@features/reserve/components/ReserveConfirm';

import styles from './page.module.scss';

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
          <ReserveConfirm campaignId={campaignId} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
