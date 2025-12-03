import { ReviewNotRegisteredCard } from '../ReviewNotRegisteredCard';
import { ReviewPendingCard } from '../ReviewPendingCard';
import { ReviewEditRequestCard } from '../ReviewEditRequestCard';
import { ReviewCompletedCard } from '../ReviewCompletedCard';

import type { CampaignReviewedCardFooterProps } from './types';

/**
 * 후기 탭 카드 하단 컴포넌트 (footer용)
 * @param reviewStatus - 리뷰 상태
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 * @param campaignId - 캠페인 ID
 * @param applicationId - 신청 ID
 * @returns 후기 탭 카드 하단 컴포넌트 (후기 등록 전, 후기 검토 중, 후기 수정 요청, 후기 등록 완료)
 */
export function CampaignReviewedCardFooter({
  reviewStatus,
  campaignStatus,
  campaignId,
  applicationId,
}: CampaignReviewedCardFooterProps) {
  // reviewStatus가 undefined인 경우 early return
  if (!reviewStatus) {
    return null;
  }

  // 후기 미등록 상태 (notReviewed 또는 visited)
  if (reviewStatus === 'notReviewed' || reviewStatus === 'visited') {
    // campaignId와 applicationId가 없으면 렌더링하지 않음
    if (!campaignId || !applicationId) {
      return null;
    }

    return (
      <ReviewNotRegisteredCard
        campaignStatus={campaignStatus}
        campaignId={campaignId}
        applicationId={applicationId}
      />
    );
  }

  // 후기 검토 중
  if (reviewStatus === 'reviewPending') {
    return <ReviewPendingCard />;
  }

  // 후기 수정 요청
  if (reviewStatus === 'requiredForEditing') {
    return <ReviewEditRequestCard />;
  }

  // 후기 등록 완료
  if (reviewStatus === 'reviewed') {
    return <ReviewCompletedCard />;
  }

  return null;
}
