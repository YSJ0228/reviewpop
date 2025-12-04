import { apiClient } from '@/shared/api/client';
import { ApiResponse, unwrapApiResponse, PageResponse } from '@/shared/api/types/common.types';
import { Campaign, CampaignDetail } from '../types/campaign.types';

// 캠페인 목록 조회 파라미터
export interface GetCampaignsParams {
  page?: number; // 1-based index
  size?: number;
  category?: string;
  status?: string;
  location?: string;
}

// 캠페인 목록 조회
export const getCampaigns = async (params?: GetCampaignsParams): Promise<Campaign[]> => {
  const response = await apiClient.get<ApiResponse<PageResponse<Campaign>>>('/campaigns', {
    params,
  });
  const data = unwrapApiResponse(response.data);
  return data.content;
};

// 캠페인 목록 조회 (페이지네이션 정보 포함)
export const getCampaignsPage = async (
  params?: GetCampaignsParams,
): Promise<PageResponse<Campaign>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<Campaign>>>('/campaigns', {
    params,
  });
  return unwrapApiResponse(response.data);
};

// 캠페인 상세 조회
export const getCampaign = async (id: string): Promise<CampaignDetail> => {
  const response = await apiClient.get<ApiResponse<CampaignDetail>>(`/campaigns/${id}`);
  return unwrapApiResponse(response.data);
};

/**
 * 체험 상세 정보 조회 TODO: 하나로 통일하기
 */
export async function getCampaignDetails(id: string) {
  const response = await apiClient.get<ApiResponse<CampaignDetail>>(`/campaigns/${id}`);
  return unwrapApiResponse(response.data);
}
