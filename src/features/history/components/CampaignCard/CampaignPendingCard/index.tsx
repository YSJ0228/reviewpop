import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { useCampaignCardData } from '@entities/history/hooks/useCampaignCardData';

import { CampaignAppliedCard } from '../CampaignAppliedCard';

import type { CampaignPendingCardProps } from './types';

/**
 * 후기 작성 전 타입 전용 카드 컴포넌트 ((visited || notReviewed))
 * @param application - 체험 신청 정보
 */
export function CampaignPendingCard({ application }: CampaignPendingCardProps) {
  const { campaign, announcementStatus } = useCampaignCardData(application);

  return (
    <CampaignCardWrapper
      campaign={campaign}
      topContent={
        <CampaignAppliedCard announcementStatus={announcementStatus} campaignId={campaign.id} />
      }
    />
  );
}
