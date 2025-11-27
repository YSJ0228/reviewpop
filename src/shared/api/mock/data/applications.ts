/**
 * Mock 신청(Application) 데이터
 *
 * 사용자들의 체험 신청 내역을 관리합니다.
 * 총 50개의 신청 데이터로 다양한 상태를 시뮬레이션합니다.
 */

import type { Application } from '@entities/application';
import { mockUsers } from './users';

/**
 * 사용자 정보 헬퍼 함수
 */
function getUserInfo(userId: string) {
  const user = mockUsers.find((u) => u.id === userId);
  return {
    name: user?.name || '사용자',
    blogAddress: `https://blog.naver.com/${userId}`,
    phoneNumber: '010-1234-5678',
  };
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
    campaignId: '1',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    message: '스타벅스 커피를 정말 좋아합니다. 자세한 리뷰 작성하겠습니다!',
    createdAt: '2025-10-28T09:00:00Z',
    updatedAt: '2025-10-28T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaignId: '1',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    message: '커피 리뷰 경험이 많습니다.',
    createdAt: '2025-10-28T10:30:00Z',
    updatedAt: '2025-10-28T10:30:00Z',
  },
  {
    userId: 'kakao-1002',
    campaignId: '1',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    message: '인스타그램 팔로워 1500명 보유하고 있습니다.',
    createdAt: '2025-10-29T14:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaignId: '1',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-30T11:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaignId: '1',
    applicationStatus: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-10-29T08:00:00Z',
    updatedAt: '2025-10-31T09:00:00Z',
  },

  // Campaign #2 신청 (4명)
  {
    userId: 'kakao-1002',
    campaignId: '2',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    message: '뷰티 제품 리뷰를 꾸준히 작성하고 있습니다.',
    createdAt: '2025-10-25T15:00:00Z',
    updatedAt: '2025-10-25T15:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaignId: '2',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    message: '20대 여성 타겟 블로그 운영 중입니다.',
    createdAt: '2025-10-26T10:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaignId: '2',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2003'),
    createdAt: '2025-10-26T16:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaignId: '2',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1008'),
    createdAt: '2025-10-27T09:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },

  // Campaign #3 신청 (6명)
  {
    userId: 'naver-2001',
    campaignId: '3',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    message: '이어폰 리뷰 경험 많습니다.',
    createdAt: '2025-10-22T11:00:00Z',
    updatedAt: '2025-10-22T11:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaignId: '3',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-10-22T13:00:00Z',
    updatedAt: '2025-10-22T13:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaignId: '3',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2002'),
    message: '테크 유튜버입니다. 구독자 5000명 보유.',
    createdAt: '2025-10-23T10:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaignId: '3',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-10-23T14:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaignId: '3',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2004'),
    createdAt: '2025-10-24T08:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaignId: '3',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1007'),
    createdAt: '2025-10-24T11:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },

  // Campaign #4 신청 (5명)
  {
    userId: 'kakao-1001',
    campaignId: '4',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    message: '건강 관리에 관심이 많습니다.',
    createdAt: '2025-10-18T10:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaignId: '4',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2005'),
    createdAt: '2025-10-19T09:00:00Z',
    updatedAt: '2025-10-19T09:00:00Z',
  },
  {
    userId: 'kakao-1001',
    campaignId: '4',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-19T14:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaignId: '4',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-10-20T11:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaignId: '4',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2006'),
    createdAt: '2025-10-20T15:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },

  // Campaign #5 신청 (4명)
  {
    userId: 'kakao-1002',
    campaignId: '5',
    applicationStatus: 'pending',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    message: '애플 제품 애호가입니다. 상세한 리뷰 작성 가능합니다.',
    createdAt: '2025-10-13T10:00:00Z',
    updatedAt: '2025-10-13T10:00:00Z',
  },
  {
    userId: 'naver-2002',
    campaignId: '5',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2002'),
    message: '테크 유튜버. 영상 리뷰 가능합니다.',
    createdAt: '2025-10-14T09:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaignId: '5',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-10-15T11:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
  {
    userId: 'kakao-1009',
    campaignId: '5',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1009'),
    createdAt: '2025-10-16T08:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },

  // Campaign #6 신청 (3명)
  {
    userId: 'naver-2001',
    campaignId: '6',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-08T10:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaignId: '6',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    createdAt: '2025-10-09T11:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },
  {
    userId: 'naver-2003',
    campaignId: '6',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2003'),
    createdAt: '2025-10-09T14:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },

  // Campaign #7 신청 (4명)
  {
    userId: 'kakao-1001',
    campaignId: '7',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-04T09:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaignId: '7',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-04T14:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaignId: '7',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    userId: 'kakao-1007',
    campaignId: '7',
    applicationStatus: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1007'),
    createdAt: '2025-10-05T11:00:00Z',
    updatedAt: '2025-10-07T09:00:00Z',
  },

  // Campaign #8 신청 (3명)
  {
    userId: 'kakao-1002',
    campaignId: '8',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-10-03T10:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaignId: '8',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-10-03T13:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },
  {
    userId: 'naver-2004',
    campaignId: '8',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2004'),
    createdAt: '2025-10-04T11:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },

  // Campaign #9 신청 (2명)
  {
    userId: 'kakao-1001',
    campaignId: '9',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-10-02T10:00:00Z',
    updatedAt: '2025-10-13T09:00:00Z',
  },
  {
    userId: 'naver-2005',
    campaignId: '9',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2005'),
    createdAt: '2025-10-02T14:00:00Z',
    updatedAt: '2025-10-13T09:00:00Z',
  },

  // Campaign #10 신청 (3명)
  {
    userId: 'naver-2001',
    campaignId: '10',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-09-26T10:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },
  {
    userId: 'kakao-1006',
    campaignId: '10',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1006'),
    createdAt: '2025-09-27T11:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },
  {
    userId: 'naver-2006',
    campaignId: '10',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2006'),
    createdAt: '2025-09-28T09:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },

  // Campaign #11 신청 (3명)
  {
    userId: 'kakao-1001',
    campaignId: '11',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1001'),
    createdAt: '2025-09-23T10:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },
  {
    userId: 'kakao-1008',
    campaignId: '11',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1008'),
    createdAt: '2025-09-24T11:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },
  {
    userId: 'naver-2007',
    campaignId: '11',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2007'),
    createdAt: '2025-09-25T09:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },

  // Campaign #12 신청 (2명)
  {
    userId: 'kakao-1009',
    campaignId: '12',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1009'),
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-10-01T09:00:00Z',
  },
  {
    userId: 'naver-2008',
    campaignId: '12',
    applicationStatus: 'cancelled',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2008'),
    createdAt: '2025-09-19T11:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },

  // 추가 신청 (Campaign #13, #14, #15)
  {
    userId: 'kakao-1002',
    campaignId: '13',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-09-08T10:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },
  {
    userId: 'kakao-1002',
    campaignId: '14',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1002'),
    createdAt: '2025-09-03T10:00:00Z',
    updatedAt: '2025-09-15T09:00:00Z',
  },
  {
    userId: 'naver-2001',
    campaignId: '15',
    applicationStatus: 'selected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('naver-2001'),
    createdAt: '2025-08-29T10:00:00Z',
    updatedAt: '2025-09-10T09:00:00Z',
  },
  {
    userId: 'kakao-1003',
    campaignId: '13',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1003'),
    createdAt: '2025-09-09T11:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },
  {
    userId: 'kakao-1004',
    campaignId: '14',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1004'),
    createdAt: '2025-09-04T11:00:00Z',
    updatedAt: '2025-09-15T09:00:00Z',
  },
  {
    userId: 'kakao-1005',
    campaignId: '15',
    applicationStatus: 'rejected',
    reviewStatus: 'before',
    isReservated: false,
    ...getUserInfo('kakao-1005'),
    createdAt: '2025-08-30T11:00:00Z',
    updatedAt: '2025-09-10T09:00:00Z',
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
  return mockApplications.filter((app) => app.campaignId === campaignId);
}

/**
 * 상태별 신청 목록 조회
 */
export function getApplicationsByStatus(
  userId: string,
  status: Application['applicationStatus'],
): Application[] {
  return mockApplications.filter(
    (app) => app.userId === userId && app.applicationStatus === status,
  );
}

/**
 * 특정 사용자의 특정 체험 신청 찾기
 */
export function findApplicationByUserAndCampaign(
  userId: string,
  campaignId: string,
): Application | undefined {
  return mockApplications.find((app) => app.userId === userId && app.campaignId === campaignId);
}
