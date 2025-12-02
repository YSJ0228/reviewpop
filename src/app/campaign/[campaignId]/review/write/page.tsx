'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { Button } from '@shared/components';
import { ReviewForm } from '@features/review/components/ReviewForm';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';

import styles from './page.module.scss';

/**
 * 체험 후기 작성 페이지
 * - 하단 탭: X
 * - 체험 완료 후 후기 작성
 * - 진입점: 나의 체험 > 선정된 체험 > 후기 작성 버튼
 *
 * TODO:
 * 1. [ ] ReviewForm 컴포넌트 구현 (@features/review/components/ReviewForm)
 * 2. [ ] 텍스트 입력 (제목, 내용)
 * 3. [ ] 이미지 업로드 기능
 * 4. [ ] 별점 입력 기능
 * 5. [ ] 후기 제출 API 연동 (useSubmitReview 훅)
 * 6. [ ] 제출 완료 시 나의 체험 또는 체험 상세로 이동
 */

// ...

import { use } from 'react';
import { LoadingSpinner } from '@shared/components';

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
