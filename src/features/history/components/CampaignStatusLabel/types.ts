import { TCardType } from '@features/history/constants';
import type { VisitStatus } from '@features/history/types';
import type { CampaignStatus } from '@entities/campaign/types/campaign.types';
import type { ReviewStatus } from '@entities/application';

export interface CampaignStatusLabelProps {
  type: TCardType;
  visitStatus: VisitStatus | undefined;
  reviewStatus: ReviewStatus | undefined;
  reservationDate: string | undefined;
  campaignStatus: CampaignStatus | undefined;
}
