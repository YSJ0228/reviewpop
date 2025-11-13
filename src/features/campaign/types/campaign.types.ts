export type CampaignStatus = 'applied' | 'selected' | 'registered' | 'completed';

export interface Campaign {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  description: string;
  status: CampaignStatus;
  applicationDate: string;
  deadline?: string;
}

// 캠페인 상세 정보 (Campaign 타입 확장)
export interface CampaignDetail extends Campaign {
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
