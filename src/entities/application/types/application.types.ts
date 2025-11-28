/**
 * Application (체험 신청) 엔티티 타입 정의
 */

import { CampaignDetail } from '@features/campaign';

/**
 * 신청 상태
 * - pending: 대기 중 (선정 결과 발표 전)
 * - selected: 선정됨
 * - rejected: 거절됨
 * - reviewed: 후기 작성 상태 (방문 완료 후 후기 작성 대기 ~ 후기 수정 요청까지)
 * - completed: 체험 완료(후기 승인 완료)
 * - cancelled: 체험이 사라짐
 */
export type ApplicationStatus =
  | 'pending'
  | 'selected'
  | 'rejected'
  | 'reviewed'
  | 'completed'
  | 'cancelled';

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
 * 체험 신청 데이터 조회
 */

export interface Application {
  id: string;
  userId: string;
  campaign: CampaignDetail;

  name: string;
  blogAddress: string;
  phoneNumber: string;

  status: ApplicationStatus;
  reviewStatus: ReviewStatus;
  isReservated: boolean;

  createdAt: string;
  reservationDate?: string;
}

/**
 * 체험 신청 데이터 생성
 */
export interface PostApplication {
  campaignId: string;

  name: string;
  blogAddress: string;
  phoneNumber: string;

  message?: string;
}
