import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';

import { Reservation, PostReservation } from '@entities/reservation';

// 예약 생성 API
export const createReservation = async (data: PostReservation) => {
  const response = await apiClient.post<ApiResponse<Reservation>>(
    `/campaigns/${data.campaignId}/reservations`,
    data,
  );
  return unwrapApiResponse(response.data);
};

// 예약 조회 API
export const getReservation = async (campaignId: string, applicationId: string) => {
  const response = await apiClient.get<ApiResponse<Reservation>>(
    `/campaigns/${campaignId}/reservations/${applicationId}`,
  );
  return unwrapApiResponse(response.data);
};

// 예약 수정 API
export const updateReservation = async (
  campaignId: string,
  applicationId: string,
  data: PostReservation,
) => {
  const response = await apiClient.put<ApiResponse<Reservation>>(
    `/campaigns/${campaignId}/reservations/${applicationId}`,
    data,
  );
  return unwrapApiResponse(response.data);
};

// 예약 취소 API
export const deleteReservation = async (campaignId: string, applicationId: string) => {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/campaigns/${campaignId}/reservations/${applicationId}`,
  );
  return unwrapApiResponse(response.data);
};
