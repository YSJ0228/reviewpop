import { DateRange } from '@shared/types/date.types';

/**
 * 체험 엔티티 타입 정의
 *
 * 프로젝트 전체에서 사용하는 표준 Campaign 타입입니다.
 */

/**
 * 체험 상태
 * - before_recruiting: 모집 전
 * - recruiting: 모집 중
 * - in_progress: 진행 중 (선정 완료, 체험 진행 중)
 * - review_period: 리뷰 작성 기간
 * - completed: 완료
 * - closed: 마감 (모집 실패 등)
 */
export const CAMPAIGN_STATUSES = [
  'beforeRecruiting',
  'recruiting',
  'inProgress',
  'completed',
  'closed',
] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  beforeRecruiting: '모집 전',
  recruiting: '모집 중',
  inProgress: '진행 중',
  completed: '완료',
  closed: '마감',
};

export type CampaignTabKey = Extract<
  CampaignStatus,
  'recruiting' | 'beforeRecruiting' | 'completed'
>;

export const CampaignTabs: Record<CampaignTabKey, string> = {
  recruiting: '지금 모집중인 체험',
  beforeRecruiting: '공개 예정',
  completed: '지난 체험',
};

/**
 * 체험 카테고리
 */
export const CAMPAIGN_CATEGORIES = [
  '음료', // beverage
  '뷰티', // beauty & cosmetics
  '식품', // food
  '전자제품', // electronics
  '건강', // health
  '패션', // fashion
  '가전', // home appliances
  '향수', // perfume
  '액세서리', // accessories
  '생활용품', // lifestyle
  '기타', // other
] as const;

export type CampaignCategory = (typeof CAMPAIGN_CATEGORIES)[number];
export interface CampaignSchedule {
  application: DateRange;
  winnerAnnouncement: DateRange;
  review: DateRange;
}

/**
 * 지역명
 * 시/도, 시/군/구
 */
interface Location {
  sido: string;
  sigungu: string;
}

/**
 * 체험 기본 정보
 */
export interface Campaign {
  id: string;
  title: string;
  brand: string;

  // 이미지
  /** 썸네일 이미지 URL */
  thumbnail: string;
  /** 상세 이미지 URL 배열 */
  detailImages?: string[];
  /** 체험 설명 */
  description: string;
  /** 체험 상태 */
  status: CampaignStatus;
  /** 카테고리 */
  category: CampaignCategory;

  // 진행 일정
  schedule: CampaignSchedule;

  // 지역
  /** 지역 제한, {시} {구} (예: "서울 강남구") */
  location: Location;
  /** 상세 주소 */
  address: string;

  // 모집 정보
  /** 총 모집 인원 */
  maxRecruitment: number;
  /** 현재 신청 인원 */
  currentRecruitment: number;
  /** 선정 인원 */
  selectedCount?: number;

  /** 제공 상품 */
  providedItem: string;

  reservationPrecaution: string[]; // 예약 페이지, 예약 시 유의사항 (ex. 후기 작성안하면 다 물어내야합니다)
}

/** 09:00 등 */
type TimeString = string;
type DailyHours = { start: TimeString; end: TimeString } | 'closed';

/**
 * 체험 상세 정보
 * (목록에서는 필요 없지만 상세 페이지에서 필요한 정보)
 */

//TODO: 디자인 변경 - 각 요일별로 시간출력
export interface VisitReservation {
  /** 영업시간 [일, 월, 화, 수, 목, 금, 토]*/
  businessHours: [
    DailyHours,
    DailyHours,
    DailyHours,
    DailyHours,
    DailyHours,
    DailyHours,
    DailyHours,
  ];
  /** 예약 유무 */
  // TODO: boolean? string?
  isReservationRequired: boolean;
  /** 예약 방법 */
  reservationMethod?: string;

  visitReservationNotice?: string;
}

export interface CampaignDetail extends Campaign {
  // 체험 정보
  /** 체험 상품의 예상 가치 (원 단위) */
  estimatedValue?: number;
  /** 키워드/태그 목록 */
  keywords: string[];

  visitReservation?: VisitReservation;

  /** 리뷰 미션 목록 */
  reviewMission: string[];
  /** 주의 사항 */
  reviewMissionNotice?: string;
  /** 당첨 조건 목록 */
  requirements?: string[];
  /** 체험 시 주의사항 */
  precautions?: string[];
}
