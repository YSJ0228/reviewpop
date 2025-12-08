/**
 * Review API
 *
 * 리뷰 관련 API 호출 함수들을 정의합니다.
 */

import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { apiClient } from '@shared/api/client';

import {
  PostReview,
  BlogReviews,
  BlogReview,
  ReviewRequest,
} from '@entities/review/types/review.types';

/**
 * 리뷰 목록 조회
 */
export async function getReviews(params: { campaignId?: string; page?: number; size?: number }) {
  const response = await apiClient.get<ApiResponse<BlogReviews>>('/reviews', { params });
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 상세 조회
 */
export async function getReviewById(id: number) {
  const response = await apiClient.get<ApiResponse<BlogReview>>(`/reviews/${id}`, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 작성
 */
export async function createReview(data: PostReview) {
  const response = await apiClient.post<ApiResponse<PostReview>>('/reviews', data, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
}
/**
 * 리뷰 수정
 */
export async function updateReview(id: string, data: Partial<PostReview>) {
  const response = await apiClient.patch<ApiResponse<PostReview>>(`/reviews/${id}`, data, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
}

/**
 * 리뷰 수정 요청 조회
 * @param reviewId
 * @returns
 */
export async function getReviewModificationRequest(reviewId: string) {
  const response = await apiClient.get<ApiResponse<ReviewRequest>>(
    `/reviews/${reviewId}/edit-request`,
    {
      withCredentials: true,
    },
  );
  return unwrapApiResponse(response.data);
}
