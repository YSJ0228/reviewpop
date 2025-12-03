import { ReservationConfig, ReservedDateTimes } from '@entities/reservation';
import { ReservationData } from './reservationStore';

/**
 * '무선 이어폰 체험단' 기반 예약 정보 Mock Data
 */
export const mockReservationData: ReservationData = {
  campaignId: '3',
  applicationId: 'APP-12345', // 가상의 신청 ID
  personCount: 1,
  date: '2025-12-05T11:00:00',
};

export const mockReservationConfig: ReservationConfig = {
  notice: '본 체험은 2인 기준으로 제공됩니다',
  maxCount: 2,
  disabled: ['2025-12-05', '2025-12-06'],
  startDate: '2025-12-01',
  endDate: '2025-12-08',
};

export const mockReservedDateTimes: ReservedDateTimes = {
  dateTimes: ['2025-12-04T10:00:00', '2025-12-03T10:30:00', '2025-12-07T14:00:00'],
};
