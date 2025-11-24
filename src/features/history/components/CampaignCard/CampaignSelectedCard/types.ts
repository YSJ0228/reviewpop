import type { MyCampaignScheduleStatus } from '@entities/history/types/myCampaign.types';

export interface CampaignSelectedCardProps {
  visitStatus: MyCampaignScheduleStatus;
  onReservationClick?: () => void;
  onReviewMissionClick?: () => void;
}
