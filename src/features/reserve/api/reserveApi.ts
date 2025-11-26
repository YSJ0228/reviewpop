import { apiClient } from '@shared/api/client';
import { Reservation, CreateReservationRequest } from '@entities/reservation';

// 예약 생성 API
export const createReservation = async (data: CreateReservationRequest) => {
  const response = await apiClient.post(`/campaigns/${data.campaignId}/reservations`, data);
  return response.data;
};

// 예약 조회 API
export const getReservation = async (campaignId: string, userId: string, applicationId: string) => {
  const response = await apiClient.get(`/campaigns/${campaignId}/reservations`, {
    params: {
      userId,
      applicationId,
    },
  });
  return response.data;
};

// 예약 수정 API
export const updateReservation = async (
  campaignId: string,
  userId: string,
  applicationId: string,
  data: Reservation,
) => {
  const response = await apiClient.put(`/campaigns/${campaignId}/reservations`, data, {
    params: {
      userId,
      applicationId,
    },
  });
  return response.data;
};

// 예약 취소 API
export const deleteReservation = async (
  campaignId: string,
  userId: string,
  applicationId: string,
) => {
  const response = await apiClient.delete(`/campaigns/${campaignId}/reservations`, {
    params: {
      userId,
      applicationId,
    },
  });
  return response.data;
};
