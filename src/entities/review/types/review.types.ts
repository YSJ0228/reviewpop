/**
 * Review 관련 타입 정의
 */

import type { User } from '@entities/user/types/user.types';

/**
 * 리뷰 정보
 */
export interface Review {
  /** 리뷰 ID */
  id: number;
  /** 캠페인 ID */
  campaignId: string;
  /** 작성자 ID */
  userId: string;
  /** 작성자 정보 */
  user: Pick<User, 'id' | 'name' | 'email' | 'profileImage'>;
  /** 평점 (1-5) */
  rating: number;
  /** 리뷰 제목 */
  title: string;
  /** 리뷰 내용 */
  content: string;
  /** 리뷰 이미지 URL 배열 */
  images: string[];
  /** 생성일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}

/**
 * 리뷰 작성 요청 데이터
 */
export interface CreateReviewRequest {
  /** 캠페인 ID */
  campaignId: string;
  /** 평점 (1-5) */
  rating: number;
  /** 리뷰 제목 */
  title: string;
  /** 리뷰 내용 */
  content: string;
}

/**
 * 리뷰 필터 쿼리 파라미터
 *
 * @example
 * GET /api/reviews?campaignId=1&rating=5&minRating=4
 */
export interface ReviewFilterParams extends Record<string, unknown> {
  /** 특정 캠페인의 리뷰만 필터링 */
  campaignId?: string;
  /** 특정 사용자의 리뷰만 필터링 */
  userId?: string;
  /** 정확히 N점인 리뷰만 필터링 */
  rating?: number;
  /** N점 이상인 리뷰만 필터링 */
  minRating?: number;
  /** 검색어 (제목, 내용에서 검색) */
  searchQuery?: string;
}
