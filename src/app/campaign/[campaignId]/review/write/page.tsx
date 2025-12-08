'use client';

import { use, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, LoadingSpinner, ErrorBoundary } from '@shared/components';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { ReviewForm } from '@features/review/components/ReviewForm';
import { useCreateReview, useReviewPageData, useUpdateReview } from '@entities/review';
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
  const reviewId = searchParams.get('reviewId');

  const isEditMode = !!reviewId;

  const { data, isLoading: isPageLoading } = useReviewPageData(campaignId, applicationId);
  const { campaign, user, application } = data || {};

  const { mutate: createReview, isPending: isCreatePending } = useCreateReview(campaignId, () =>
    router.push('/my?tab=reviewed'),
  );

  const { mutate: updateReview, isPending: isUpdatePending } = useUpdateReview(
    reviewId || '',
    campaignId,
    () => router.push('/my?tab=reviewed'),
  );

  const reviewLinkInput = useInputValidate('blogUrl');
  const [isLinkVerified, setIsLinkVerified] = useState(false);

  const isLoading = isPageLoading;
  const isPending = isCreatePending || isUpdatePending;

  const isSubmitDisabled =
    !reviewLinkInput.value || // 빈 값 체크 (먼저)
    !!reviewLinkInput.errorMsg || // 에러 체크
    !isLinkVerified || // 링크 검증 체크
    isPending; // 로딩 중 체크

  usePageHeader({
    showBackButton: true,
    title: isEditMode ? '체험 후기 수정' : '체험 후기 등록',
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
    if (!campaign?.id || !application?.userId) return;

    const payload = {
      campaignId: campaign.id,
      userId: application.userId,
      reviewUrl: reviewLinkInput.value,
    };
    if (isEditMode && reviewId) {
      updateReview(payload);
    } else {
      createReview(payload);
    }
  };

  return (
    <main className={styles.ReviewWritePage}>
      <ErrorBoundary>
        <ReviewForm
          campaign={campaign}
          application={application}
          reviewLinkInput={reviewLinkInput}
          onValidationChange={setIsLinkVerified}
        />
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {isPending ? '등록 중...' : isEditMode ? '후기 재등록' : '후기 등록'}
        </Button>
      </ErrorBoundary>
    </main>
  );
}
