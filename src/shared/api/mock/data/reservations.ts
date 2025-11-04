/**
 * Mock 예약(Reservation) 데이터
 *
 * 선정된 사용자들의 제품 예약 및 배송 정보를 관리합니다.
 * 총 20개의 예약 데이터로 다양한 배송 상태를 시뮬레이션합니다.
 */

import type { Reservation } from '@entities/reservation';
import { mockUsers } from './users';
import { mockApplications } from './applications';

/**
 * Reservation mock 데이터
 *
 * 상태 분포:
 * - pending (대기): 약 5개
 * - confirmed (확정): 약 4개
 * - shipped (배송중): 약 5개
 * - delivered (배송완료): 약 5개
 * - cancelled (취소): 약 1개
 */
export const mockReservations: Reservation[] = [
  // 최근 예약 (pending)
  {
    id: 'res-001',
    userId: 'kakao-1002',
    campaignId: '1',
    applicationId: 'app-003',
    status: 'pending',
    recipientName: '최지영',
    recipientPhone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '456호',
    postalCode: '06234',
    deliveryMemo: '부재시 경비실에 맡겨주세요',
    reservedAt: '2025-11-03T11:00:00Z',
    createdAt: '2025-11-03T11:00:00Z',
    updatedAt: '2025-11-03T11:00:00Z',
  },
  {
    id: 'res-002',
    userId: 'kakao-1004',
    campaignId: '2',
    applicationId: 'app-007',
    status: 'pending',
    recipientName: '강유나',
    recipientPhone: '010-2345-6789',
    address: '서울시 송파구 올림픽로 300',
    addressDetail: '101동 1004호',
    postalCode: '05551',
    reservedAt: '2025-11-02T15:00:00Z',
    createdAt: '2025-11-02T15:00:00Z',
    updatedAt: '2025-11-02T15:00:00Z',
  },
  {
    id: 'res-003',
    userId: 'naver-2003',
    campaignId: '2',
    applicationId: 'app-008',
    status: 'pending',
    recipientName: '임혜민',
    recipientPhone: '010-3456-7890',
    address: '경기도 성남시 분당구 판교역로 166',
    postalCode: '13494',
    reservedAt: '2025-11-02T16:00:00Z',
    createdAt: '2025-11-02T16:00:00Z',
    updatedAt: '2025-11-02T16:00:00Z',
  },
  {
    id: 'res-004',
    userId: 'naver-2002',
    campaignId: '3',
    applicationId: 'app-012',
    status: 'pending',
    recipientName: '윤태양',
    recipientPhone: '010-4567-8901',
    address: '인천시 연수구 센트럴로 263',
    addressDetail: '1502호',
    postalCode: '21984',
    reservedAt: '2025-11-01T10:00:00Z',
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-01T10:00:00Z',
  },
  {
    id: 'res-005',
    userId: 'kakao-1005',
    campaignId: '3',
    applicationId: 'app-013',
    status: 'pending',
    recipientName: '송지훈',
    recipientPhone: '010-5678-9012',
    address: '부산시 해운대구 센텀중앙로 79',
    postalCode: '48059',
    deliveryMemo: '도착 30분 전 연락주세요',
    reservedAt: '2025-11-01T11:00:00Z',
    createdAt: '2025-11-01T11:00:00Z',
    updatedAt: '2025-11-01T11:00:00Z',
  },

  // 확정된 예약 (confirmed)
  {
    id: 'res-006',
    userId: 'kakao-1001',
    campaignId: '4',
    applicationId: 'app-018',
    status: 'confirmed',
    recipientName: '박민수',
    recipientPhone: '010-6789-0123',
    address: '서울시 마포구 월드컵북로 396',
    addressDetail: '502호',
    postalCode: '03925',
    reservedAt: '2025-10-29T11:00:00Z',
    confirmedAt: '2025-10-30T09:00:00Z',
    createdAt: '2025-10-29T11:00:00Z',
    updatedAt: '2025-10-30T09:00:00Z',
  },
  {
    id: 'res-007',
    userId: 'kakao-1006',
    campaignId: '4',
    applicationId: 'app-019',
    status: 'confirmed',
    recipientName: '이채린',
    recipientPhone: '010-7890-1234',
    address: '경기도 고양시 일산동구 중앙로 1261',
    postalCode: '10387',
    reservedAt: '2025-10-29T12:00:00Z',
    confirmedAt: '2025-10-30T09:00:00Z',
    createdAt: '2025-10-29T12:00:00Z',
    updatedAt: '2025-10-30T09:00:00Z',
  },
  {
    id: 'res-008',
    userId: 'naver-2002',
    campaignId: '5',
    applicationId: 'app-022',
    status: 'confirmed',
    recipientName: '윤태양',
    recipientPhone: '010-4567-8901',
    address: '인천시 연수구 센트럴로 263',
    addressDetail: '1502호',
    postalCode: '21984',
    deliveryMemo: '회사 주소입니다',
    reservedAt: '2025-10-28T15:00:00Z',
    confirmedAt: '2025-10-29T10:00:00Z',
    createdAt: '2025-10-28T15:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    id: 'res-009',
    userId: 'naver-2001',
    campaignId: '6',
    applicationId: 'app-025',
    status: 'confirmed',
    recipientName: '이영희',
    recipientPhone: '010-8901-2345',
    address: '서울시 종로구 종로 1',
    addressDetail: '1001호',
    postalCode: '03154',
    reservedAt: '2025-10-20T10:00:00Z',
    confirmedAt: '2025-10-21T09:00:00Z',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-21T09:00:00Z',
  },

  // 배송 중 (shipped)
  {
    id: 'res-010',
    userId: 'kakao-1004',
    campaignId: '6',
    applicationId: 'app-026',
    status: 'shipped',
    recipientName: '강유나',
    recipientPhone: '010-2345-6789',
    address: '서울시 송파구 올림픽로 300',
    addressDetail: '101동 1004호',
    postalCode: '05551',
    reservedAt: '2025-10-20T11:00:00Z',
    confirmedAt: '2025-10-21T09:00:00Z',
    shippedAt: '2025-10-25T10:00:00Z',
    trackingNumber: '1234567890123',
    courier: 'CJ대한통운',
    createdAt: '2025-10-20T11:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: 'res-011',
    userId: 'kakao-1001',
    campaignId: '7',
    applicationId: 'app-028',
    status: 'shipped',
    recipientName: '홍길동',
    recipientPhone: '010-9012-3456',
    address: '서울시 강서구 공항대로 250',
    postalCode: '07505',
    reservedAt: '2025-10-18T11:00:00Z',
    confirmedAt: '2025-10-19T09:00:00Z',
    shippedAt: '2025-10-23T10:00:00Z',
    trackingNumber: '9876543210987',
    courier: '로젠택배',
    createdAt: '2025-10-18T11:00:00Z',
    updatedAt: '2025-10-23T10:00:00Z',
  },
  {
    id: 'res-012',
    userId: 'kakao-1002',
    campaignId: '7',
    applicationId: 'app-029',
    status: 'shipped',
    recipientName: '최지영',
    recipientPhone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    addressDetail: '456호',
    postalCode: '06234',
    reservedAt: '2025-10-18T15:00:00Z',
    confirmedAt: '2025-10-19T09:00:00Z',
    shippedAt: '2025-10-23T11:00:00Z',
    trackingNumber: '1122334455667',
    courier: '우체국택배',
    createdAt: '2025-10-18T15:00:00Z',
    updatedAt: '2025-10-23T11:00:00Z',
  },
  {
    id: 'res-013',
    userId: 'kakao-1002',
    campaignId: '8',
    applicationId: 'app-032',
    status: 'shipped',
    recipientName: '김철수',
    recipientPhone: '010-0123-4567',
    address: '대구시 달서구 성서공단로 11길 39',
    postalCode: '42708',
    deliveryMemo: '문 앞에 놓아주세요',
    reservedAt: '2025-10-16T11:00:00Z',
    confirmedAt: '2025-10-17T09:00:00Z',
    shippedAt: '2025-10-21T10:00:00Z',
    trackingNumber: '2233445566778',
    courier: 'CJ대한통운',
    createdAt: '2025-10-16T11:00:00Z',
    updatedAt: '2025-10-21T10:00:00Z',
  },
  {
    id: 'res-014',
    userId: 'kakao-1005',
    campaignId: '8',
    applicationId: 'app-033',
    status: 'shipped',
    recipientName: '송지훈',
    recipientPhone: '010-5678-9012',
    address: '부산시 해운대구 센텀중앙로 79',
    postalCode: '48059',
    reservedAt: '2025-10-16T13:00:00Z',
    confirmedAt: '2025-10-17T09:00:00Z',
    shippedAt: '2025-10-21T11:00:00Z',
    trackingNumber: '3344556677889',
    courier: '한진택배',
    createdAt: '2025-10-16T13:00:00Z',
    updatedAt: '2025-10-21T11:00:00Z',
  },

  // 배송 완료 (delivered)
  {
    id: 'res-015',
    userId: 'kakao-1001',
    campaignId: '9',
    applicationId: 'app-035',
    status: 'delivered',
    recipientName: '박민수',
    recipientPhone: '010-6789-0123',
    address: '서울시 마포구 월드컵북로 396',
    addressDetail: '502호',
    postalCode: '03925',
    reservedAt: '2025-10-13T11:00:00Z',
    confirmedAt: '2025-10-14T09:00:00Z',
    shippedAt: '2025-10-18T10:00:00Z',
    deliveredAt: '2025-10-20T14:30:00Z',
    trackingNumber: '4455667788990',
    courier: 'CJ대한통운',
    createdAt: '2025-10-13T11:00:00Z',
    updatedAt: '2025-10-20T14:30:00Z',
  },
  {
    id: 'res-016',
    userId: 'naver-2001',
    campaignId: '10',
    applicationId: 'app-037',
    status: 'delivered',
    recipientName: '이영희',
    recipientPhone: '010-8901-2345',
    address: '서울시 종로구 종로 1',
    addressDetail: '1001호',
    postalCode: '03154',
    reservedAt: '2025-10-08T11:00:00Z',
    confirmedAt: '2025-10-09T09:00:00Z',
    shippedAt: '2025-10-13T10:00:00Z',
    deliveredAt: '2025-10-15T11:20:00Z',
    trackingNumber: '5566778899001',
    courier: '로젠택배',
    createdAt: '2025-10-08T11:00:00Z',
    updatedAt: '2025-10-15T11:20:00Z',
  },
  {
    id: 'res-017',
    userId: 'kakao-1006',
    campaignId: '10',
    applicationId: 'app-038',
    status: 'delivered',
    recipientName: '이채린',
    recipientPhone: '010-7890-1234',
    address: '경기도 고양시 일산동구 중앙로 1261',
    postalCode: '10387',
    reservedAt: '2025-10-08T13:00:00Z',
    confirmedAt: '2025-10-09T09:00:00Z',
    shippedAt: '2025-10-13T11:00:00Z',
    deliveredAt: '2025-10-15T15:45:00Z',
    trackingNumber: '6677889900112',
    courier: '우체국택배',
    createdAt: '2025-10-08T13:00:00Z',
    updatedAt: '2025-10-15T15:45:00Z',
  },
  {
    id: 'res-018',
    userId: 'kakao-1001',
    campaignId: '11',
    applicationId: 'app-040',
    status: 'delivered',
    recipientName: '홍길동',
    recipientPhone: '010-9012-3456',
    address: '서울시 강서구 공항대로 250',
    postalCode: '07505',
    reservedAt: '2025-10-05T11:00:00Z',
    confirmedAt: '2025-10-06T09:00:00Z',
    shippedAt: '2025-10-10T10:00:00Z',
    deliveredAt: '2025-10-12T13:10:00Z',
    trackingNumber: '7788990011223',
    courier: '한진택배',
    createdAt: '2025-10-05T11:00:00Z',
    updatedAt: '2025-10-12T13:10:00Z',
  },
  {
    id: 'res-019',
    userId: 'kakao-1008',
    campaignId: '11',
    applicationId: 'app-041',
    status: 'delivered',
    recipientName: '남예진',
    recipientPhone: '010-2468-1357',
    address: '광주시 북구 첨단과기로 123',
    postalCode: '61005',
    reservedAt: '2025-10-05T14:00:00Z',
    confirmedAt: '2025-10-06T09:00:00Z',
    shippedAt: '2025-10-10T11:00:00Z',
    deliveredAt: '2025-10-12T16:25:00Z',
    trackingNumber: '8899001122334',
    courier: 'CJ대한통운',
    createdAt: '2025-10-05T14:00:00Z',
    updatedAt: '2025-10-12T16:25:00Z',
  },

  // 취소된 예약 (cancelled)
  {
    id: 'res-020',
    userId: 'kakao-1009',
    campaignId: '12',
    applicationId: 'app-043',
    status: 'cancelled',
    recipientName: '고승호',
    recipientPhone: '010-1357-2468',
    address: '대전시 유성구 대학로 99',
    postalCode: '34141',
    reservedAt: '2025-10-01T11:00:00Z',
    confirmedAt: '2025-10-02T09:00:00Z',
    cancelledAt: '2025-10-04T10:00:00Z',
    createdAt: '2025-10-01T11:00:00Z',
    updatedAt: '2025-10-04T10:00:00Z',
  },
];

/**
 * 사용자별 예약 목록 조회
 */
export function getReservationsByUserId(userId: string): Reservation[] {
  return mockReservations.filter((res) => res.userId === userId);
}

/**
 * 캠페인별 예약 목록 조회
 */
export function getReservationsByCampaignId(campaignId: string): Reservation[] {
  return mockReservations.filter((res) => res.campaignId === campaignId);
}

/**
 * 상태별 예약 목록 조회
 */
export function getReservationsByStatus(
  userId: string,
  status: Reservation['status'],
): Reservation[] {
  return mockReservations.filter((res) => res.userId === userId && res.status === status);
}

/**
 * Reservation ID로 찾기
 */
export function findReservationById(id: string): Reservation | undefined {
  return mockReservations.find((res) => res.id === id);
}

/**
 * Application ID로 예약 찾기
 */
export function findReservationByApplicationId(applicationId: string): Reservation | undefined {
  return mockReservations.find((res) => res.applicationId === applicationId);
}
