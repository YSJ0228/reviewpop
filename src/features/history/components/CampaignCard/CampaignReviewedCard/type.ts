import type { ReviewStatus } from '@entities/application';
import { CampaignStatus } from '@entities/campaign/types/campaign.types';

export interface CampaignReviewedCardProps {
  reviewStatus: ReviewStatus | undefined;
  campaignStatus: CampaignStatus | undefined;
  campaignId: string;
  applicationId: string;
}
