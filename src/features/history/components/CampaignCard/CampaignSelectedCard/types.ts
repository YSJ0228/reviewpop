import type { CampaignDetail } from '@entities/campaign/types/campaign.types';
import type { VisitStatus } from '@features/history/constants';

export interface CampaignSelectedCardProps {
  campaign: CampaignDetail;
  visitStatus: VisitStatus;
  applicationId: string;
}
