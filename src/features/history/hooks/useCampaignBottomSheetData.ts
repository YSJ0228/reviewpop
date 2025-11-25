import { findCampaignById, mockCampaignDetails } from '@entities/campaign/lib';
import { useMemo } from 'react';

/**
 * 나의 체험(선정) - 바텀시트에 필요한 Campaign 데이터를 조회하는 훅
 * @param campaignId
 * @returns
 */
export function useCampaignBottomSheetData(campaignId: string) {
  return useMemo(() => {
    const campaign = findCampaignById(campaignId);

    const campaignDetail = mockCampaignDetails[campaignId];

    if (!campaign) {
      return null;
    }

    return {
      // 제공 혜택에 필요한 데이터(Campaign)
      providedItems: campaign.providedItems,
      description: campaign.description,

      // 후기 미션에 필요한 데이터 (CampaignDetail)
      reviewMission: campaignDetail?.reviewMission || [],
      reviewMissionNotice: campaignDetail?.reviewMissionNotice || '',
    };
  }, [campaignId]);
}
