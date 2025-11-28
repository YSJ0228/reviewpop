import type { Campaign, CampaignStatus } from '@entities/campaign/types/campaign.types';

export interface CampaignListProps {
  status: CampaignStatus;
  filteredCampaigns: Campaign[];
}
