import { TCardType, VisitStatus } from '@features/history/constants';
import { CampaignStatus } from '@entities/campaign/types/campaign.types';
import type { ReviewStatus } from '@entities/application';

export interface CampaignStatusLabelProps {
  type: TCardType;
  visitStatus: VisitStatus | undefined;
  reviewStatus: ReviewStatus | undefined;
  reservationDate: string | undefined;
  campaignStatus: CampaignStatus | undefined;
}
