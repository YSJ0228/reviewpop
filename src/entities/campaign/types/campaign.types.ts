/**
 * 캠페인 엔티티 타입 정의
 *
 * 프로젝트 전체에서 사용하는 표준 Campaign 타입입니다.
 */

/**
 * 캠페인 상태
 * - recruiting: 모집 중
 * - in_progress: 진행 중 (선정 완료, 체험 진행 중)
 * - review_period: 리뷰 작성 기간
 * - completed: 완료
 * - closed: 마감 (모집 실패 등)
 */
export type CampaignStatus =
  | 'recruiting'
  | 'in_progress'
  | 'review_period'
  | 'completed'
  | 'closed';

/**
 * 캠페인 카테고리
 */
export type CampaignCategory =
  | '음료' // food & beverage
  | '뷰티' // beauty & cosmetics
  | '식품' // food
  | '전자제품' // electronics
  | '건강' // health
  | '패션' // fashion
  | '가전' // home appliances
  | '향수' // perfume
  | '액세서리' // accessories
  | '생활용품' // lifestyle
  | '기타'; // other

/**
 * 캠페인 기본 정보
 */
export interface Campaign {
  /** 캠페인 ID */
  id: string;
  /** 캠페인 제목 */
  title: string;
  /** 브랜드명 */
  brand: string;
  /** 캠페인 설명 */
  description: string;
  /** 카테고리 */
  category: CampaignCategory;
  /** 캠페인 상태 */
  status: CampaignStatus;

  // 이미지
  /** 썸네일 이미지 URL */
  imageUrl: string;
  /** 상세 이미지 URL 배열 */
  imageUrls?: string[];

  // 날짜
  /** 캠페인 시작일 (ISO 8601) */
  startDate: string;
  /** 캠페인 종료일 (ISO 8601) */
  endDate: string;
  /** 신청 마감일 (ISO 8601) */
  applicationDeadline: string;
  /** 리뷰 작성 마감일 (ISO 8601) */
  reviewDeadline?: string;

  // 지역 (선택 사항)
  /** 지역 제한 (예: "서울", "전국") */
  location?: string;
  /** 상세 주소 (방문형 캠페인의 경우) */
  address?: string;

  // 모집 정보
  /** 총 모집 인원 */
  maxRecruitment: number;
  /** 현재 신청 인원 */
  currentRecruitment: number;
  /** 선정 인원 */
  selectedCount?: number;

  // 포인트
  /** 지급 포인트 */
  points: number;

  // 생성일
  /** 생성일 (ISO 8601) */
  createdAt: string;
}

/**
 * 캠페인 상세 정보
 * (목록에서는 필요 없지만 상세 페이지에서 필요한 정보)
 */
export interface CampaignDetail extends Campaign {
  /** 리뷰 미션 목록 */
  reviewMission: string[];
  /** 제공 항목 목록 */
  providedItems: string[];
  /** 배송 정보 */
  deliveryInfo?: {
    shippingDate?: string;
    trackingNumber?: string;
  };
  /** 주의 사항 목록 */
  notices?: string[];
  /** 신청 조건 목록 */
  requirements?: string[];
  /** 문의처 */
  contactInfo?: string;
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
 * 사용자 관점의 캠페인 상태
 * (나의 체험 페이지에서 사용)
 */
export type MyCampaignStatus = 'applied' | 'selected' | 'registered' | 'completed' | 'rejected';

/**
 * 나의 캠페인 (나의 체험)
 * Campaign의 간소화된 버전 + 사용자별 신청/참여 상태
 */
export interface MyCampaign {
  /** 캠페인 ID */
  id: string;
  /** 캠페인 제목 */
  title: string;
  /** 브랜드명 */
  brand: string;
  /** 썸네일 이미지 URL */
  imageUrl: string;
  /** 사용자의 신청/참여 상태 */
  status: MyCampaignStatus;
  /** 신청일 (ISO 8601) */
  applicationDate: string;
  /** 신청 마감일 (ISO 8601) */
  deadline?: string;
  /** 카테고리 */
  category?: string;
  /** 지급 포인트 */
  points?: number;
  /** 예약일 (선정된 경우) */
  reservationDate?: string;
  /** 리뷰 제출 여부 */
  reviewSubmitted?: boolean;
}

/**
 * 상태별 레이블 매핑
 */
export const MY_CAMPAIGN_STATUS_LABELS: Record<MyCampaignStatus, string> = {
  applied: '신청',
  selected: '선정',
  registered: '등록',
  completed: '종료',
  rejected: '거절',
};

/**
 * 상태별 설명 매핑
 */
export const MY_CAMPAIGN_STATUS_DESCRIPTIONS: Record<MyCampaignStatus, string> = {
  applied: '신청 대기 중인 캠페인',
  selected: '선정된 캠페인',
  registered: '등록 완료된 캠페인',
  completed: '종료된 캠페인',
  rejected: '거절된 캠페인',
};
