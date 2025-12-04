import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';

import { Reservation, PostReservation } from '@entities/reservation';

// 예약 생성 API
export const createReservation = async (data: PostReservation) => {
  const response = await apiClient.post<ApiResponse<Reservation>>(`/reservations`, data, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};

// 예약 조회 API
export const getReservation = async (reservationId: string) => {
  const response = await apiClient.get<ApiResponse<Reservation>>(`/reservations/${reservationId}`, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};

// 예약 수정 API
export const updateReservation = async (reservationId: string, data: PostReservation) => {
  const response = await apiClient.patch<ApiResponse<Reservation>>(
    `/reservations/${reservationId}`,
    data,
    {
      withCredentials: true,
    },
  );
  return unwrapApiResponse(response.data);
};

// 예약 취소 API
export const deleteReservation = async (reservationId: string) => {
  const response = await apiClient.delete<ApiResponse<void>>(`/reservations/${reservationId}`, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};
