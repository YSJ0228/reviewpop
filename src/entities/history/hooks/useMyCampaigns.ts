import { useQuery } from '@tanstack/react-query';
import type { MyCampaign, MyCampaignStatus } from '@entities/history/types/myCampaign.types';

interface MyCampaignsResponse {
  data: MyCampaign[];
  success: boolean;
}

/**
 * 캠페인 목록을 가져오는 React Query 훅
 */
export function useMyCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async (): Promise<MyCampaign[]> => {
      const response = await fetch('/api/my-campaigns');
      if (!response.ok) {
        throw new Error('캠페인 목록을 불러오는데 실패했습니다.');
      }
      const json: MyCampaignsResponse = await response.json();
      return json.data;
    },
  });
}

/**
 * 특정 상태의 캠페인만 필터링하는 헬퍼 함수
 */
export function filterCampaignsByStatus(
  campaigns: MyCampaign[] | undefined,
  status: MyCampaignStatus,
): MyCampaign[] {
  if (!campaigns) return [];
  return campaigns.filter((campaign) => campaign.status === status);
}
