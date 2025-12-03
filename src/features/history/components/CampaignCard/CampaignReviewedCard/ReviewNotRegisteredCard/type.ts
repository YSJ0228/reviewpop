import type { CampaignStatus } from '@features/campaign';

/**
 * 후기 미등록 상태 카드 컴포넌트 타입
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 */
export interface ReviewNotRegisteredCardProps {
  campaignStatus: CampaignStatus | undefined;
}
