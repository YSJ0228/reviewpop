import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { CampaignDetail } from '../types/campaign.types';

/**
 * 체험 상세 정보 조회
 */
export async function getCampaignDetails(id: string) {
  const response = await apiClient.get<ApiResponse<CampaignDetail>>(`/campaigns/${id}`);
  return unwrapApiResponse(response.data);
}
