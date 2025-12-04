import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PostReservation,
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '@entities/reservation';

// 예약 생성 hook
export const useCreateReservation = (campaignId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReservation) => createReservation(data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['my-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      console.error('예약 생성 실패:', error);
    },
  });
};

// 예약 조회 hook
export const useGetReservation = (reservationId: string) => {
  return useQuery({
    queryKey: ['reservation', reservationId],
    queryFn: () => getReservation(reservationId),
  });
};

// 예약 수정 hook
export const useUpdateReservation = (campaignId: string, reservationId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReservation) => updateReservation(reservationId, data),
    onSuccess: () => {
      // 관련 쿼리 무효화'
      queryClient.invalidateQueries({ queryKey: ['my-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['reservation', reservationId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      console.error('예약 수정 실패:', error);
    },
  });
};

// 예약 취소 hook
export const useDeleteReservation = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteReservation(reservationId),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['my-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['reservation', reservationId] });
    },
    onError: (error: Error) => {
      console.error('예약 취소 실패:', error);
    },
  });
};
