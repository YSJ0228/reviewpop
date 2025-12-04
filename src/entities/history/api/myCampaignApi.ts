import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { IMyCampaignList } from '../types/myCampaign.types';

/**
 * 내 체험 목록 조회
 */
export const getMyCampaigns = async () => {
  const response = await apiClient.get<ApiResponse<IMyCampaignList>>('/my-campaigns', {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};

/**
 * 특정 체험 신청 삭제
 * @param campaignId string
 * @returns 성공시 void
 */
export const deleteMyCampaign = async (campaignId: string) => {
  const response = await apiClient.delete<ApiResponse<void>>(`/campaigns/${campaignId}`, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};
