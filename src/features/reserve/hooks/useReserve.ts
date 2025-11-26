import { useMutation, useQuery } from '@tanstack/react-query';

import { Reservation, CreateReservationRequest } from '@entities/reservation';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../api/reserveApi';

// 예약 생성 hook
export const useReserve = () => {
  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
  });
};

// 예약 조회 hook
export const useGetReservation = (campaignId: string, userId: string, applicationId: string) => {
  return useQuery({
    queryKey: ['reservation', campaignId, userId, applicationId],
    queryFn: () => getReservation(campaignId, userId, applicationId),
  });
};

// 예약 수정 hook
export const useUpdateReservation = (campaignId: string, userId: string, applicationId: string) => {
  return useMutation({
    mutationFn: (data: Reservation) => updateReservation(campaignId, userId, applicationId, data),
  });
};

// 예약 취소 hook
export const useDeleteReservation = (campaignId: string, userId: string, applicationId: string) => {
  return useMutation({
    mutationFn: () => deleteReservation(campaignId, userId, applicationId),
  });
};
