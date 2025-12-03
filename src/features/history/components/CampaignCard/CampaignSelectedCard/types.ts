import type { CampaignDetail } from '@entities/campaign/types/campaign.types';
import type { VisitStatus } from '@features/history/types';

export interface CampaignSelectedCardProps {
  campaign: CampaignDetail;
  visitStatus: VisitStatus;
}
