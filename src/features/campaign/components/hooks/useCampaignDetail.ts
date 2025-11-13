import { useQuery } from '@tanstack/react-query';
import type { CampaignDetail } from '../types/campaign.types';

interface CampaignDetailResponse {
  data: CampaignDetail;
  success: boolean;
}

/**
 * 캠페인 상세 정보를 가져오는 React Query 훅
 */
export function useCampaignDetail(id: string) {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: async (): Promise<CampaignDetail> => {
      const response = await fetch(`/api/campaigns/${id}`);
      if (!response.ok) {
        throw new Error('캠페인 상세 정보를 불러오는데 실패했습니다.');
      }
      const json: CampaignDetailResponse = await response.json();
      return json.data;
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
}
