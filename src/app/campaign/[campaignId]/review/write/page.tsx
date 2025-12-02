'use client';

import { use, Suspense } from 'react';
import { useRouter } from 'next/navigation';

import { LoadingSpinner } from '@shared/components';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { Button } from '@shared/components';
import { ReviewForm } from '@features/review/components/ReviewForm';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';

import styles from './page.module.scss';

interface ReviewWritePageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ReviewWritePage({ params }: ReviewWritePageProps) {
  const { campaignId } = use(params);
  const router = useRouter();
  const { data: campaign, isLoading: isCampaignLoading } = useCampaignDetails(campaignId);
  const { data: user, isLoading: isUserLoading } = useUserInfo();
  const { data: application, isLoading: isApplicationLoading } = useApplicationDetails(
    campaignId,
    user?.id ?? '',
    {
      enabled: !!user?.id,
    },
  );

  usePageHeader({
    showBackButton: true,
    title: '체험 후기 등록',
    showXButton: false,
    isVisible: true,
  });

  if (isCampaignLoading || isUserLoading || isApplicationLoading) {
    return <LoadingSpinner />;
  }

  if (!campaign || !user || !application) {
    return (
      <div className={styles.ReviewWritePage__Error}>
        <p>정보를 불러올 수 없습니다.</p>
        <p>페이지를 새로고침하거나 다시 시도해 주세요.</p>
        <Button onClick={() => router.push('/my?tab=reivewed')}>내 후기 목록으로 이동</Button>
      </div>
    );
  }

  return (
    <main className={styles.ReviewWritePage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ReviewForm campaign={campaign} application={application} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
