import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@shared/components';
import type { PostReview } from '../types/review.types';
import { createReview, updateReview, getReviewById, getReviewEditRequest } from '../api/reviewApi';
import { getCampaign } from '@entities/campaign/api/campaignApi';
import { getUserInfo } from '@entities/user/api/userApi';
import { getApplicationById } from '@entities/application/api/applicationApi';

/**
 * 리뷰 등록 훅
 * @returns 리뷰 등록 mutation 객체
 */
export const useCreateReview = (campaignId: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReview) => {
      return createReview(data);
    },
    onSuccess: async () => {
      toast.success('후기가 등록되었습니다.');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['reviews'] }),
        queryClient.invalidateQueries({ queryKey: ['my-applications'] }),
        queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] }),
      ]);
      onSuccessCallback?.();
    },
    onError: (error: Error) => {
      const message = error.message || '후기 등록에 실패했습니다.';
      toast.error(message);
      console.error('후기 등록 실패:', error);
    },
  });
};

/**
 * 리뷰 재등록 훅
 * @param id - 리뷰 ID
 * @returns 리뷰 재등록 mutation 객체
 */
export const useUpdateReview = (id: string, campaignId: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReview) => updateReview(id, data),
    onSuccess: async () => {
      toast.success('후기가 재등록되었습니다.');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['reviews'] }),
        queryClient.invalidateQueries({ queryKey: ['my-applications'] }),
        queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] }),
      ]);
      onSuccessCallback?.();
    },
    onError: (error: Error) => {
      const message = error.message || '후기 재등록에 실패했습니다.';
      toast.error(message);
      console.error('후기 재등록 실패:', error);
    },
  });
};

/**
 * 리뷰 상세 조회 훅
 * @param id - 리뷰 ID
 * @returns 리뷰 상세 query 객체
 */
export const useGetReviewById = (id: number) => {
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => getReviewById(id),
  });
};

// 예시: useReviewPageData 훅 생성
export function useReviewPageData(campaignId: string, applicationId: string | null) {
  return useQuery({
    queryKey: ['reviewPageData', campaignId, applicationId],
    queryFn: async () => {
      const [campaign, user, application] = await Promise.all([
        getCampaign(campaignId),
        getUserInfo(),
        applicationId ? getApplicationById(applicationId) : null,
      ]);
      return { campaign, user, application };
    },
    enabled: !!campaignId,
  });
}

/**
 * 리뷰 수정 요청 조회 훅
 * @param reviewId - 리뷰 ID
 * @param enabled - 쿼리 활성화 여부
 * @returns 리뷰 수정 요청 조회 query 객체
 */
export function useReviewEditRequest(reviewId: string, enabled = true) {
  return useQuery({
    queryKey: ['review', 'edit', reviewId],
    queryFn: () => getReviewEditRequest(reviewId),
    enabled: enabled && !!reviewId,
  });
}
