import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { Application } from '../types/application.types';

/**
 * 신청 상세 조회
 */
export async function getApplicationById(id: string) {
  const response = await apiClient.get<ApiResponse<Application>>(`/applications/${id}`);
  return unwrapApiResponse(response.data);
}

interface ApplyCampaignPayload {
  campaignId: string;
  userId: string;
  name: string;
  phoneNumber: string;
  blogAddress: string;
  message?: string;
}

interface ApplyResponseData {
  applicationId: string;
}

export async function applyCampaign(payload: ApplyCampaignPayload): Promise<ApplyResponseData> {
  const { campaignId, ...body } = payload;

  const response = await apiClient.post(`/campaigns/${campaignId}/apply`, body, {
    withCredentials: true,
  });

  return unwrapApiResponse(response.data);
}
