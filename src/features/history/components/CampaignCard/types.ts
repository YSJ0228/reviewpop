import type { MyCampaign, MyCampaignStatus } from '@entities/history/types/myCampaign.types';

export interface MyCampaignCardProps {
  campaign: MyCampaign;
  type: MyCampaignStatus;
}
