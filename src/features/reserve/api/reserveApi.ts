import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';

import { Reservation, CreateReservationRequest } from '@entities/reservation';

// 예약 생성 API
export const createReservation = async (data: CreateReservationRequest) => {
  const response = await apiClient.post<ApiResponse<Reservation>>(
    `/campaigns/${data.campaignId}/reservations`,
    data,
  );
  return unwrapApiResponse(response.data);
};

// 예약 조회 API
export const getReservation = async (campaignId: string, userId: string, applicationId: string) => {
  const response = await apiClient.get<ApiResponse<Reservation>>(
    `/campaigns/${campaignId}/reservations`,
    {
      params: {
        userId,
        applicationId,
      },
    },
  );
  return unwrapApiResponse(response.data);
};

// 예약 수정 API
export const updateReservation = async (
  campaignId: string,
  userId: string,
  applicationId: string,
  data: Reservation,
) => {
  const response = await apiClient.put<ApiResponse<Reservation>>(
    `/campaigns/${campaignId}/reservations`,
    data,
    {
      params: {
        userId,
        applicationId,
      },
    },
  );
  return unwrapApiResponse(response.data);
};

// 예약 취소 API
export const deleteReservation = async (
  campaignId: string,
  userId: string,
  applicationId: string,
) => {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/campaigns/${campaignId}/reservations`,
    {
      params: {
        userId,
        applicationId,
      },
    },
  );
  return unwrapApiResponse(response.data);
};
