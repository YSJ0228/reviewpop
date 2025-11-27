/**
 * Review API
 *
 * 리뷰 관련 API 호출 함수들을 정의합니다.
 */

import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { Review, CreateReviewRequest } from '@entities/review/types/review.types';

export type { Review, CreateReviewRequest };

/**
 * 리뷰 목록 조회
 */
export async function getReviews() {
  const response = await apiClient.get<ApiResponse<Review[]>>('/reviews');
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 상세 조회
 */
export async function getReviewById(id: number) {
  const response = await apiClient.get<ApiResponse<Review>>(`/reviews/${id}`);
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 작성
 */
export async function createReview(data: CreateReviewRequest) {
  const response = await apiClient.post<ApiResponse<Review>>('/reviews', data);
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 수정
 */
export async function updateReview(id: number, data: Partial<CreateReviewRequest>) {
  const response = await apiClient.patch<ApiResponse<Review>>(`/reviews/${id}`, data);
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 삭제
 */
export async function deleteReview(id: number) {
  const response = await apiClient.delete<ApiResponse<void>>(`/reviews/${id}`);
  return unwrapApiResponse(response.data);
}
