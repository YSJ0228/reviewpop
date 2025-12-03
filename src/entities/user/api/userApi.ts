import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { User } from '../types/user.types';

/**
 * 유저 정보 조회
 */
export async function getUserInfo() {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');
  return unwrapApiResponse(response.data);
}
