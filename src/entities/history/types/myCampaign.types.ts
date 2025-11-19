export type MyCampaignStatus = 'applied' | 'selected' | 'registered' | 'completed' | 'rejected'; // 신청, 선정, 후기, 종료, 미선정

export type MyCampaignVisitStatus = 'before' | 'scheduled' | 'visited'; // 방문 전, 방문 예정, 방문 완료

export type MyCampaignReviewStatus =
  | 'notReviewed' // 후기 미등록
  | 'reviewed' // 후기 등록 완료
  | 'reviewPending' // 후기 검토 중
  | 'requiredForEditing'; // 후기 수정 요청

export interface MyCampaign {
  id: string;
  brand: string;
  title?: string; // 추후 지우기
  imageUrl: string;
  status: MyCampaignStatus;
  applicationDate?: string;
  announcement?: string;
  providedItems?: string[];
  deadline?: string; // 추후 지우기?
  category?: string; // 추후 지우기
  points?: number; /// 추후 지우기
  recruitmentSchedule?: [string, string];
  maxRecruitment?: number; // 선정하는 인원
  appliedAt?: [string, string];
  visitStatus?: MyCampaignVisitStatus;
  reviewStatus?: MyCampaignReviewStatus;
}

export const TAB_CONFIG = [
  { key: 'applied' as const, label: '신청' },
  { key: 'selected' as const, label: '선정' },
  { key: 'registered' as const, label: '후기' },
  { key: 'completed' as const, label: '종료' },
] as const;

export type TabKey = (typeof TAB_CONFIG)[number]['key'];

// 접근성을 위한 레이블 헬퍼
export const STATUS_LABELS: Record<MyCampaignStatus, string> = {
  applied: '신청',
  selected: '선정',
  registered: '후기',
  completed: '종료',
  rejected: '미선정',
};

export const STATUS_DESCRIPTIONS: Record<MyCampaignStatus, string> = {
  applied: '신청 대기 중인 캠페인',
  selected: '선정된 캠페인',
  registered: '등록 완료된 캠페인',
  completed: '종료된 캠페인',
  rejected: '미선정된 캠페인',
};

export const STATUS_VISIT: Record<MyCampaignVisitStatus, string> = {
  before: '방문 전',
  scheduled: '방문 예정',
  visited: '방문 완료',
};

export const STATUS_REVIEW: Record<MyCampaignReviewStatus, string> = {
  notReviewed: '후기 미등록',
  reviewed: '체험 종료',
  reviewPending: '후기 등록 완료',
  requiredForEditing: '후기 등록 완료',
};

export const STATUS_REVIEW_TITLES: Record<MyCampaignReviewStatus, string> = {
  notReviewed: '체험 후기를 남겨주세요',
  reviewed: '후기 등록이 완료됐어요',
  reviewPending: '작성한 후기를 검토중이에요',
  requiredForEditing: '후기 수정 요청이 있어요',
};

// 체험 상세 정보 (Campaign 타입 확장)
export interface MyCampaignDetail extends MyCampaign {
  description: string; // 체험 상세 설명
  reviewMission: string[]; // 리뷰 미션 목록
  providedItems: string[]; // 제공 내역 -> 지우기
  maxRecruitment: number; // 최대 모집 인원
  currentRecruitment: number; // 현재 신청 인원
  deliveryInfo?: {
    // 배송 정보 (선택 사항)
    shippingDate?: string;
    trackingNumber?: string;
  };
  experiencePrecautions?: string[]; //주의 사항
  requirements?: string[]; // 신청 조건
}

export interface MyCampaignDetailInprovement extends MyCampaignDetail {
  description: string; // 캠페인 상세 설명
  deadline: string; // 예약 마감 날짜
  currentRecruitment: number; // 선정된? 신청한? 인원
}

export interface MyCampaignReservationInfo extends MyCampaign {
  location: string; // 방문 장소
  reservationDate: string; // 예약 날짜
  reservationTime: string; // 예약 시간
  visitors: number; // 방문 인원
  bookerInfo: {
    name: string; // 예약자 이름
    contact: string; // 예약자 연락처
  };
}

export interface MyCampaignReservationCheck extends MyCampaignReservationInfo {
  precautions: string[]; // 예약 유의 사항
}

export interface MyCampaignReviewInfo extends MyCampaign {
  description: string; // 캠페인 상세 설명
  reviewMission: string[]; // 리뷰 미션 목록
}

export interface MyCampaignReviewModification extends MyCampaign {
  modifyimageUrl?: string; // 수정 관련 이미지
  modificationRequests: string[]; // 후기 수정 사유 목록
  precautions: string[]; // 후기 작성 유의 사항
}
