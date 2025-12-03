import type { ReviewStatus } from '@entities/application';
import { CampaignStatus } from '@entities/campaign/types/campaign.types';

/**
 * 후기 탭 카드 컴포넌트 타입
 * @param reviewStatus - 후기 상태
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 */
export interface CampaignReviewedCardProps {
  reviewStatus: ReviewStatus | undefined;
  campaignStatus: CampaignStatus | undefined;
  campaignId: string;
  applicationId: string;
}
