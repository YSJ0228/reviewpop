import { TCardType, VisitStatus } from '@features/history/constants';

import type { ReviewStatus } from '@entities/application';
import type { CampaignStatus } from '@features/campaign';

export interface CampaignStatusLabelProps {
  type: TCardType;
  visitStatus: VisitStatus | undefined;
  reviewStatus: ReviewStatus | undefined;
  reservationDate: string | undefined;
  campaignStatus: CampaignStatus | undefined;
}
