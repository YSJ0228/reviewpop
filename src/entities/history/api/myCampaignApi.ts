import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { Application } from '@entities/application';

/**
 * 내 체험 목록 조회
 */
export const getMyCampaigns = async () => {
  const response = await apiClient.get<ApiResponse<Application[]>>('/my-campaigns');
  return unwrapApiResponse(response.data);
};

/**
 * 내 체험 목록 조회 (상태별)
 * @param status - 체험 상태
 * @returns
 */
export const getMyCampaignsByStatus = async (status: string) => {
  const response = await apiClient.get<ApiResponse<Application[]>>(
    `/my-campaigns?status=${status}`,
  );
  return unwrapApiResponse(response.data);
};

export const deleteMyCampaign = async (applicationId: string) => {
  const response = await apiClient.delete<ApiResponse<Application>>(
    `/my-campaigns/${applicationId}`,
  );
  return unwrapApiResponse(response.data);
};
