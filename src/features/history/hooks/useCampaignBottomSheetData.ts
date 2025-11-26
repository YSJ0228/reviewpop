import { findCampaignById, mockCampaignDetails } from '@entities/campaign/lib';

/**
 * 나의 체험(선정) - 바텀시트에 필요한 Campaign 데이터를 조회하는 훅
 * @param campaignId - 체험 ID
 * @param enabled - 데이터 조회 활성화 여부 (기본값: true) (방문 전 상태인 경우 false)
 * @returns 바텀시트에 필요한 Campaign 데이터
 */
export function useCampaignBottomSheetData(campaignId: string, enabled: boolean = true) {
  // enabled가 false이면 데이터 조회를 건너뜀
  if (!enabled) {
    return null;
  }

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
}
