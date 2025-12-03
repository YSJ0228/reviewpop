import type { CampaignStatus } from '@entities/campaign/types/campaign.types';
import type { ReviewStatus } from '@entities/application';

/**
 * 후기 탭 카드 하단 컴포넌트 타입
 * @param reviewStatus - 후기 상태
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 * @param campaignId - 캠페인 ID (후기 미등록 상태일 때만 필요)
 * @param applicationId - 신청 ID (후기 미등록 상태일 때만 필요)
 * @param reviewId - 후기 ID (후기 수정 요청 상태일 때만 필요)
 */
export interface CampaignReviewedCardFooterProps {
  reviewStatus: ReviewStatus | undefined;
  campaignStatus: CampaignStatus | undefined;
  campaignId?: string;
  applicationId?: string;
  reviewId?: string;
}
