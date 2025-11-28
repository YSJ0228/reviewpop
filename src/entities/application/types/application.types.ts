/**
 * Application (체험 신청) 엔티티 타입 정의
 */

import { Campaign, CampaignDetail } from '@features/campaign';

/**
 * 신청 상태
 * - pending: 대기 중 (선정 결과 발표 전)
 * - selected: 선정됨
 * - rejected: 거절됨
 * - completed: 체험 완료
 * - cancelled: 체험이 사라짐
 */
export type ApplicationStatus = 'pending' | 'selected' | 'rejected' | 'completed' | 'cancelled';

/**
 * 리뷰 상태
 * before  후기 작성 전
 * pending  후기 검토 중
 * requested  수정 요청
 */
export type ReviewStatus =
  | 'before' // 후기 작성 전
  | 'pending' // 후기 검토 중
  | 'requested'; // 수정 요청

/**
 * 체험 신청 데이터
 */

export interface Application {
  campaign: CampaignDetail;

  name: string;
  blogAddress: string;
  phoneNumber: string;

  status: ApplicationStatus;
  reviewStatus: ReviewStatus;
  isReservated: boolean;

  createdAt: string;
}

export interface PostApplication {
  campaignId: string;

  name: string;
  blogAddress: string;
  phoneNumber: string;

  message?: string;
}
