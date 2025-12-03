import type { CampaignStatus } from '@features/campaign';
import type { ReviewStatus } from '@entities/application';

/**
 * 후기 탭 카드 하단 컴포넌트 타입
 * @param reviewStatus - 후기 상태
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 */
export interface CampaignReviewedCardFooterProps {
  reviewStatus: ReviewStatus | undefined;
  campaignStatus: CampaignStatus | undefined;
}
