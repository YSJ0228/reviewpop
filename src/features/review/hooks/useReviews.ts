/**
 * useReviews Hook
 *
 * React Query를 사용하여 리뷰 데이터를 관리하는 커스텀 훅입니다.
 *
 * @example
 * ```tsx
 * import { useReviews } from '@features/review/hooks/useReviews';
 *
 * function ReviewList() {
 *   const { data, isLoading, error } = useReviews();
 *
 *   if (isLoading) return <div>로딩 중...</div>;
 *   if (error) return <div>에러 발생</div>;
 *
 *   return (
 *     <div>
 *       {data?.map((review) => (
 *         <ReviewCard key={review.id} review={review} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  CreateReviewRequest,
} from '../api/reviewApi';

/**
 * Query Keys
 *
 * React Query의 캐시 키를 중앙에서 관리합니다.
 */
export const reviewKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...reviewKeys.lists(), filters] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: number) => [...reviewKeys.details(), id] as const,
};

/**
 * 리뷰 목록 조회 훅
 */
export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.lists(),
    queryFn: getReviews,
  });
}

/**
 * 리뷰 상세 조회 훅
 */
export function useReview(id: number) {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => getReviewById(id),
    enabled: !!id, // id가 있을 때만 실행
  });
}

/**
 * 리뷰 작성 훅
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      // 리뷰 목록 캐시 무효화 (자동으로 다시 불러옴)
      queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
    },
  });
}

/**
 * 리뷰 수정 훅
 */
export function useUpdateReview(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateReviewRequest>) => updateReview(id, data),
    onSuccess: () => {
      // 해당 리뷰 상세와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: reviewKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
    },
  });
}

/**
 * 리뷰 삭제 훅
 */
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      // 리뷰 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
    },
  });
}
