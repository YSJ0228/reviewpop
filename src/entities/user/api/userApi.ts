import { apiClient } from '@shared/api/client';

import { User, UserCampaigns } from '../types/user.types';

interface UserCampaignResponse {
  data: UserCampaigns;
  success: boolean;
}

export async function getUserProfile() {
  const response = await apiClient.get<UserCampaignResponse>('/auth/profile', {
    withCredentials: true,
  });
  return response.data.data;
}

interface UserResponse {
  data: User;
  success: boolean;
}

export async function getUserInfo() {
  const response = await apiClient.get<UserResponse>('/auth/me', {
    withCredentials: true,
  });
  return response.data.data;
}

export interface UpdateUserPayload {
  name?: string;
  phoneNumber?: string;
  blogAddress?: string;
}

export async function updateUserInfo(payload: UpdateUserPayload) {
  const response = await apiClient.patch<UserResponse>('/auth/me', payload, {
    withCredentials: true,
  });

  return response.data.data;
}
