export type MyCampaignStatus = 'applied' | 'selected' | 'registered' | 'completed';

export interface MyCampaign {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  status: MyCampaignStatus;
  applicationDate: string;
  deadline?: string;
  category?: string;
  points?: number;
}

export const TAB_CONFIG = [
  { key: 'applied' as const, label: '신청' },
  { key: 'selected' as const, label: '선정' },
  { key: 'registered' as const, label: '등록' },
  { key: 'completed' as const, label: '종료' },
] as const;

export type TabKey = (typeof TAB_CONFIG)[number]['key'];

// 접근성을 위한 레이블 헬퍼
export const STATUS_LABELS: Record<MyCampaignStatus, string> = {
  applied: '신청',
  selected: '선정',
  registered: '등록',
  completed: '종료',
};

export const STATUS_DESCRIPTIONS: Record<MyCampaignStatus, string> = {
  applied: '신청 대기 중인 캠페인',
  selected: '선정된 캠페인',
  registered: '등록 완료된 캠페인',
  completed: '종료된 캠페인',
};

// 캠페인 상세 정보 (Campaign 타입 확장)
export interface MyCampaignDetail extends MyCampaign {
  description: string; // 캠페인 상세 설명
  reviewMission: string[]; // 리뷰 미션 목록
  providedItems: string[]; // 제공 내역
  currentRecruitment: number; // 현재 신청 인원
  maxRecruitment: number; // 최대 모집 인원
  deliveryInfo?: {
    // 배송 정보 (선택 사항)
    shippingDate?: string;
    trackingNumber?: string;
  };
  notices?: string[]; // 주의 사항
  requirements?: string[]; // 신청 조건
}
