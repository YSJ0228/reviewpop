/**
 * Reservation (예약) 엔티티 타입 정의
 */

/**
 * 예약 정보
 */

// 브레이크 타임???????
export interface ReservationDisable {
  // campaignId: string;
  notice?: string; // 몇 인분 제공?? ex. 본 체험은 2인 기준으로 제공됩니다
  maxCount: number; // 최대 몇명???
  disabled: string[]; // 안되는 날짜만 date()
  duration?: number; // default: 30분
  startDate: string;
  endDate: string;
}

export interface ReservationDisableTimes {
  disabled: string[]; // 안되는 시간만 date()
}

export interface CreateReservation {
  campaignId: string;
  applicationId: string;
  personCount: number;
  date: string;
}
