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

import { useCreateReview } from '@features/review/hooks/useReview';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

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

  const { mutate: createReview, isPending } = useCreateReview(
    campaign?.id ?? '',
    application?.userId ?? '',
  );
  const reviewLinkInput = useInputValidate('blogUrl');

  const isLoading = isCampaignLoading || isUserLoading || isApplicationLoading;

  const isSubmitDisabled = Boolean(reviewLinkInput.errorMsg) || !reviewLinkInput.value || isPending;

  usePageHeader({
    showBackButton: true,
    title: '체험 후기 등록',
    showXButton: false,
    isVisible: true,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!campaign || !user || !application) {
    const errorMessage = !campaign
      ? '캠페인 정보를 불러올 수 없습니다.'
      : !user
        ? '사용자 정보를 불러올 수 없습니다.'
        : '신청 정보를 불러올 수 없습니다.';

    return (
      <div className={styles.ReviewWritePage__Error}>
        <p>{errorMessage}</p>
        <p>페이지를 새로고침하거나 다시 시도해 주세요.</p>
        <Button onClick={() => router.push('/my?tab=reviewed')}>내 후기 목록으로 이동</Button>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!reviewLinkInput.value || reviewLinkInput.errorMsg) return;

    createReview({
      campaignId: campaign.id,
      userId: application.userId,
      reviewUrl: reviewLinkInput.value,
    });
  };

  return (
    <main className={styles.ReviewWritePage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ReviewForm
            campaign={campaign}
            application={application}
            reviewLinkInput={reviewLinkInput}
          />
          <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
            {isPending ? '등록 중...' : '후기 등록'}
          </Button>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
