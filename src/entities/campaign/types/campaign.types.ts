/**
 * 캠페인 엔티티 타입 정의
 *
 * TODO: 백엔드 API 스펙 확정 후 타입 추가/수정
 */

/**
 * 캠페인 상태
 */
export type CampaignStatus = 'recruiting' | 'in_progress' | 'completed' | 'closed';

/**
 * 캠페인 카테고리
 * TODO: 실제 카테고리 목록으로 수정
 */
export type CampaignCategory = 'food' | 'beauty' | 'lifestyle' | 'tech' | 'other';

/**
 * 캠페인 기본 정보
 */
export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: CampaignCategory;
  status: CampaignStatus;

  // 이미지
  thumbnailUrl: string;
  imageUrls: string[];

  // 날짜
  startDate: string; // ISO 8601 format
  endDate: string;
  applicationDeadline: string; // 신청 마감일

  // 지역
  location: string;
  address: string;

  // 모집 정보
  totalSlots: number; // 총 모집 인원
  appliedCount: number; // 신청 인원
  selectedCount: number; // 선정 인원

  // 리뷰 정보
  reviewRequired: boolean; // 리뷰 작성 필수 여부
  reviewDeadline?: string; // 리뷰 작성 마감일

  // TODO: 추가 필드 정의
  // - 제공 혜택
  // - 신청 조건
  // - 안내사항
  // etc.
}

/**
 * 캠페인 상세 정보
 * (목록에서는 필요 없지만 상세 페이지에서 필요한 정보)
 */
export interface CampaignDetail extends Campaign {
  benefits: string[]; // 제공 혜택
  requirements: string[]; // 신청 조건
  guidelines: string[]; // 안내사항
  contactInfo?: string; // 문의처

  // TODO: 추가 상세 정보
}

/**
 * 캠페인 필터
 */
export interface CampaignFilters {
  category?: CampaignCategory;
  status?: CampaignStatus;
  location?: string;
  sortBy?: 'latest' | 'deadline' | 'popular';
  page?: number;
  limit?: number;
}

/**
 * 캠페인 신청 데이터
 */
export interface CampaignApplyData {
  campaignId: string;
  message?: string; // 신청 메시지
  // TODO: 추가 신청 필드
  // - SNS 계정
  // - 신청 동기
  // etc.
}

/**
 * 나의 캠페인 (나의 체험)
 */
export interface MyCampaign extends Campaign {
  applicationDate: string; // 신청일
  applicationStatus: 'pending' | 'selected' | 'rejected'; // 신청 상태
  reservationDate?: string; // 예약일 (선정된 경우)
  reviewSubmitted?: boolean; // 리뷰 제출 여부
}
