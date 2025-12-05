import type { CampaignDetail } from '@entities/campaign/types/campaign.types';
import type { VisitStatus } from '@features/history/types';
import type { Application } from '@entities/application';

export interface CampaignSelectedCardFooterProps {
  campaign: CampaignDetail;
  visitStatus: VisitStatus;
  application: Application;
}
