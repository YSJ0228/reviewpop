/**
 * Reservation (예약) 엔티티 타입 정의
 */

import { User } from '@entities/user/types/user.types';
import { Campaign } from '@entities/campaign/types/campaign.types';

/**
 * 예약 상태
 * - pending: 예약 대기 중 (확정 전)
 * - confirmed: 예약 확정
 * - cancelled: 취소됨
 */

export type ReservationStatus = 'before' | 'scheduled';

/**
 * 예약 정보
 */
export interface Reservation {
  /** 예약 ID */
  id: string;
  /** 사용자 ID */
  userId: string;
  /** 체험 ID */
  campaignId: Campaign['id'];
  /** 신청 ID (선정된 신청과 연결) */
  applicationId: string;
  /** 예약 상태 */
  status: ReservationStatus;

  // 체험 정보
  brand: Campaign['brand'];
  providedItem: Campaign['providedItems'];
  location: Campaign['location'];

  /** 방문 인원 */
  visitors: number;

  /** 예약자 정보 */
  booker: User['name'];
  phoneNumber: User['phoneNumber'];

  /** 예약 날짜와 에약 시간 */
  reservedAt: {
    date: string;
    hour: string;
  };

  /** 생성일 (ISO 8601) */
  createdAt: string;
  /** 수정일 (ISO 8601) */
  updatedAt: string;

  /** 예약 유의 사항 */
  precautions?: string[];
}

/**
 * 예약 생성 요청 DTO
 */
export interface CreateReservationRequest {
  campaignId: string;
  userId: string;
  visitors: number;
  booker: string;
  phoneNumber: string;
  reservedAt: {
    date: string;
    hour: string;
  };
  precautions?: string[];
}

/**
 *  예약 수정 요청 DTO
 */
export interface UpdateReservationRequest {
  campaignId: string;
  userId: string;
  visitors: number;
  booker: string;
  phoneNumber: string;
  reservedAt: {
    date: string;
    hour: string;
  };
  precautions?: string[];
}

/**
 * 예약 상태별 레이블
 */
export const STATUS_VISIT: Record<ReservationStatus, string> = {
  before: '방문 전',
  scheduled: '방문 예정',
};
