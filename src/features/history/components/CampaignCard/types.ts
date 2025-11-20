import type { MyCampaign, MyCampaignDetail } from '@entities/history/types/myCampaign.types';

export type TCampaignCardData = MyCampaign &
  Partial<Pick<MyCampaignDetail, 'description' | 'maxRecruitment'>>;

export interface MyCampaignCardProps {
  campaign: TCampaignCardData;
  type: 'rejected' | 'applied' | 'selected' | 'registered' | 'completed';
}
