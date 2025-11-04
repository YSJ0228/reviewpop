/**
 * Reservation (예약) 엔티티 타입 정의
 */

/**
 * 예약 상태
 * - pending: 예약 대기 중 (확정 전)
 * - confirmed: 예약 확정
 * - shipped: 배송 시작
 * - delivered: 배송 완료
 * - cancelled: 취소됨
 */
export type ReservationStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

/**
 * 예약 정보
 */
export interface Reservation {
  /** 예약 ID */
  id: string;
  /** 사용자 ID */
  userId: string;
  /** 캠페인 ID */
  campaignId: string;
  /** 신청 ID (선정된 신청과 연결) */
  applicationId: string;
  /** 예약 상태 */
  status: ReservationStatus;

  // 배송 정보
  /** 수령인 이름 */
  recipientName: string;
  /** 수령인 연락처 */
  recipientPhone: string;
  /** 배송지 주소 */
  address: string;
  /** 상세 주소 */
  addressDetail?: string;
  /** 우편번호 */
  postalCode: string;
  /** 배송 메모 */
  deliveryMemo?: string;

  // 날짜
  /** 예약일 (ISO 8601) */
  reservedAt: string;
  /** 확정일 (ISO 8601) */
  confirmedAt?: string;
  /** 배송 시작일 (ISO 8601) */
  shippedAt?: string;
  /** 배송 완료일 (ISO 8601) */
  deliveredAt?: string;
  /** 취소일 (ISO 8601) */
  cancelledAt?: string;

  // 배송 추적
  /** 운송장 번호 */
  trackingNumber?: string;
  /** 택배사 */
  courier?: string;

  /** 생성일 (ISO 8601) */
  createdAt: string;
  /** 수정일 (ISO 8601) */
  updatedAt: string;
}

/**
 * 예약 생성 요청 데이터
 */
export interface CreateReservationRequest {
  /** 캠페인 ID */
  campaignId: string;
  /** 수령인 이름 */
  recipientName: string;
  /** 수령인 연락처 */
  recipientPhone: string;
  /** 배송지 주소 */
  address: string;
  /** 상세 주소 */
  addressDetail?: string;
  /** 우편번호 */
  postalCode: string;
  /** 배송 메모 */
  deliveryMemo?: string;
}

/**
 * 예약 수정 요청 데이터
 */
export interface UpdateReservationRequest {
  /** 수령인 이름 */
  recipientName?: string;
  /** 수령인 연락처 */
  recipientPhone?: string;
  /** 배송지 주소 */
  address?: string;
  /** 상세 주소 */
  addressDetail?: string;
  /** 우편번호 */
  postalCode?: string;
  /** 배송 메모 */
  deliveryMemo?: string;
}

/**
 * 예약 상태별 레이블
 */
export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: '예약 대기',
  confirmed: '예약 확정',
  shipped: '배송 중',
  delivered: '배송 완료',
  cancelled: '취소됨',
};

/**
 * 예약 상태별 설명
 */
export const RESERVATION_STATUS_DESCRIPTIONS: Record<ReservationStatus, string> = {
  pending: '예약 확정을 기다리고 있습니다',
  confirmed: '예약이 확정되었습니다. 곧 배송이 시작됩니다',
  shipped: '제품이 배송 중입니다',
  delivered: '제품이 배송 완료되었습니다. 리뷰를 작성해주세요!',
  cancelled: '예약이 취소되었습니다',
};
