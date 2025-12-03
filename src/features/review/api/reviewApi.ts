/**
 * Review API
 *
 * 리뷰 관련 API 호출 함수들을 정의합니다.
 */

import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { PostReview, BlogReviews, BlogReview } from '@entities/review/types/review.types';

export type { PostReview };

/**
 * 리뷰 목록 조회
 */
export async function getReviews() {
  const response = await apiClient.get<ApiResponse<BlogReviews>>('/reviews');
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 상세 조회
 */
export async function getReviewById(id: number) {
  const response = await apiClient.get<ApiResponse<BlogReview>>(`/reviews/${id}`);
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 작성
 */
export async function createReview(data: PostReview) {
  const response = await apiClient.post<ApiResponse<PostReview>>('/reviews', data);
  return unwrapApiResponse(response.data);
}
/**
 * 리뷰 수정
 */
export async function updateReview(id: string, data: Partial<PostReview>) {
  const response = await apiClient.patch<ApiResponse<PostReview>>(`/reviews/${id}`, data);
  return unwrapApiResponse(response.data);
}
