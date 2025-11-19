/**
 * Points (포인트) 관련 타입 정의
 */

/**
 * 포인트 거래 유형
 * - earn: 적립
 * - spend: 사용
 * - expire: 만료
 * - refund: 환불
 */
export type PointTransactionType = 'earn' | 'spend' | 'expire' | 'refund';

/**
 * 포인트 적립/차감 사유
 */
export type PointReason =
  | 'campaign_application' // 체험 신청
  | 'review_write' // 리뷰 작성
  | 'review_photo' // 사진 리뷰 작성
  | 'referral' // 친구 추천
  | 'event' // 이벤트 참여
  | 'admin_grant' // 관리자 지급
  | 'campaign_cancel' // 체험 취소 (환불)
  | 'expire' // 기간 만료
  | 'other'; // 기타

/**
 * 포인트 거래 내역
 */
export interface PointTransaction {
  /** 거래 ID */
  id: string;
  /** 사용자 ID */
  userId: string;
  /** 거래 유형 */
  type: PointTransactionType;
  /** 포인트 금액 */
  amount: number;
  /** 거래 사유 */
  reason: PointReason;
  /** 거래 설명 */
  description: string;
  /** 관련 체험 ID (옵션) */
  campaignId?: string;
  /** 관련 리뷰 ID (옵션) */
  reviewId?: string;
  /** 거래 후 잔액 */
  balance: number;
  /** 만료일 (적립 시점의 만료일, ISO 8601) */
  expiresAt?: string;
  /** 거래일 (ISO 8601) */
  transactedAt: string;
  /** 생성일 (ISO 8601) */
  createdAt: string;
}

/**
 * 포인트 요약 정보
 */
export interface PointSummary {
  /** 사용자 ID */
  userId: string;
  /** 총 보유 포인트 */
  totalPoints: number;
  /** 사용 가능한 포인트 */
  availablePoints: number;
  /** 곧 만료될 포인트 (30일 이내) */
  expiringPoints: number;
  /** 마지막 업데이트 시각 (ISO 8601) */
  updatedAt: string;
}

/**
 * 포인트 거래 유형별 레이블
 */
export const POINT_TRANSACTION_TYPE_LABELS: Record<PointTransactionType, string> = {
  earn: '적립',
  spend: '사용',
  expire: '만료',
  refund: '환불',
};

/**
 * 포인트 사유별 레이블
 */
export const POINT_REASON_LABELS: Record<PointReason, string> = {
  campaign_application: '체험 신청',
  review_write: '리뷰 작성',
  review_photo: '사진 리뷰 작성',
  referral: '친구 추천',
  event: '이벤트 참여',
  admin_grant: '관리자 지급',
  campaign_cancel: '체험 취소',
  expire: '포인트 만료',
  other: '기타',
};
