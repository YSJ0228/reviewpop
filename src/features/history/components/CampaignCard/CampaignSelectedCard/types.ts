import type {
  MyCampaign,
  MyCampaignScheduleStatus,
} from '@entities/history/types/myCampaign.types';

export interface CampaignSelectedCardProps {
  campaign: MyCampaign;
  visitStatus: MyCampaignScheduleStatus;
}
