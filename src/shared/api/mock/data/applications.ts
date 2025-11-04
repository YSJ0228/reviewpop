/**
 * Mock 신청(Application) 데이터
 *
 * 사용자들의 캠페인 신청 내역을 관리합니다.
 * 총 50개의 신청 데이터로 다양한 상태를 시뮬레이션합니다.
 */

import type { Application } from '@entities/application';
import { mockUsers } from './users';

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
    id: 'app-001',
    userId: 'kakao-1001',
    campaignId: '1',
    status: 'pending',
    message: '스타벅스 커피를 정말 좋아합니다. 자세한 리뷰 작성하겠습니다!',
    snsAccount: '@hong_coffee_lover',
    appliedAt: '2025-10-28T09:00:00Z',
    createdAt: '2025-10-28T09:00:00Z',
    updatedAt: '2025-10-28T09:00:00Z',
  },
  {
    id: 'app-002',
    userId: 'kakao-1001',
    campaignId: '1',
    status: 'pending',
    message: '커피 리뷰 경험이 많습니다.',
    appliedAt: '2025-10-28T10:30:00Z',
    createdAt: '2025-10-28T10:30:00Z',
    updatedAt: '2025-10-28T10:30:00Z',
  },
  {
    id: 'app-003',
    userId: 'kakao-1002',
    campaignId: '1',
    status: 'selected',
    message: '인스타그램 팔로워 1500명 보유하고 있습니다.',
    snsAccount: '@jiyoung_daily',
    appliedAt: '2025-10-29T14:00:00Z',
    decidedAt: '2025-11-03T10:00:00Z',
    createdAt: '2025-10-29T14:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z',
  },
  {
    id: 'app-004',
    userId: 'naver-2001',
    campaignId: '1',
    status: 'rejected',
    appliedAt: '2025-10-30T11:00:00Z',
    decidedAt: '2025-11-03T10:00:00Z',
    createdAt: '2025-10-30T11:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z',
  },
  {
    id: 'app-005',
    userId: 'kakao-1006',
    campaignId: '1',
    status: 'cancelled',
    appliedAt: '2025-10-29T08:00:00Z',
    cancelledAt: '2025-10-31T09:00:00Z',
    createdAt: '2025-10-29T08:00:00Z',
    updatedAt: '2025-10-31T09:00:00Z',
  },

  // Campaign #2 신청 (4명)
  {
    id: 'app-006',
    userId: 'kakao-1002',
    campaignId: '2',
    status: 'pending',
    message: '뷰티 제품 리뷰를 꾸준히 작성하고 있습니다.',
    appliedAt: '2025-10-25T15:00:00Z',
    createdAt: '2025-10-25T15:00:00Z',
    updatedAt: '2025-10-25T15:00:00Z',
  },
  {
    id: 'app-007',
    userId: 'kakao-1004',
    campaignId: '2',
    status: 'selected',
    message: '20대 여성 타겟 블로그 운영 중입니다.',
    snsAccount: '@yuna_beauty',
    appliedAt: '2025-10-26T10:00:00Z',
    decidedAt: '2025-11-02T14:00:00Z',
    createdAt: '2025-10-26T10:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },
  {
    id: 'app-008',
    userId: 'naver-2003',
    campaignId: '2',
    status: 'selected',
    appliedAt: '2025-10-26T16:00:00Z',
    decidedAt: '2025-11-02T14:00:00Z',
    createdAt: '2025-10-26T16:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },
  {
    id: 'app-009',
    userId: 'kakao-1008',
    campaignId: '2',
    status: 'rejected',
    appliedAt: '2025-10-27T09:00:00Z',
    decidedAt: '2025-11-02T14:00:00Z',
    createdAt: '2025-10-27T09:00:00Z',
    updatedAt: '2025-11-02T14:00:00Z',
  },

  // Campaign #3 신청 (6명)
  {
    id: 'app-010',
    userId: 'naver-2001',
    campaignId: '3',
    status: 'pending',
    message: '이어폰 리뷰 경험 많습니다.',
    appliedAt: '2025-10-22T11:00:00Z',
    createdAt: '2025-10-22T11:00:00Z',
    updatedAt: '2025-10-22T11:00:00Z',
  },
  {
    id: 'app-011',
    userId: 'kakao-1003',
    campaignId: '3',
    status: 'pending',
    appliedAt: '2025-10-22T13:00:00Z',
    createdAt: '2025-10-22T13:00:00Z',
    updatedAt: '2025-10-22T13:00:00Z',
  },
  {
    id: 'app-012',
    userId: 'naver-2002',
    campaignId: '3',
    status: 'selected',
    message: '테크 유튜버입니다. 구독자 5000명 보유.',
    snsAccount: 'youtube.com/c/taeyang_tech',
    appliedAt: '2025-10-23T10:00:00Z',
    decidedAt: '2025-11-01T09:00:00Z',
    createdAt: '2025-10-23T10:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    id: 'app-013',
    userId: 'kakao-1005',
    campaignId: '3',
    status: 'selected',
    appliedAt: '2025-10-23T14:00:00Z',
    decidedAt: '2025-11-01T09:00:00Z',
    createdAt: '2025-10-23T14:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    id: 'app-014',
    userId: 'naver-2004',
    campaignId: '3',
    status: 'rejected',
    appliedAt: '2025-10-24T08:00:00Z',
    decidedAt: '2025-11-01T09:00:00Z',
    createdAt: '2025-10-24T08:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },
  {
    id: 'app-015',
    userId: 'kakao-1007',
    campaignId: '3',
    status: 'rejected',
    appliedAt: '2025-10-24T11:00:00Z',
    decidedAt: '2025-11-01T09:00:00Z',
    createdAt: '2025-10-24T11:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
  },

  // Campaign #4 신청 (5명)
  {
    id: 'app-016',
    userId: 'kakao-1001',
    campaignId: '4',
    status: 'pending',
    message: '건강 관리에 관심이 많습니다.',
    appliedAt: '2025-10-18T10:00:00Z',
    createdAt: '2025-10-18T10:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    id: 'app-017',
    userId: 'naver-2005',
    campaignId: '4',
    status: 'pending',
    appliedAt: '2025-10-19T09:00:00Z',
    createdAt: '2025-10-19T09:00:00Z',
    updatedAt: '2025-10-19T09:00:00Z',
  },
  {
    id: 'app-018',
    userId: 'kakao-1001',
    campaignId: '4',
    status: 'selected',
    appliedAt: '2025-10-19T14:00:00Z',
    decidedAt: '2025-10-29T10:00:00Z',
    createdAt: '2025-10-19T14:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    id: 'app-019',
    userId: 'kakao-1006',
    campaignId: '4',
    status: 'selected',
    appliedAt: '2025-10-20T11:00:00Z',
    decidedAt: '2025-10-29T10:00:00Z',
    createdAt: '2025-10-20T11:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    id: 'app-020',
    userId: 'naver-2006',
    campaignId: '4',
    status: 'rejected',
    appliedAt: '2025-10-20T15:00:00Z',
    decidedAt: '2025-10-29T10:00:00Z',
    createdAt: '2025-10-20T15:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },

  // Campaign #5 신청 (4명)
  {
    id: 'app-021',
    userId: 'kakao-1002',
    campaignId: '5',
    status: 'pending',
    message: '애플 제품 애호가입니다. 상세한 리뷰 작성 가능합니다.',
    appliedAt: '2025-10-13T10:00:00Z',
    createdAt: '2025-10-13T10:00:00Z',
    updatedAt: '2025-10-13T10:00:00Z',
  },
  {
    id: 'app-022',
    userId: 'naver-2002',
    campaignId: '5',
    status: 'selected',
    message: '테크 유튜버. 영상 리뷰 가능합니다.',
    snsAccount: 'youtube.com/c/taeyang_tech',
    appliedAt: '2025-10-14T09:00:00Z',
    decidedAt: '2025-10-28T14:00:00Z',
    createdAt: '2025-10-14T09:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
  {
    id: 'app-023',
    userId: 'kakao-1003',
    campaignId: '5',
    status: 'rejected',
    appliedAt: '2025-10-15T11:00:00Z',
    decidedAt: '2025-10-28T14:00:00Z',
    createdAt: '2025-10-15T11:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
  {
    id: 'app-024',
    userId: 'kakao-1009',
    campaignId: '5',
    status: 'rejected',
    appliedAt: '2025-10-16T08:00:00Z',
    decidedAt: '2025-10-28T14:00:00Z',
    createdAt: '2025-10-16T08:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },

  // Campaign #6 신청 (3명)
  {
    id: 'app-025',
    userId: 'naver-2001',
    campaignId: '6',
    status: 'selected',
    appliedAt: '2025-10-08T10:00:00Z',
    decidedAt: '2025-10-20T09:00:00Z',
    createdAt: '2025-10-08T10:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },
  {
    id: 'app-026',
    userId: 'kakao-1004',
    campaignId: '6',
    status: 'selected',
    appliedAt: '2025-10-09T11:00:00Z',
    decidedAt: '2025-10-20T09:00:00Z',
    createdAt: '2025-10-09T11:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },
  {
    id: 'app-027',
    userId: 'naver-2003',
    campaignId: '6',
    status: 'rejected',
    appliedAt: '2025-10-09T14:00:00Z',
    decidedAt: '2025-10-20T09:00:00Z',
    createdAt: '2025-10-09T14:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z',
  },

  // Campaign #7 신청 (4명)
  {
    id: 'app-028',
    userId: 'kakao-1001',
    campaignId: '7',
    status: 'selected',
    appliedAt: '2025-10-04T09:00:00Z',
    decidedAt: '2025-10-18T10:00:00Z',
    createdAt: '2025-10-04T09:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    id: 'app-029',
    userId: 'kakao-1002',
    campaignId: '7',
    status: 'selected',
    appliedAt: '2025-10-04T14:00:00Z',
    decidedAt: '2025-10-18T10:00:00Z',
    createdAt: '2025-10-04T14:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    id: 'app-030',
    userId: 'naver-2001',
    campaignId: '7',
    status: 'rejected',
    appliedAt: '2025-10-05T10:00:00Z',
    decidedAt: '2025-10-18T10:00:00Z',
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
  },
  {
    id: 'app-031',
    userId: 'kakao-1007',
    campaignId: '7',
    status: 'cancelled',
    appliedAt: '2025-10-05T11:00:00Z',
    cancelledAt: '2025-10-07T09:00:00Z',
    createdAt: '2025-10-05T11:00:00Z',
    updatedAt: '2025-10-07T09:00:00Z',
  },

  // Campaign #8 신청 (3명)
  {
    id: 'app-032',
    userId: 'kakao-1002',
    campaignId: '8',
    status: 'selected',
    appliedAt: '2025-10-03T10:00:00Z',
    decidedAt: '2025-10-15T14:00:00Z',
    createdAt: '2025-10-03T10:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },
  {
    id: 'app-033',
    userId: 'kakao-1005',
    campaignId: '8',
    status: 'selected',
    appliedAt: '2025-10-03T13:00:00Z',
    decidedAt: '2025-10-15T14:00:00Z',
    createdAt: '2025-10-03T13:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },
  {
    id: 'app-034',
    userId: 'naver-2004',
    campaignId: '8',
    status: 'rejected',
    appliedAt: '2025-10-04T11:00:00Z',
    decidedAt: '2025-10-15T14:00:00Z',
    createdAt: '2025-10-04T11:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },

  // Campaign #9 신청 (2명)
  {
    id: 'app-035',
    userId: 'kakao-1001',
    campaignId: '9',
    status: 'selected',
    appliedAt: '2025-10-02T10:00:00Z',
    decidedAt: '2025-10-13T09:00:00Z',
    createdAt: '2025-10-02T10:00:00Z',
    updatedAt: '2025-10-13T09:00:00Z',
  },
  {
    id: 'app-036',
    userId: 'naver-2005',
    campaignId: '9',
    status: 'rejected',
    appliedAt: '2025-10-02T14:00:00Z',
    decidedAt: '2025-10-13T09:00:00Z',
    createdAt: '2025-10-02T14:00:00Z',
    updatedAt: '2025-10-13T09:00:00Z',
  },

  // Campaign #10 신청 (3명)
  {
    id: 'app-037',
    userId: 'naver-2001',
    campaignId: '10',
    status: 'selected',
    appliedAt: '2025-09-26T10:00:00Z',
    decidedAt: '2025-10-08T09:00:00Z',
    createdAt: '2025-09-26T10:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },
  {
    id: 'app-038',
    userId: 'kakao-1006',
    campaignId: '10',
    status: 'selected',
    appliedAt: '2025-09-27T11:00:00Z',
    decidedAt: '2025-10-08T09:00:00Z',
    createdAt: '2025-09-27T11:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },
  {
    id: 'app-039',
    userId: 'naver-2006',
    campaignId: '10',
    status: 'rejected',
    appliedAt: '2025-09-28T09:00:00Z',
    decidedAt: '2025-10-08T09:00:00Z',
    createdAt: '2025-09-28T09:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },

  // Campaign #11 신청 (3명)
  {
    id: 'app-040',
    userId: 'kakao-1001',
    campaignId: '11',
    status: 'selected',
    appliedAt: '2025-09-23T10:00:00Z',
    decidedAt: '2025-10-05T09:00:00Z',
    createdAt: '2025-09-23T10:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },
  {
    id: 'app-041',
    userId: 'kakao-1008',
    campaignId: '11',
    status: 'selected',
    appliedAt: '2025-09-24T11:00:00Z',
    decidedAt: '2025-10-05T09:00:00Z',
    createdAt: '2025-09-24T11:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },
  {
    id: 'app-042',
    userId: 'naver-2007',
    campaignId: '11',
    status: 'rejected',
    appliedAt: '2025-09-25T09:00:00Z',
    decidedAt: '2025-10-05T09:00:00Z',
    createdAt: '2025-09-25T09:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },

  // Campaign #12 신청 (2명)
  {
    id: 'app-043',
    userId: 'kakao-1009',
    campaignId: '12',
    status: 'selected',
    appliedAt: '2025-09-18T10:00:00Z',
    decidedAt: '2025-10-01T09:00:00Z',
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-10-01T09:00:00Z',
  },
  {
    id: 'app-044',
    userId: 'naver-2008',
    campaignId: '12',
    status: 'cancelled',
    appliedAt: '2025-09-19T11:00:00Z',
    cancelledAt: '2025-09-20T09:00:00Z',
    createdAt: '2025-09-19T11:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },

  // 추가 신청 (Campaign #13, #14, #15)
  {
    id: 'app-045',
    userId: 'kakao-1002',
    campaignId: '13',
    status: 'selected',
    appliedAt: '2025-09-08T10:00:00Z',
    decidedAt: '2025-09-20T09:00:00Z',
    createdAt: '2025-09-08T10:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },
  {
    id: 'app-046',
    userId: 'kakao-1002',
    campaignId: '14',
    status: 'selected',
    appliedAt: '2025-09-03T10:00:00Z',
    decidedAt: '2025-09-15T09:00:00Z',
    createdAt: '2025-09-03T10:00:00Z',
    updatedAt: '2025-09-15T09:00:00Z',
  },
  {
    id: 'app-047',
    userId: 'naver-2001',
    campaignId: '15',
    status: 'selected',
    appliedAt: '2025-08-29T10:00:00Z',
    decidedAt: '2025-09-10T09:00:00Z',
    createdAt: '2025-08-29T10:00:00Z',
    updatedAt: '2025-09-10T09:00:00Z',
  },
  {
    id: 'app-048',
    userId: 'kakao-1003',
    campaignId: '13',
    status: 'rejected',
    appliedAt: '2025-09-09T11:00:00Z',
    decidedAt: '2025-09-20T09:00:00Z',
    createdAt: '2025-09-09T11:00:00Z',
    updatedAt: '2025-09-20T09:00:00Z',
  },
  {
    id: 'app-049',
    userId: 'kakao-1004',
    campaignId: '14',
    status: 'rejected',
    appliedAt: '2025-09-04T11:00:00Z',
    decidedAt: '2025-09-15T09:00:00Z',
    createdAt: '2025-09-04T11:00:00Z',
    updatedAt: '2025-09-15T09:00:00Z',
  },
  {
    id: 'app-050',
    userId: 'kakao-1005',
    campaignId: '15',
    status: 'rejected',
    appliedAt: '2025-08-30T11:00:00Z',
    decidedAt: '2025-09-10T09:00:00Z',
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
 * 캠페인별 신청 목록 조회
 */
export function getApplicationsByCampaignId(campaignId: string): Application[] {
  return mockApplications.filter((app) => app.campaignId === campaignId);
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
 * Application ID로 찾기
 */
export function findApplicationById(id: string): Application | undefined {
  return mockApplications.find((app) => app.id === id);
}

/**
 * 특정 사용자의 특정 캠페인 신청 찾기
 */
export function findApplicationByUserAndCampaign(
  userId: string,
  campaignId: string,
): Application | undefined {
  return mockApplications.find((app) => app.userId === userId && app.campaignId === campaignId);
}
