import { useQuery } from '@tanstack/react-query';
import { getCampaign } from '@entities/campaign/api/campaignApi';
import type { CampaignBottomSheetData } from '../types';

/**
 * 나의 체험(선정) - 바텀시트에 필요한 Campaign 데이터를 조회하는 훅
 * @param campaignId - 체험 ID
 * @param enabled - 데이터 조회 활성화 여부 (기본값: true) (방문 전 상태인 경우 false)
 * @returns 바텀시트에 필요한 Campaign 데이터
 */
export function useCampaignBottomSheetData(campaignId: string, enabled: boolean = true) {
  return useQuery<CampaignBottomSheetData | null>({
    queryKey: ['campaign-bottom-sheet', campaignId],
    queryFn: async () => {
      const campaignDetail = await getCampaign(campaignId);

      return {
        // 제공 혜택에 필요한 데이터(Campaign)
        providedItem: campaignDetail.providedItem,
        description: campaignDetail.description,

        // 후기 미션에 필요한 데이터 (CampaignDetail)
        reviewMission: campaignDetail.reviewMission || [],
        reviewMissionNotice: campaignDetail.reviewMissionNotice || '',
      };
    },
    enabled: enabled && !!campaignId, // campaignId가 있을 때만 쿼리 실행
  });
}
