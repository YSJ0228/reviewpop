import { useQuery } from '@tanstack/react-query';
import type { Campaign, CampaignStatus } from '@entities/campaign/types/campaign.types';

interface CampaignsResponse {
  data: Campaign[];
  success: boolean;
}

/**
 * 체험 목록을 가져오는 React Query 훅
 */
export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async (): Promise<Campaign[]> => {
      const response = await fetch('/api/campaigns');
      if (!response.ok) {
        throw new Error('체험 목록을 불러오는데 실패했습니다.');
      }
      const json: CampaignsResponse = await response.json();
      return json.data;
    },
  });
}

/**
 * 특정 상태의 체험만 필터링하는 헬퍼 함수
 */
export function filterCampaignsByStatus(
  campaigns: Campaign[] | undefined,
  status: CampaignStatus,
): Campaign[] {
  if (!campaigns) return [];
  return campaigns.filter((campaign) => campaign.status === status);
}
