/**
 * Mock 신청(Application) 데이터
 *
 * 사용자들의 체험 신청 내역을 관리합니다.
 * 총 50개의 신청 데이터로 다양한 상태를 시뮬레이션합니다.
 */

import type { Application } from '@entities/application';
import { mockCampaignDetails } from '@entities/campaign/lib/mockCampaignDetails';
import { mockUsers } from './users';

// /**
//  * 사용자 정보 헬퍼 함수
//  */
// function getUserInfo(userId: string) {
//   const user = mockUsers.find((u) => u.id === userId);
//   return {
//     name: user?.name || '사용자',
//   };
// }

function getCampaign(id: string) {
  const campaign = mockCampaignDetails.find((c) => c.id === id);
  if (!campaign) throw new Error(`Campaign ${id} not found`);
  return campaign;
}

// Mock 데이터에서 사용할 확장 타입 (userId 포함)
export type MockApplication = Application & { userId: string };

/**
 * Application mock 데이터
 *
 * 상태 분포:
 * - pending (대기): 약 20개
 * - selected (선정): 약 15개
 * - rejected (거절): 약 12개
 * - cancelled (취소): 약 3개
 */
export const mockApplications: MockApplication[] = [
  // Campaign #1 신청 (5명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-28T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-28T10:30:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('1'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-29T14:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('1'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-30T11:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('1'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    name: '이채린',
    blogAddress: 'https://blog.naver.com/kakao-1006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-29T08:00:00Z',
  },

  // Campaign #2 신청 (4명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('2'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-25T15:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('2'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '강유나',
    blogAddress: 'https://blog.naver.com/kakao-1004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-26T10:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaign: getCampaign('2'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '임혜민',
    blogAddress: 'https://blog.naver.com/naver-2003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-26T16:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaign: getCampaign('2'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '남예진',
    blogAddress: 'https://blog.naver.com/kakao-1008',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-27T09:00:00Z',
  },

  // Campaign #3 신청 (6명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('3'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-22T11:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('3'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '정세훈',
    blogAddress: 'https://blog.naver.com/kakao-1003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-22T13:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaign: getCampaign('3'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '윤태양',
    blogAddress: 'https://blog.naver.com/naver-2002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-23T10:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('3'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-23T14:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaign: getCampaign('3'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '오주원',
    blogAddress: 'https://blog.naver.com/naver-2004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-24T08:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaign: getCampaign('3'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '김도현',
    blogAddress: 'https://blog.naver.com/kakao-1007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-24T11:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaign: getCampaign('3'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-24T12:00:00Z',
  },

  // Campaign #4 신청 (5명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaign: getCampaign('4'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '신동하',
    blogAddress: 'https://blog.naver.com/naver-2005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-19T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-19T14:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('4'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '이채린',
    blogAddress: 'https://blog.naver.com/kakao-1006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-20T11:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaign: getCampaign('4'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '전수빈',
    blogAddress: 'https://blog.naver.com/naver-2006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-20T15:00:00Z',
  },

  // Campaign #5 신청 (4명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('5'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-13T10:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaign: getCampaign('5'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '윤태양',
    blogAddress: 'https://blog.naver.com/naver-2002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-14T09:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('5'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '정세훈',
    blogAddress: 'https://blog.naver.com/kakao-1003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-15T11:00:00Z',
  },
  {
    userId: 'kakao-1009',
    campaign: getCampaign('5'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '고승호',
    blogAddress: 'https://blog.naver.com/kakao-1009',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-16T08:00:00Z',
  },

  // Campaign #6 신청 (3명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('6'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-08T10:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('6'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '강유나',
    blogAddress: 'https://blog.naver.com/kakao-1004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-09T11:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaign: getCampaign('6'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '임혜민',
    blogAddress: 'https://blog.naver.com/naver-2003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-09T14:00:00Z',
  },

  // Campaign #7 신청 (4명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('7'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-04T09:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('7'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-04T14:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('7'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-05T10:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaign: getCampaign('7'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    name: '김도현',
    blogAddress: 'https://blog.naver.com/kakao-1007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-05T11:00:00Z',
  },

  // Campaign #8 신청 (3명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('8'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-03T10:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('8'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-03T13:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaign: getCampaign('8'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '오주원',
    blogAddress: 'https://blog.naver.com/naver-2004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-04T11:00:00Z',
  },

  // Campaign #9 신청 (2명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('9'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-02T10:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaign: getCampaign('9'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '신동하',
    blogAddress: 'https://blog.naver.com/naver-2005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-10-02T14:00:00Z',
  },

  // Campaign #10 신청 (3명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('10'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-26T10:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('10'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '이채린',
    blogAddress: 'https://blog.naver.com/kakao-1006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-27T11:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaign: getCampaign('10'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '전수빈',
    blogAddress: 'https://blog.naver.com/naver-2006',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-28T09:00:00Z',
  },

  // Campaign #11 신청 (3명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('11'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '박민수',
    blogAddress: 'https://blog.naver.com/kakao-1001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-23T10:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaign: getCampaign('11'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '남예진',
    blogAddress: 'https://blog.naver.com/kakao-1008',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-24T11:00:00Z',
  },
  {
    userId: 'naver-2007',
    campaign: getCampaign('11'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '백지호',
    blogAddress: 'https://blog.naver.com/naver-2007',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-25T09:00:00Z',
  },

  // Campaign #12 신청 (2명)
  {
    userId: 'kakao-1009',
    campaign: getCampaign('12'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '고승호',
    blogAddress: 'https://blog.naver.com/kakao-1009',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-18T10:00:00Z',
  },
  {
    userId: 'naver-2008',
    campaign: getCampaign('12'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    name: '황민지',
    blogAddress: 'https://blog.naver.com/naver-2008',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-19T11:00:00Z',
  },

  // 추가 신청 (Campaign #13, #14, #15)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('13'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-08T10:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('14'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '최지영',
    blogAddress: 'https://blog.naver.com/kakao-1002',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-03T10:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('15'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    name: '한소라',
    blogAddress: 'https://blog.naver.com/naver-2001',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-08-29T10:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('13'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '정세훈',
    blogAddress: 'https://blog.naver.com/kakao-1003',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-09T11:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('14'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '강유나',
    blogAddress: 'https://blog.naver.com/kakao-1004',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-09-04T11:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('15'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    name: '송지훈',
    blogAddress: 'https://blog.naver.com/kakao-1005',
    phoneNumber: '010-1234-5678',
    createdAt: '2025-08-30T11:00:00Z',
  },
];

/**
 * 사용자별 신청 목록 조회
 */
export function getApplicationsByUserId(userId: string): MockApplication[] {
  return mockApplications.filter((app) => app.userId === userId);
}

/**
 * 체험별 신청 목록 조회
 */
export function getApplicationsByCampaignId(campaignId: string): MockApplication[] {
  return mockApplications.filter((app) => app.campaign.id === campaignId);
}

/**
 * 상태별 신청 목록 조회
 */
export function getApplicationsByStatus(
  userId: string,
  status: Application['status'],
): MockApplication[] {
  return mockApplications.filter((app) => app.userId === userId && app.status === status);
}

/**
 * 특정 사용자의 특정 체험 신청 찾기
 */
export function findApplicationByUserAndCampaign(
  userId: string,
  campaignId: string,
): MockApplication | undefined {
  return mockApplications.find((app) => app.userId === userId && app.campaign.id === campaignId);
}

/**
 * 단일 Application Mock Data (예약 페이지 등에서 사용)
 */
export const mockApplicationData = mockApplications[0];
