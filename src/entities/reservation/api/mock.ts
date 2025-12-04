import { http, HttpResponse } from 'msw';
import { ReservationConfig, ReservedDateTimes } from '../types/reservation.types';
import { ApiResponse } from '@shared/api/types/common.types';

export const mockReservationConfig: ReservationConfig = {
  notice: '본 체험은 2인 기준으로 제공됩니다',
  maxCount: 2,
  disabled: ['2025-12-05', '2025-12-06'],
  startDate: '2025-12-02',
  endDate: '2025-12-24',
};

export const mockReservedDateTimes: ReservedDateTimes = {
  dateTimes: ['2025-12-04T10:00:00', '2025-12-03T10:30:00', '2025-12-07T14:00:00'],
};

export const reservationHandlers = [
  // 예약 설정 조회
  http.get('/api/reservations/:campaignId/config', () => {
    return HttpResponse.json({
      success: true,
      data: mockReservationConfig,
    } satisfies ApiResponse<ReservationConfig>);
  }),

  // 예약된 시간대 조회
  http.get('/api/reservations/:campaignId/reserved-times', () => {
    return HttpResponse.json({
      success: true,
      data: mockReservedDateTimes,
    } satisfies ApiResponse<ReservedDateTimes>);
  }),
];
