/**
 * Review 관련 타입 정의
 */

/**
 * 후기 생성
 */
export interface CreateReview {
  /** 체험 ID */
  campaignId: string;
  /** 작성자 ID */
  userId: string;
  /** 블로그 링크 */
  reviewUrl: string;
}

/**
 * 블로그 리뷰 데이터
 */

export interface BlogReviews {
  reviews: BlogReview[];
  pageSize: number;
  hasNext: boolean;
}

export interface BlogReview {
  id: string;
  /** 체험 ID */
  campaignId: string;
  /** 썸네일 이미지 URL */
  thumbnail: string;
  /** 리뷰 제목 */
  title: string;
  /** 리뷰 본문 요약 */
  article: string;
  /** 블로그 글 링크 */
  url: string;
  /** 작성일 */
  date: string;
}

export interface ReviewRequest {
  images?: string[];
  content: string;
  precaution: string[];
}

/**
 * 리뷰 데이터
 */
export interface Review {
  id: number;
  campaignId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  rating: number;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  campaignId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
}
