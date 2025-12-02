import type { CampaignStatus } from '@features/campaign';
import type { ReviewStatus } from '@entities/application';

export interface CampaignReviewedCardProps {
  reviewStatus: ReviewStatus | undefined;
  campaignStatus: CampaignStatus | undefined;
}
