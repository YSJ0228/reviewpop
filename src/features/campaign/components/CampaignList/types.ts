import { InfiniteData } from '@tanstack/react-query';
import { PageResponse } from '@/shared/api/types/common.types';
import type { Campaign } from '@entities/campaign/types/campaign.types';

export interface InfiniteCampaignListProps {
  data: InfiniteData<PageResponse<Campaign>> | undefined;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export interface CampaignListProps {
  data: Campaign[] | undefined;
}
