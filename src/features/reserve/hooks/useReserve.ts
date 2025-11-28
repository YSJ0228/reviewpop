import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@shared/components';
import { useQueryClient } from '@tanstack/react-query';
import { PostReservation } from '@entities/reservation';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../api/reserveApi';
import { useRouter } from 'next/navigation';

// 예약 생성 hook
export const useReserve = (campaignId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReservation) => createReservation(data),
    onSuccess: () => {
      toast.success('예약이 완료되었습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      const message = error.message || '예약 생성에 실패했습니다.';
      toast.error(message);
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
      toast.success('예약이 완료되었습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
    onError: (error: Error) => {
      const message = error.message || '예약 수정에 실패했습니다.';
      toast.error(message);
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
      toast.success('예약이 취소되었습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservation', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      router.push(`/my?tab=selected`);
    },
    onError: (error: Error) => {
      const message = error.message || '예약 취소에 실패했습니다.';
      toast.error(message);
      console.error('예약 취소 실패:', error);
    },
  });
};
