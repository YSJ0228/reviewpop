'use client';

import { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, LoadingSpinner, ErrorBoundary } from '@shared/components';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { useApplicationById } from '@entities/application/hooks/useApplicationById';
import { ReviewForm } from '@features/review/components/ReviewForm';
import { useCreateReview } from '@features/review/hooks/useReview';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import styles from './page.module.scss';

interface ReviewWritePageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ReviewWritePage({ params }: ReviewWritePageProps) {
  const { campaignId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId');

  const { data: campaign, isLoading: isCampaignLoading } = useCampaignDetails(campaignId);
  const { data: user, isLoading: isUserLoading } = useUserInfo();

  const { data: application, isLoading: isApplicationLoading } = useApplicationById(applicationId);

  const { mutate: createReview, isPending } = useCreateReview(
    campaign?.id ?? null,
    application?.userId ?? null,
  );

  const reviewLinkInput = useInputValidate('blogUrl');

  const isLoading = isCampaignLoading || isUserLoading || isApplicationLoading;

  const isSubmitDisabled =
    !reviewLinkInput.value || // 빈 값 체크 (먼저)
    !!reviewLinkInput.errorMsg || // 에러 체크
    isPending; // 로딩 중 체크

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
        <ReviewForm
          campaign={campaign}
          application={application}
          reviewLinkInput={reviewLinkInput}
        />
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {isPending ? '등록 중...' : '후기 등록'}
        </Button>
      </ErrorBoundary>
    </main>
  );
}
