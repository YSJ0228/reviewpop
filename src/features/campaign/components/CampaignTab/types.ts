import { CampaignTabKey } from '@entities/campaign/types/campaign.types';

export interface CampaignTabProps {
  onTabClick: (status: CampaignTabKey) => void;
  selectedTab: CampaignTabKey;
}
