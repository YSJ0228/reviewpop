import type { CampaignStatus } from '@entities/campaign/types/campaign.types';

/**
 * 후기 미등록 상태 카드 컴포넌트 타입
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 * @param campaignId - 캠페인 ID
 * @param applicationId - 신청 ID
 */
export interface ReviewNotRegisteredCardProps {
  campaignStatus: CampaignStatus | undefined;
  campaignId: string;
  applicationId: string;
}
