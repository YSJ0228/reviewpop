/**
 * Application (체험 신청) 엔티티 타입 정의
 */

import { CampaignDetail } from '@entities/campaign/types/campaign.types';

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
 * - visited: 체험 완료 (방문 예약 날짜 익일에 자동 변경)
 * - notReviewed: 방문 완료 (후기 작성 전)
 * - reviewPending: 후기 검토 (후기 등록 완료, 검토 중)
 * - requiredForEditing: 후기 수정 요청
 * - reviewed: 체험 종료 (후기 등록 완료, 종료 탭에서 사용)
 */
export type ReviewStatus =
  | 'visited' // 체험 완료
  | 'notReviewed' // 방문 완료
  | 'reviewPending' // 후기 검토
  | 'requiredForEditing' // 후기 수정 요청
  | 'reviewed'; // 체험 종료 (종료 탭)

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
  reviewStatus?: ReviewStatus; // 옵셔널로 변경 (현재 후기/종료 외에도 목데이터로 들어가있어서 오류남.)
  isReservated: boolean;

  createdAt: string;
  reservationDate?: string;
  reservationId?: string;
  reviewId?: string;
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
