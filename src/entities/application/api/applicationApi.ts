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
