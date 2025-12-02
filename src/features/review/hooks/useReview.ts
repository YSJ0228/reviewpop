import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@shared/components';
import {
  PostReview,
  createReview,
  updateReview,
  getReviews,
  getReviewById,
} from '../api/reviewApi';

// 리뷰 등록 hook
export const useCreateReview = (campaignId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostReview) => createReview(campaignId, userId, data),
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

// 리뷰 재등록 hook
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

export const useGetReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews(),
  });
};

export const useGetReviewById = (id: number) => {
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => getReviewById(id),
  });
};
