/**
 * Mock 신청(Application) 데이터
 *
 * 사용자들의 체험 신청 내역을 관리합니다.
 * 총 50개의 신청 데이터로 다양한 상태를 시뮬레이션합니다.
 */

import type { Application } from '@entities/application';
import { mockCampaignDetails } from '@entities/campaign/lib/mockCampaignDetails';
import { mockUsers } from './users';

/**
 * 사용자 정보 헬퍼 함수
 */
function getUserInfo(userId: string) {
  const user = mockUsers.find((u) => u.id === userId);
  return {
    name: user?.name || '사용자',
    phoneNumber: user?.phoneNumber || '010-0000-0000',
  };
}

export function getCampaign(id: string) {
  const campaign = mockCampaignDetails.find((c) => c.id === id);
  if (!campaign) throw new Error(`Campaign ${id} not found`);
  return campaign;
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
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-28T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-28T10:30:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('1'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-29T14:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('1'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-30T11:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('1'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-10-29T08:00:00Z',
  },

  // Campaign #2 신청 (4명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('2'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-25T15:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('2'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    createdAt: '2025-10-26T10:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaign: getCampaign('2'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2003'),
    createdAt: '2025-10-26T16:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaign: getCampaign('2'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1008'),
    createdAt: '2025-10-27T09:00:00Z',
  },

  // Campaign #3 신청 (6명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('3'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-22T11:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('3'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-10-22T13:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaign: getCampaign('3'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2002'),
    createdAt: '2025-10-23T10:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('3'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-10-23T14:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaign: getCampaign('3'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2004'),
    createdAt: '2025-10-24T08:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaign: getCampaign('3'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1007'),
    createdAt: '2025-10-24T11:00:00Z',
  },

  // Campaign #4 신청 (5명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaign: getCampaign('4'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2005'),
    createdAt: '2025-10-19T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-19T14:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('4'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-10-20T11:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaign: getCampaign('4'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2006'),
    createdAt: '2025-10-20T15:00:00Z',
  },

  // Campaign #5 신청 (4명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('5'),
    status: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-13T10:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaign: getCampaign('5'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2002'),
    createdAt: '2025-10-14T09:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('5'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-10-15T11:00:00Z',
  },
  {
    userId: 'kakao-1009',
    campaign: getCampaign('5'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1009'),
    createdAt: '2025-10-16T08:00:00Z',
  },

  // Campaign #6 신청 (3명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('6'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-08T10:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('6'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    createdAt: '2025-10-09T11:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaign: getCampaign('6'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2003'),
    createdAt: '2025-10-09T14:00:00Z',
  },

  // Campaign #7 신청 (4명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('7'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-04T09:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('7'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-04T14:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('7'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-05T10:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaign: getCampaign('7'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1007'),
    createdAt: '2025-10-05T11:00:00Z',
  },

  // Campaign #8 신청 (3명)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('8'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-03T10:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('8'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-10-03T13:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaign: getCampaign('8'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2004'),
    createdAt: '2025-10-04T11:00:00Z',
  },

  // Campaign #9 신청 (2명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('9'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-02T10:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaign: getCampaign('9'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2005'),
    createdAt: '2025-10-02T14:00:00Z',
  },

  // Campaign #10 신청 (3명)
  {
    userId: 'naver-2001',
    campaign: getCampaign('10'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-09-26T10:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaign: getCampaign('10'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-09-27T11:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaign: getCampaign('10'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2006'),
    createdAt: '2025-09-28T09:00:00Z',
  },

  // Campaign #11 신청 (3명)
  {
    userId: 'kakao-1001',
    campaign: getCampaign('11'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-09-23T10:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaign: getCampaign('11'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1008'),
    createdAt: '2025-09-24T11:00:00Z',
  },
  {
    userId: 'naver-2007',
    campaign: getCampaign('11'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2007'),
    createdAt: '2025-09-25T09:00:00Z',
  },

  // Campaign #12 신청 (2명)
  {
    userId: 'kakao-1009',
    campaign: getCampaign('12'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1009'),
    createdAt: '2025-09-18T10:00:00Z',
  },
  {
    userId: 'naver-2008',
    campaign: getCampaign('12'),
    status: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2008'),
    createdAt: '2025-09-19T11:00:00Z',
  },

  // 추가 신청 (Campaign #13, #14, #15)
  {
    userId: 'kakao-1002',
    campaign: getCampaign('13'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-09-08T10:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaign: getCampaign('14'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-09-03T10:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaign: getCampaign('15'),
    status: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-08-29T10:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaign: getCampaign('13'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-09-09T11:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaign: getCampaign('14'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    createdAt: '2025-09-04T11:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaign: getCampaign('15'),
    status: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-08-30T11:00:00Z',
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
