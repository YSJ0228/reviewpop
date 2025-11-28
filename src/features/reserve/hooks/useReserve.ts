import { useMutation, useQuery } from '@tanstack/react-query';

import { PostReservation } from '@entities/reservation';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../api/reserveApi';

// 예약 생성 hook
export const useReserve = () => {
  return useMutation({
    mutationFn: (data: PostReservation) => createReservation(data),
  });
};

// 예약 조회 hook
export const useGetReservation = (campaignId: string, applicationId: string) => {
  return useQuery({
    queryKey: ['reservation', campaignId, applicationId],
    queryFn: () => getReservation(campaignId, applicationId),
  });
};

// 예약 수정 hook
export const useUpdateReservation = (campaignId: string, applicationId: string) => {
  return useMutation({
    mutationFn: (data: PostReservation) => updateReservation(campaignId, applicationId, data),
  });
};

// 예약 취소 hook
export const useDeleteReservation = (campaignId: string, applicationId: string) => {
  return useMutation({
    mutationFn: () => deleteReservation(campaignId, applicationId),
  });
};
