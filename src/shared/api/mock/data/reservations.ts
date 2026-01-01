/**
 * Mock 예약(Reservation) 데이터
 *
 * 선정된 사용자들의 제품 예약 및 배송 정보를 관리합니다.
 * 총 20개의 예약 데이터로 다양한 배송 상태를 시뮬레이션합니다.
 */

import type { Reservation, ReservationConfig, ReservedDateTimes } from '@entities/reservation';

/**
 * 예약 설정 Mock 데이터
 */
export const mockReservationConfig: ReservationConfig = {
  notice: '본 체험은 2인 기준으로 제공됩니다',
  maxCount: 2,
  disabled: ['2026-01-05', '2026-01-06'],
  startDate: '2026-01-01',
  endDate: '2026-12-31',
};

/**
 * 예약된 시간대 Mock 데이터
 */
export const mockReservedDateTimes: ReservedDateTimes = {
  dateTimes: ['2026-01-04T10:00:00', '2026-01-03T10:30:00', '2026-01-07T14:00:00'],
};

/**
 * Reservation mock 데이터
 */
export const mockReservations: Reservation[] = [
  // 최근 예약 (pending)
  {
    id: 'res-001',
    campaignId: '1',
    applicationId: 'app-1',
    date: '2025-11-03T11:00:00Z',
    personCount: 2,
  },
  {
    id: 'res-002',
    campaignId: '2',
    applicationId: 'app-2',
    date: '2025-11-02T15:00:00Z',
    personCount: 2,
  },
  {
    id: 'res-003',
    campaignId: '3',
    applicationId: 'app-3',
    date: '2025-11-02T16:00:00Z',
    personCount: 2,
  },
  {
    id: 'res-004',
    campaignId: '4',
    applicationId: 'app-4',
    date: '2025-11-01T10:00:00Z',
    personCount: 2,
  },
  {
    id: 'res-005',
    campaignId: '5',
    applicationId: 'app-5',
    date: '2025-11-01T11:00:00Z',
    personCount: 2,
  },

  // 확정된 예약 (confirmed)
  {
    id: 'res-006',
    campaignId: '6',
    applicationId: 'app-6',
    date: '2025-10-29T11:00:00Z',
    personCount: 2,
  },
  {
    id: 'res-007',
    campaignId: '7',
    applicationId: 'app-7',
    date: '2025-10-29T12:00:00Z',
    personCount: 2,
  },
];

/**
 * 사용자별 예약 목록 조회
 */
export function getReservationsByUserId(userId: string) {
  return mockReservations.filter((res) => res.applicationId === userId);
}

/**
 * 체험별 예약 목록 조회
 */
export function getReservationsByCampaignId(campaignId: string) {
  return mockReservations.filter((res) => res.campaignId === campaignId);
}

/**
 * 상태별 예약 목록 조회
 */
// export function getReservationsByStatus(userId: string, status: string) {
//   return mockReservations.filter((res) => res.applicationId === userId && res.status === status);
// }

/**
 * Reservation ID로 찾기
 */
// export function findReservationById(id: string) {
//   return mockReservations.find((res) => res.id === id);
// }

/**
 * Application ID로 예약 찾기
 */
export function findReservationByApplicationId(applicationId: string) {
  return mockReservations.find((res) => res.applicationId === applicationId);
}
