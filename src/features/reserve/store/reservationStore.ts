/**
 * Reservation Store (Zustand)
 *
 * 예약 과정에서 사용자가 입력한 예약 정보를 임시로 저장하는 전역 store입니다.
 *
 * @example
 * ```tsx
 * import { useReservationStore } from '@features/reserve/store/reservationStore';
 *
 * function MyComponent() {
 *   const reservationData = useReservationStore((state) => state.reservationData);
 *   const setReservationData = useReservationStore((state) => state.setReservationData);
 *
 *   return <div>{reservationData?.bookerName}</div>;
 * }
 * ```
 */

import { create } from 'zustand';

/**
 * 예약 정보 데이터 구조
 * 사용자가 선택한 예약 정보만 관리합니다.
 */
export interface ReservationData {
  /** 캠페인 ID */
  campaignId: string;
  /** 신청 ID */
  applicationId: string;
  /** 방문 인원 */
  personCount: number;
  /** 방문 날짜 (ISO 8601 string: YYYY-MM-DDTHH:mm:ss) */
  date: string;
}

interface ReservationState {
  /** 현재 예약 정보 */
  reservationData: ReservationData | null;
}

interface ReservationActions {
  /** 예약 정보 설정 */
  setReservationData: (data: ReservationData) => void;
  /** 예약 정보 초기화 */
  resetReservationData: () => void;
}

type ReservationStore = ReservationState & ReservationActions;

/**
 * Reservation Store
 */
export const useReservationStore = create<ReservationStore>((set) => ({
  // 초기 상태
  reservationData: null,

  // 설정 (정보 저장)
  setReservationData: (data) => set({ reservationData: data }),

  // 초기화
  resetReservationData: () => set({ reservationData: null }),
}));
