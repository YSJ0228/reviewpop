/**
 * Application (체험 신청) 엔티티 타입 정의
 */

/**
 * 신청 상태
 * - pending: 대기 중 (선정 결과 발표 전)
 * - selected: 선정됨
 * - rejected: 거절됨
 * - cancelled: 사용자가 취소함
 */
export type ApplicationStatus = 'pending' | 'selected' | 'rejected' | 'cancelled';

/**
 * 체험 신청 정보
 */
export interface Application {
  /** 신청 ID */
  id: string;
  /** 사용자 ID */
  userId: string;
  /** 체험 ID */
  campaignId: string;
  /** 신청 상태 */
  status: ApplicationStatus;
  /** 신청 메시지 */
  message?: string;
  /** SNS 계정 (옵션) */
  snsAccount?: string;
  /** 신청 동기 (옵션) */
  motivation?: string;
  /** 신청일 (ISO 8601) */
  appliedAt: string;
  /** 선정/거절일 (ISO 8601) */
  decidedAt?: string;
  /** 취소일 (ISO 8601) */
  cancelledAt?: string;
  /** 생성일 (ISO 8601) */
  createdAt: string;
  /** 수정일 (ISO 8601) */
  updatedAt: string;
}

/**
 * 신청 생성 요청 데이터
 */
export interface CreateApplicationRequest {
  /** 체험 ID */
  campaignId: string;
  /** 신청 메시지 */
  message?: string;
  /** SNS 계정 */
  snsAccount?: string;
  /** 신청 동기 */
  motivation?: string;
}

/**
 * 신청 상태별 레이블
 */
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: '대기 중',
  selected: '선정됨',
  rejected: '거절됨',
  cancelled: '취소됨',
};

/**
 * 신청 상태별 설명
 */
export const APPLICATION_STATUS_DESCRIPTIONS: Record<ApplicationStatus, string> = {
  pending: '선정 결과를 기다리고 있습니다',
  selected: '축하합니다! 체험단으로 선정되었습니다',
  rejected: '아쉽게도 이번에는 선정되지 못했습니다',
  cancelled: '신청이 취소되었습니다',
};
