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
 */
export interface ReservationData {
  /** 캠페인 ID */
  campaignId: string;
  /** 사용자 ID */
  userId: string;
  /** 예약한 체험 이미지 URL */
  thumbnailUrl: string;
  /** 예약한 체험 브랜드명 */
  brand: string;
  /** 제공 상품 */
  providedItem: string;
  /** 예약자 이름 */
  bookerName: string;
  /** 예약자 연락처 */
  bookerPhone: string;
  /** 방문 날짜 */
  visitDate: string;
  /** 방문 시간 */
  visitTime: string;
  /** 주소 */
  address: string;
  /** 방문 인원 */
  visitorCounter: number;
  /** 유의사항 */
  precautions: string;
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

  // Actions
  setReservationData: (data) => set({ reservationData: data }),

  resetReservationData: () => set({ reservationData: null }),
}));
