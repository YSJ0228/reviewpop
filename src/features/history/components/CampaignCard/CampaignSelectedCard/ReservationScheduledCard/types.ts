import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

/**
 * 방문 예정 상태 카드 컴포넌트 타입
 * @param campaign - 캠페인 정보
 */
export interface ReservationScheduledCardProps {
  campaign: CampaignDetail;
}
