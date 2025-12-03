import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@shared/components';
import {
  PostReview,
  createReview,
  updateReview,
  getReviews,
  getReviewById,
} from '../api/reviewApi';

/**
 * 리뷰 등록 훅
 * @param campaignId - 캠페인 ID
 * @param userId - 사용자 ID
 * @returns 리뷰 등록 mutation 객체
 */
export const useCreateReview = (campaignId: string | null, userId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReview) => {
      if (!campaignId || !userId) {
        throw new Error('필수 정보가 없습니다.');
      }
      return createReview(campaignId, userId, data);
    },
    onSuccess: () => {
      toast.success('후기가 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
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
export const useUpdateReview = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReview) => updateReview(id, data),
    onSuccess: () => {
      toast.success('후기가 재등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: Error) => {
      const message = error.message || '후기 재등록에 실패했습니다.';
      toast.error(message);
      console.error('후기 재등록 실패:', error);
    },
  });
};

/**
 * 리뷰 목록 조회 훅
 * @returns 리뷰 목록 query 객체
 */
export const useGetReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews(),
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
