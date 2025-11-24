import { ReservationData } from './reservationStore'; // reservationStore.ts 파일에서 타입을 import 했다고 가정

/**
 * '무선 이어폰 체험단' 기반 예약 정보 Mock Data
 *
 * - campaignId, brand, providedItem은 체험단 정보에서 가져왔습니다.
 * - 나머지 필드는 예약자가 입력한 정보를 가정했습니다.
 */
export const mockReservationData: ReservationData = {
  // --- 체험단 정보에서 가져온 값 ---
  campaignId: '3',
  brand: '삼성전자',
  providedItem: '무선 이어폰 1세트 + 충전 케이스 + 사이즈별 이어팁',
  thumbnailUrl: 'https://picsum.photos/seed/campaign3/800/600',

  // --- 예약자가 입력했다고 가정한 값 ---
  userId: 'USR-7001', // 가상의 사용자 ID
  bookerName: '이유진',
  bookerPhone: '010-9876-5432',
  visitDate: '2025-12-05', // YYYY-MM-DD
  visitTime: '11:00', // HH:MM
  address: '서울시 마포구 월드컵로 250 2층',
  visitorCounter: 1, // 방문 인원
  precautions: [
    '예약 당일에는 날짜 변경이 불가능하며, 취소 후 가능 날짜에 다시 예약만 가능합니다.',
    '후기 작성안하면 다 물어내야합니다.',
    '예약 후 노쇼 발생 시 이후 이용에 패널티가 있습니다.',
  ],
};
