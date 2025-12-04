import {
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query';
import type { CampaignStatus } from '@entities/campaign/types/campaign.types';
import { Campaign } from '../types/campaign.types';
import { getCampaigns, getCampaignsPage, GetCampaignsParams } from '../api/campaignApi';
import { PageResponse } from '@/shared/api/types/common.types';

/**
 * 체험 목록을 가져오는 React Query 훅
 */
export const useCampaigns = (params?: GetCampaignsParams) => {
  return useQuery<Campaign[]>({
    queryKey: ['campaigns', params],
    queryFn: () => getCampaigns(params),
  });
};

export const useInfiniteCampaigns = (
  params?: Omit<GetCampaignsParams, 'page'>,
): UseInfiniteQueryResult<InfiniteData<PageResponse<Campaign>>, Error> => {
  return useInfiniteQuery<PageResponse<Campaign>, Error>({
    queryKey: ['campaigns', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const currentParams = { ...params, page: pageParam as number };
      return getCampaignsPage(currentParams);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });
};

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
