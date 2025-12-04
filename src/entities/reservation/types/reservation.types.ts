/** 예약 정보 */
export interface ReservationDisable {
  // campaignId: string;
  notice?: string; // 몇 인분 제공 ex. 본 체험은 2인 기준으로 제공됩니다
  maxCount: number; // 최대 몇명
  disabled: string[]; // 안되는 날짜만 date()
  duration?: number; // default: 30분
  startDate: string;
  endDate: string;
}

/** 예약 불가능 시간 */
export interface ReservationDisableTimes {
  disabled: string[]; // 안되는 시간만 date()
}

/** 체험 예약하기 */
export interface PostReservation {
  campaignId: string;
  applicationId: string;
  personCount: number;
  date: string;
}

/** 본인이 한 예약정보 받기 */
export interface Reservation {
  campaignId: string;
  date: string;
  personCount: number;
  isVisited: boolean;
}
