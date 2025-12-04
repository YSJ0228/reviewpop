/**
 * 예약 정보
 */
// export interface Reservation {
//   id: string;
//   userId: string;
//   campaignId: string;
//   applicationId: string;
//   status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
//   recipientName: string;
//   recipientPhone: string;
//   address: string;
//   addressDetail?: string;
//   postalCode: string;
//   deliveryMemo?: string;
//   reservedAt: string;
//   confirmedAt?: string;
//   shippedAt?: string;
//   deliveredAt?: string;
//   cancelledAt?: string;
//   trackingNumber?: string;
//   courier?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateReservationRequest {
//   recipientName: string;
//   recipientPhone: string;
//   address: string;
//   addressDetail?: string;
//   postalCode: string;
//   deliveryMemo?: string;
// }

// export interface UpdateReservationRequest extends Partial<CreateReservationRequest> {
//   status?: Reservation['status'];
//   trackingNumber?: string;
//   courier?: string;
// }

export interface ReservationConfig {
  // campaignId: string;
  notice?: string; // 어드민이 입력한 서브타이틀 ex. 본 체험은 2인 기준으로 제공됩니다
  maxCount: number; // 타임당 최대 몇명???
  disabled: string[]; // 예약 불가능한 날짜만, YYYY-MM-DD 형식의 배열
  // ["2025-12-05", "2025-12-06"]
  intervalMinutes?: number; // default: 30분
  startDate: string; // YYYY-MM-DD
  endDate: string; //YYYY-MM-DD
}

export interface ReservedDateTimes {
  dateTimes: string[]; // 이미 예약되었거나 예약 불가능한 시간만, ISO 8601 형식의 배열
  // ["2025-12-05T10:00:00", "2025-12-05T10:30:00", "2025-12-05T11:00:00"]
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
