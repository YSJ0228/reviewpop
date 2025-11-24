import { apiClient } from '@shared/api/client';
import { Reservation } from '@entities/reservation';

// 예약 생성 API
export const createReservation = async (campaignId: string, data: Reservation) => {
  const response = await apiClient.post(`/campaigns/${campaignId}/reservations`, data);
  return response.data;
};
