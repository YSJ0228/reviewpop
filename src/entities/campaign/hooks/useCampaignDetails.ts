import { useQuery } from '@tanstack/react-query';
import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import { getCampaign } from '../api/campaignApi';

/**
 * 체험 상세 정보를 가져오는 React Query 훅
 */
export function useCampaignDetails(id: string) {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => getCampaign(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
}
