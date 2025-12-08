/**
 * Mock 신청(Application) 데이터
 *
 * 사용자들의 체험 신청 내역을 관리합니다.
 * 총 50개의 신청 데이터로 다양한 상태를 시뮬레이션합니다.
 */

import type { Application } from '@entities/application';
import { INITIAL_CAMPAIGNS } from '@entities/campaign/api/mock/data';
import type { CampaignDetail } from '@entities/campaign';

export function getCampaign(id: string) {
  const campaign = INITIAL_CAMPAIGNS.find((c) => c.id === id);
  if (!campaign) throw new Error(`Campaign ${id} not found`);
  return campaign;
}

function getReservationDate(campaign: CampaignDetail, daysAfterStart = 1) {
  const startDate = new Date(campaign.schedule.review.start);
  startDate.setDate(startDate.getDate() + daysAfterStart);
  startDate.setHours(0, 0, 0, 0); // 오후 3시로 고정 (KST 00:00 -> UTC 15:00 -> Frontend Local 15:00)
  return startDate.toISOString().split('.')[0]; // YYYY-MM-DDTHH:mm:ss 형식
}

/**
 * Application mock 데이터
 *
 * 상태 분포:
 * - pending (대기): 약 20개
 * - selected (선정): 약 15개
 * - rejected (거절): 약 12개
 * - cancelled (취소): 약 3개
 */
