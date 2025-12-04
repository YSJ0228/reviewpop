import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { useCampaignCardData } from '@features/history/hooks/useCampaignCardData';

import { CampaignRejectedCardFooter } from './CampaignRejectedCardFooter';

import type { CampaignRejectedCardProps } from './types';

/**
 * REJECTED 타입 전용 카드 컴포넌트 (체험 미선정)
 * @param application - 체험 신청 정보
 */
export function CampaignRejectedCard({ application }: CampaignRejectedCardProps) {
  const { campaign, recruitmentSchedule } = useCampaignCardData(application);

  return (
    <CampaignCardWrapper
      campaign={campaign}
      bottomContent={
        <CampaignRejectedCardFooter
          recruitmentSchedule={recruitmentSchedule}
          maxRecruitment={campaign.maxRecruitment}
        />
      }
    />
  );
}
