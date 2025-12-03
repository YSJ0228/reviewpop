import { apiClient } from '@shared/api/client';

import { User, UserCampaigns } from '../types/user.types';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';

export async function getUserProfile() {
  const response = await apiClient.get<ApiResponse<UserCampaigns>>('/auth/profile', {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
}

export interface UpdateUserPayload {
  name?: string;
  phoneNumber?: string;
  blogAddress?: string;
}

export async function updateUserInfo(payload: UpdateUserPayload) {
  const response = await apiClient.patch<ApiResponse<User>>('/auth/me', payload, {
    withCredentials: true,
  });

  return unwrapApiResponse(response.data);
}

/**
 * 유저 정보 조회
 */
export async function getUserInfo() {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');
  return unwrapApiResponse(response.data);
}