export const mockApplications: Application[] = [
  // Campaign #1 신청 (5명)
  {
    id: 'app-1',
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    status: 'rejected',
    isReservated: false,
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-05T10:00:00Z',
  },
  {
    id: 'app-2',
    userId: 'kakao-1001',
    campaign: getCampaign('2'),
    status: 'pending',
    isReservated: false,
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-07T10:30:00Z',
  },
  {
    id: 'app-3',
    userId: 'kakao-1001',
    campaign: getCampaign('3'),
    status: 'pending',
    isReservated: false,
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-05T11:00:00Z',
  },
  {
    id: 'app-4',
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    status: 'selected',
    isReservated: false,
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-05T14:00:00Z',
  },
  {
    id: 'app-5',
    userId: 'kakao-1001',
    campaign: getCampaign('5'),
    status: 'selected',
    isReservated: true,
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-06T15:00:00Z',
  },
  {
    id: 'app-6',
    userId: 'kakao-1001',
    campaign: getCampaign('6'),
    status: 'reviewed',
    reviewStatus: 'notReviewed',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('6')),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-08T11:00:00Z',
  },
  // Campaign #2 신청 (4명)
  {
    id: 'app-7',
    userId: 'kakao-1001',
    campaign: getCampaign('7'),
    status: 'reviewed',
    reviewStatus: 'visited',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('7'), -1),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-12-05T11:00:00Z',
  },
  {
    id: 'app-8',
    userId: 'kakao-1001',
    campaign: getCampaign('8'),
    status: 'reviewed',
    reviewStatus: 'notReviewed',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('8'), -5),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-11-31T10:00:00Z',
  },
  {
    id: 'app-9',
    userId: 'kakao-1001',
    campaign: getCampaign('9'),
    status: 'reviewed',
    reviewStatus: 'reviewPending',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('9'), -3),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-11-30T15:00:00Z',
  },

  // Campaign #3 신청 (6명)
  {
    id: 'app-10',
    userId: 'kakao-1001',
    campaign: getCampaign('10'),
    status: 'reviewed',
    reviewStatus: 'requiredForEditing',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('10'), -2),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-11-29T09:00:00Z',
  },
  {
    id: 'app-11',
    userId: 'kakao-1001',
    campaign: getCampaign('11'),
    status: 'completed',
    reviewStatus: 'reviewed',
    isReservated: true,
    reservationDate: getReservationDate(getCampaign('11'), -10),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-11-28T10:00:00Z',
  },
  {
    id: 'app-12',
    userId: 'naver-2002',
    campaign: getCampaign('3'),
    status: 'selected',
    isReservated: false,
    name: '윤태양',
    blogAddress: 'https://blog.naver.com/naver-2002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-23T10:00:00Z',
  },
  {
    id: 'app-13',
    userId: 'kakao-1005',
    campaign: getCampaign('3'),
    status: 'selected',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-23T14:00:00Z',
  },
  {
    id: 'app-14',
    userId: 'naver-2004',
    campaign: getCampaign('3'),
    status: 'rejected',
    isReservated: false,
    name: '오주원',
    blogAddress: 'https://blog.naver.com/naver-2004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-24T08:00:00Z',
  },
  {
    id: 'app-15',
    userId: 'kakao-1007',
    campaign: getCampaign('3'),
    status: 'rejected',
    isReservated: false,
    name: '김도현',
    blogAddress: 'https://blog.naver.com/kakao-1007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-24T11:00:00Z',
  },
  // Campaign #4 신청 (5명)
  {
    id: 'app-18',
    userId: 'naver-2005',
    campaign: getCampaign('4'),
    status: 'pending',
    isReservated: false,
    name: '신동하',
    blogAddress: 'https://blog.naver.com/naver-2005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-19T09:00:00Z',
  },
  {
    id: 'app-20',
    userId: 'kakao-1006',
    campaign: getCampaign('4'),
    status: 'selected',
    isReservated: false,
    name: '이채린',
    blogAddress: 'https://blog.naver.com/kakao-1006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-20T11:00:00Z',
  },
  {
    id: 'app-21',
    userId: 'naver-2006',
    campaign: getCampaign('4'),
    status: 'rejected',
    isReservated: false,
    name: '전수빈',
    blogAddress: 'https://blog.naver.com/naver-2006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-20T15:00:00Z',
  },

  // Campaign #5 신청 (4명)
  {
    id: 'app-22',
    userId: 'kakao-1002',
    campaign: getCampaign('5'),
    status: 'pending',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-13T10:00:00Z',
  },
  {
    id: 'app-23',
    userId: 'naver-2002',
    campaign: getCampaign('5'),
    status: 'selected',
    isReservated: false,
    name: '윤태양',
    blogAddress: 'https://blog.naver.com/naver-2002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-14T09:00:00Z',
  },
  {
    id: 'app-24',
    userId: 'kakao-1003',
    campaign: getCampaign('5'),
    status: 'rejected',
    isReservated: false,
    name: '정세훈',
    blogAddress: 'https://blog.naver.com/kakao-1003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-15T11:00:00Z',
  },
  {
    id: 'app-25',
    userId: 'kakao-1009',
    campaign: getCampaign('5'),
    status: 'rejected',
    isReservated: false,
    name: '고승호',
    blogAddress: 'https://blog.naver.com/kakao-1009',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-16T08:00:00Z',
  },

  // Campaign #6 신청 (3명)
  {
    id: 'app-26',
    userId: 'naver-2001',
    campaign: getCampaign('6'),
    status: 'reviewed',
    reviewStatus: 'visited', // 체험 완료 (예약 날짜 익일)
    isReservated: true,
    reservationDate: '2025-10-14T10:00:00',
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-08T10:00:00Z',
  },
  {
    id: 'app-27',
    userId: 'kakao-1004',
    campaign: getCampaign('6'),
    status: 'completed', // 종료 탭
    reviewStatus: 'reviewed', // 체험 종료 (종료 탭)
    isReservated: true,
    reservationDate: '2025-10-09T11:00:00',
    name: '강유나',
    blogAddress: 'https://blog.naver.com/kakao-1004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-09T11:00:00Z',
  },
  {
    id: 'app-28',
    userId: 'naver-2003',
    campaign: getCampaign('6'),
    status: 'rejected',
    isReservated: false,
    name: '임혜민',
    blogAddress: 'https://blog.naver.com/naver-2003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-09T14:00:00Z',
  },

  // Campaign #7 신청 (4명)
  {
    id: 'app-30',
    userId: 'kakao-1002',
    campaign: getCampaign('7'),
    status: 'selected',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-04T14:00:00Z',
  },
  {
    id: 'app-31',
    userId: 'naver-2001',
    campaign: getCampaign('7'),
    status: 'rejected',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-05T10:00:00Z',
  },
  {
    id: 'app-32',
    userId: 'kakao-1007',
    campaign: getCampaign('7'),
    status: 'cancelled',
    isReservated: false,
    name: '김도현',
    blogAddress: 'https://blog.naver.com/kakao-1007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-05T11:00:00Z',
  },

  // Campaign #8 신청 (3명)
  {
    id: 'app-33',
    userId: 'kakao-1002',
    campaign: getCampaign('8'),
    status: 'selected',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-03T10:00:00Z',
  },
  {
    id: 'app-34',
    userId: 'kakao-1005',
    campaign: getCampaign('8'),
    status: 'selected',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-03T13:00:00Z',
  },
  {
    id: 'app-35',
    userId: 'naver-2004',
    campaign: getCampaign('8'),
    status: 'rejected',
    isReservated: false,
    name: '오주원',
    blogAddress: 'https://blog.naver.com/naver-2004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-04T11:00:00Z',
  },

  // Campaign #9 신청 (2명)
  {
    id: 'app-37',
    userId: 'naver-2005',
    campaign: getCampaign('9'),
    status: 'rejected',
    isReservated: false,
    name: '신동하',
    blogAddress: 'https://blog.naver.com/naver-2005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-02T14:00:00Z',
  },

  // Campaign #10 신청 (3명)
  {
    id: 'app-38',
    userId: 'naver-2001',
    campaign: getCampaign('10'),
    status: 'selected',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-26T10:00:00Z',
  },
  {
    id: 'app-39',
    userId: 'kakao-1006',
    campaign: getCampaign('10'),
    status: 'selected',
    isReservated: false,
    name: '이채린',
    blogAddress: 'https://blog.naver.com/kakao-1006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-27T11:00:00Z',
  },
  {
    id: 'app-40',
    userId: 'naver-2006',
    campaign: getCampaign('10'),
    status: 'rejected',
    isReservated: false,
    name: '전수빈',
    blogAddress: 'https://blog.naver.com/naver-2006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-28T09:00:00Z',
  },
  // Campaign #11 신청 (3명)
  {
    id: 'app-42',
    userId: 'kakao-1008',
    campaign: getCampaign('11'),
    status: 'selected',
    isReservated: false,
    name: '남예진',
    blogAddress: 'https://blog.naver.com/kakao-1008',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-24T11:00:00Z',
  },
  {
    id: 'app-43',
    userId: 'naver-2007',
    campaign: getCampaign('11'),
    status: 'rejected',
    isReservated: false,
    name: '백지호',
    blogAddress: 'https://blog.naver.com/naver-2007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-25T09:00:00Z',
  },

  // Campaign #12 신청 (2명)
  {
    id: 'app-44',
    userId: 'kakao-1009',
    campaign: getCampaign('12'),
    status: 'selected',
    isReservated: false,
    name: '고승호',
    blogAddress: 'https://blog.naver.com/kakao-1009',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-18T10:00:00Z',
  },
  {
    id: 'app-45',
    userId: 'naver-2008',
    campaign: getCampaign('12'),
    status: 'cancelled',
    isReservated: false,
    name: '황민지',
    blogAddress: 'https://blog.naver.com/naver-2008',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-19T11:00:00Z',
  },

  // 추가 신청 (Campaign #13, #14, #15)
  {
    id: 'app-46',
    userId: 'kakao-1002',
    campaign: getCampaign('13'),
    status: 'selected',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-08T10:00:00Z',
  },
  {
    id: 'app-47',
    userId: 'kakao-1002',
    campaign: getCampaign('14'),
    status: 'selected',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-03T10:00:00Z',
  },
  {
    id: 'app-48',
    userId: 'naver-2001',
    campaign: getCampaign('15'),
    status: 'selected',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-08-29T10:00:00Z',
  },
  {
    id: 'app-49',
    userId: 'kakao-1003',
    campaign: getCampaign('13'),
    status: 'rejected',
    isReservated: false,
    name: '정세훈',
    blogAddress: 'https://blog.naver.com/kakao-1003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-09T11:00:00Z',
  },
  {
    id: 'app-50',
    userId: 'kakao-1004',
    campaign: getCampaign('14'),
    status: 'rejected',
    isReservated: false,
    name: '강유나',
    blogAddress: 'https://blog.naver.com/kakao-1004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-04T11:00:00Z',
  },
  {
    id: 'app-51',
    userId: 'kakao-1005',
    campaign: getCampaign('15'),
    status: 'rejected',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-08-30T11:00:00Z',
  },

  // Campaign #16 신청 - reviewed 상태별 데이터 (각 reviewStatus 값별로 생성)
  {
    id: 'app-53',
    userId: 'kakao-1002',
    campaign: getCampaign('15'),
    status: 'reviewed',
    reviewStatus: 'reviewPending',
    isReservated: true,
    reservationDate: '2025-10-18T11:00:00',
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-12T09:00:00Z',
  },
  {
    id: 'app-54',
    userId: 'naver-2001',
    campaign: getCampaign('15'),
    status: 'reviewed',
    reviewStatus: 'requiredForEditing',
    isReservated: true,
    reservationDate: '2025-10-16T13:00:00',
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-10T11:00:00Z',
  },
  {
    id: 'app-55',
    userId: 'naver-2002',
    campaign: getCampaign('15'),
    status: 'reviewed',
    reviewStatus: 'reviewed',
    isReservated: true,
    reservationDate: '2025-10-14T10:00:00',
    name: '윤태양',
    blogAddress: 'https://blog.naver.com/naver-2002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-08T14:00:00Z',
  },
];

/**
 * 사용자별 신청 목록 조회
 */
export function getApplicationsByUserId(userId: string): Application[] {
  return mockApplications.filter((app) => app.userId === userId);
}

/**
 * 체험별 신청 목록 조회
 */
export function getApplicationsByCampaignId(campaignId: string): Application[] {
  return mockApplications.filter((app) => app.campaign.id === campaignId);
}

/**
 * 상태별 신청 목록 조회
 */
export function getApplicationsByStatus(
  userId: string,
  status: Application['status'],
): Application[] {
  return mockApplications.filter((app) => app.userId === userId && app.status === status);
}

/**
 * 특정 사용자의 특정 체험 신청 찾기
 */
export function findApplicationByUserAndCampaign(
  userId: string,
  campaignId: string,
): Application | undefined {
  return mockApplications.find((app) => app.userId === userId && app.campaign.id === campaignId);
}

/**
 * 신청 ID로 신청 정보 조회
 */
export function getApplicationById(applicationId: string): Application | undefined {
  return mockApplications.find((app) => app.id === applicationId);
}

/**
 * 단일 Application Mock Data (예약 페이지 등에서 사용)
 */
export const mockApplicationData = mockApplications[0];
