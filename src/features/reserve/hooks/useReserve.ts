import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostReservation } from '@entities/reservation';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../api/reserveApi';

// 예약 생성 hook
export const useReserve = (campaignId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReservation) => createReservation(data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      console.error('예약 생성 실패:', error);
    },
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
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReservation) => updateReservation(campaignId, applicationId, data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      console.error('예약 수정 실패:', error);
    },
  });
};

// 예약 취소 hook
export const useDeleteReservation = (campaignId: string, applicationId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteReservation(campaignId, applicationId),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/my?tab=selected`);
    },
    onError: (error: Error) => {
      console.error('예약 취소 실패:', error);
    },
  });
};
