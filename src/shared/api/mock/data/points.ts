/**
 * Mock 포인트 거래 내역 데이터
 *
 * 사용자들의 포인트 적립/사용 내역을 관리합니다.
 * 캠페인 신청, 리뷰 작성 등의 활동에 따라 포인트가 변동됩니다.
 */

import type { PointTransaction, PointSummary } from '@entities/user';

/**
 * 포인트 거래 내역 Mock 데이터
 *
 * 거래 유형별 분포:
 * - earn (적립): 캠페인 신청, 리뷰 작성, 이벤트 등
 * - spend (사용): 아직 사용 기능 없음 (추후 구현)
 * - expire (만료): 기간 만료
 */
export const mockPointTransactions: PointTransaction[] = [
  // kakao-1001 (박민수) 포인트 내역
  {
    id: 'pt-001',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1000,
    reason: 'campaign_application',
    description: '신제품 커피 체험단 모집 캠페인 신청',
    campaignId: '1',
    balance: 1000,
    expiresAt: '2026-10-28T09:00:00Z',
    transactedAt: '2025-10-28T09:00:00Z',
    createdAt: '2025-10-28T09:00:00Z',
  },
  {
    id: 'pt-002',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 800,
    reason: 'campaign_application',
    description: '건강 보조 식품 체험단 캠페인 신청',
    campaignId: '4',
    balance: 1800,
    expiresAt: '2026-10-18T10:00:00Z',
    transactedAt: '2025-10-18T10:00:00Z',
    createdAt: '2025-10-18T10:00:00Z',
  },
  {
    id: 'pt-003',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 900,
    reason: 'campaign_application',
    description: '프리미엄 쌀 체험단 캠페인 신청',
    campaignId: '7',
    balance: 2700,
    expiresAt: '2026-10-04T09:00:00Z',
    transactedAt: '2025-10-04T09:00:00Z',
    createdAt: '2025-10-04T09:00:00Z',
  },
  {
    id: 'pt-004',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1500,
    reason: 'review_photo',
    description: '조말론 향수 리뷰 작성 (사진 포함)',
    campaignId: '14',
    balance: 4200,
    expiresAt: '2026-09-24T14:15:00Z',
    transactedAt: '2025-09-24T14:15:00Z',
    createdAt: '2025-09-24T14:15:00Z',
  },
  {
    id: 'pt-005',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 2000,
    reason: 'review_photo',
    description: '아모레 샴푸 리뷰 작성 (사진 포함)',
    campaignId: '11',
    balance: 6200,
    expiresAt: '2026-10-13T10:30:00Z',
    transactedAt: '2025-10-13T10:30:00Z',
    createdAt: '2025-10-13T10:30:00Z',
  },
  {
    id: 'pt-006',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1000,
    reason: 'campaign_application',
    description: '신제품 샴푸 리뷰어 캠페인 신청',
    campaignId: '11',
    balance: 7200,
    expiresAt: '2026-09-23T10:00:00Z',
    transactedAt: '2025-09-23T10:00:00Z',
    createdAt: '2025-09-23T10:00:00Z',
  },

  // kakao-1002 (최지영) 포인트 내역
  {
    id: 'pt-007',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 1500,
    reason: 'campaign_application',
    description: '프리미엄 화장품 리뷰어 모집 캠페인 신청',
    campaignId: '2',
    balance: 1500,
    expiresAt: '2026-10-25T15:00:00Z',
    transactedAt: '2025-10-25T15:00:00Z',
    createdAt: '2025-10-25T15:00:00Z',
  },
  {
    id: 'pt-008',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 3000,
    reason: 'campaign_application',
    description: '스마트워치 리뷰어 캠페인 신청',
    campaignId: '5',
    balance: 4500,
    expiresAt: '2026-10-13T10:00:00Z',
    transactedAt: '2025-10-13T10:00:00Z',
    createdAt: '2025-10-13T10:00:00Z',
  },
  {
    id: 'pt-009',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 2500,
    reason: 'campaign_application',
    description: '나이키 운동화 리뷰어 캠페인 신청',
    campaignId: '8',
    balance: 7000,
    expiresAt: '2026-10-03T10:00:00Z',
    transactedAt: '2025-10-03T10:00:00Z',
    createdAt: '2025-10-03T10:00:00Z',
  },
  {
    id: 'pt-010',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 2000,
    reason: 'review_photo',
    description: '페레로로쉐 초콜릿 리뷰 작성 (사진 포함)',
    campaignId: '13',
    balance: 9000,
    expiresAt: '2026-09-28T14:30:00Z',
    transactedAt: '2025-09-28T14:30:00Z',
    createdAt: '2025-09-28T14:30:00Z',
  },
  {
    id: 'pt-011',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 3000,
    reason: 'review_photo',
    description: '나이키 신상 운동화 리뷰 작성 (사진 포함)',
    campaignId: '8',
    balance: 12000,
    expiresAt: '2026-10-24T11:30:00Z',
    transactedAt: '2025-10-24T11:30:00Z',
    createdAt: '2025-10-24T11:30:00Z',
  },

  // naver-2001 (한소라) 포인트 내역
  {
    id: 'pt-012',
    userId: 'naver-2001',
    type: 'earn',
    amount: 2000,
    reason: 'campaign_application',
    description: '무선 이어폰 체험단 캠페인 신청',
    campaignId: '3',
    balance: 2000,
    expiresAt: '2026-10-22T11:00:00Z',
    transactedAt: '2025-10-22T11:00:00Z',
    createdAt: '2025-10-22T11:00:00Z',
  },
  {
    id: 'pt-013',
    userId: 'naver-2001',
    type: 'earn',
    amount: 1200,
    reason: 'campaign_application',
    description: '유기농 화장품 체험단 캠페인 신청',
    campaignId: '6',
    balance: 3200,
    expiresAt: '2026-10-08T10:00:00Z',
    transactedAt: '2025-10-08T10:00:00Z',
    createdAt: '2025-10-08T10:00:00Z',
  },
  {
    id: 'pt-014',
    userId: 'naver-2001',
    type: 'earn',
    amount: 700,
    reason: 'campaign_application',
    description: '프리미엄 요거트 체험단 캠페인 신청',
    campaignId: '10',
    balance: 3900,
    expiresAt: '2026-09-26T10:00:00Z',
    transactedAt: '2025-09-26T10:00:00Z',
    createdAt: '2025-09-26T10:00:00Z',
  },
  {
    id: 'pt-015',
    userId: 'naver-2001',
    type: 'earn',
    amount: 1500,
    reason: 'review_photo',
    description: '카카오프렌즈 케이스 리뷰 작성 (사진 포함)',
    campaignId: '15',
    balance: 5400,
    expiresAt: '2026-09-19T14:20:00Z',
    transactedAt: '2025-09-19T14:20:00Z',
    createdAt: '2025-09-19T14:20:00Z',
  },
  {
    id: 'pt-016',
    userId: 'naver-2001',
    type: 'earn',
    amount: 2000,
    reason: 'review_photo',
    description: '빙그레 요거트 리뷰 작성 (사진 포함)',
    campaignId: '10',
    balance: 7400,
    expiresAt: '2026-10-16T10:20:00Z',
    transactedAt: '2025-10-16T10:20:00Z',
    createdAt: '2025-10-16T10:20:00Z',
  },
  {
    id: 'pt-017',
    userId: 'naver-2001',
    type: 'earn',
    amount: 2500,
    reason: 'review_photo',
    description: '이니스프리 화장품 리뷰 작성 (사진 포함)',
    campaignId: '6',
    balance: 9900,
    expiresAt: '2026-10-29T10:30:00Z',
    transactedAt: '2025-10-29T10:30:00Z',
    createdAt: '2025-10-29T10:30:00Z',
  },

  // kakao-1001 (박민수) 포인트 내역
  {
    id: 'pt-018',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1000,
    reason: 'campaign_application',
    description: '신제품 커피 체험단 모집 캠페인 신청',
    campaignId: '1',
    balance: 1000,
    expiresAt: '2026-10-28T10:30:00Z',
    transactedAt: '2025-10-28T10:30:00Z',
    createdAt: '2025-10-28T10:30:00Z',
  },
  {
    id: 'pt-019',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 800,
    reason: 'campaign_application',
    description: '건강 보조 식품 체험단 캠페인 신청',
    campaignId: '4',
    balance: 1800,
    expiresAt: '2026-10-19T14:00:00Z',
    transactedAt: '2025-10-19T14:00:00Z',
    createdAt: '2025-10-19T14:00:00Z',
  },
  {
    id: 'pt-020',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1800,
    reason: 'campaign_application',
    description: '스마트 홈 기기 체험단 캠페인 신청',
    campaignId: '9',
    balance: 3600,
    expiresAt: '2026-10-02T10:00:00Z',
    transactedAt: '2025-10-02T10:00:00Z',
    createdAt: '2025-10-02T10:00:00Z',
  },
  {
    id: 'pt-021',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1500,
    reason: 'review_photo',
    description: '페레로로쉐 초콜릿 리뷰 작성 (사진 포함)',
    campaignId: '13',
    balance: 5100,
    expiresAt: '2026-09-29T10:15:00Z',
    transactedAt: '2025-09-29T10:15:00Z',
    createdAt: '2025-09-29T10:15:00Z',
  },
  {
    id: 'pt-022',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 2000,
    reason: 'review_photo',
    description: 'LG 스마트 홈 리뷰 작성 (사진 포함)',
    campaignId: '9',
    balance: 7100,
    expiresAt: '2026-10-21T10:30:00Z',
    transactedAt: '2025-10-21T10:30:00Z',
    createdAt: '2025-10-21T10:30:00Z',
  },
  {
    id: 'pt-023',
    userId: 'kakao-1001',
    type: 'earn',
    amount: 1200,
    reason: 'review_write',
    description: '카카오프렌즈 케이스 리뷰 작성',
    campaignId: '15',
    balance: 8300,
    expiresAt: '2026-09-20T09:45:00Z',
    transactedAt: '2025-09-20T09:45:00Z',
    createdAt: '2025-09-20T09:45:00Z',
  },

  // kakao-1002 (최지영) 포인트 내역
  {
    id: 'pt-024',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 1000,
    reason: 'campaign_application',
    description: '신제품 커피 체험단 모집 캠페인 신청',
    campaignId: '1',
    balance: 1000,
    expiresAt: '2026-10-29T14:00:00Z',
    transactedAt: '2025-10-29T14:00:00Z',
    createdAt: '2025-10-29T14:00:00Z',
  },
  {
    id: 'pt-025',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 900,
    reason: 'campaign_application',
    description: '프리미엄 쌀 체험단 캠페인 신청',
    campaignId: '7',
    balance: 1900,
    expiresAt: '2026-10-04T14:00:00Z',
    transactedAt: '2025-10-04T14:00:00Z',
    createdAt: '2025-10-04T14:00:00Z',
  },
  {
    id: 'pt-026',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 1500,
    reason: 'review_write',
    description: '페레로로쉐 초콜릿 리뷰 작성',
    campaignId: '13',
    balance: 3400,
    expiresAt: '2026-09-29T15:20:00Z',
    transactedAt: '2025-09-29T15:20:00Z',
    createdAt: '2025-09-29T15:20:00Z',
  },
  {
    id: 'pt-027',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 3000,
    reason: 'review_photo',
    description: '조말론 향수 리뷰 작성 (사진 포함)',
    campaignId: '14',
    balance: 6400,
    expiresAt: '2026-09-23T10:30:00Z',
    transactedAt: '2025-09-23T10:30:00Z',
    createdAt: '2025-09-23T10:30:00Z',
  },
  {
    id: 'pt-028',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 1500,
    reason: 'review_write',
    description: '빙그레 요거트 리뷰 작성',
    campaignId: '10',
    balance: 7900,
    expiresAt: '2026-10-18T11:30:00Z',
    transactedAt: '2025-10-18T11:30:00Z',
    createdAt: '2025-10-18T11:30:00Z',
  },
  {
    id: 'pt-029',
    userId: 'kakao-1002',
    type: 'earn',
    amount: 2000,
    reason: 'review_write',
    description: '이니스프리 화장품 리뷰 작성',
    campaignId: '6',
    balance: 9900,
    expiresAt: '2026-10-31T09:45:00Z',
    transactedAt: '2025-10-31T09:45:00Z',
    createdAt: '2025-10-31T09:45:00Z',
  },

  // 기타 사용자들 포인트 내역 샘플
  {
    id: 'pt-030',
    userId: 'kakao-1004',
    type: 'earn',
    amount: 1500,
    reason: 'campaign_application',
    description: '프리미엄 화장품 리뷰어 모집 캠페인 신청',
    campaignId: '2',
    balance: 1500,
    expiresAt: '2026-10-26T10:00:00Z',
    transactedAt: '2025-10-26T10:00:00Z',
    createdAt: '2025-10-26T10:00:00Z',
  },
  {
    id: 'pt-031',
    userId: 'kakao-1004',
    type: 'earn',
    amount: 2500,
    reason: 'review_photo',
    description: '이니스프리 화장품 리뷰 작성 (사진 포함)',
    campaignId: '6',
    balance: 4000,
    expiresAt: '2026-10-30T14:15:00Z',
    transactedAt: '2025-10-30T14:15:00Z',
    createdAt: '2025-10-30T14:15:00Z',
  },

  {
    id: 'pt-032',
    userId: 'naver-2002',
    type: 'earn',
    amount: 2000,
    reason: 'campaign_application',
    description: '무선 이어폰 체험단 캠페인 신청',
    campaignId: '3',
    balance: 2000,
    expiresAt: '2026-10-23T10:00:00Z',
    transactedAt: '2025-10-23T10:00:00Z',
    createdAt: '2025-10-23T10:00:00Z',
  },
  {
    id: 'pt-033',
    userId: 'naver-2002',
    type: 'earn',
    amount: 3000,
    reason: 'campaign_application',
    description: '스마트워치 리뷰어 캠페인 신청',
    campaignId: '5',
    balance: 5000,
    expiresAt: '2026-10-14T09:00:00Z',
    transactedAt: '2025-10-14T09:00:00Z',
    createdAt: '2025-10-14T09:00:00Z',
  },
  {
    id: 'pt-034',
    userId: 'naver-2002',
    type: 'earn',
    amount: 2500,
    reason: 'review_photo',
    description: '조말론 향수 리뷰 작성 (사진 포함)',
    campaignId: '14',
    balance: 7500,
    expiresAt: '2026-09-25T09:45:00Z',
    transactedAt: '2025-09-25T09:45:00Z',
    createdAt: '2025-09-25T09:45:00Z',
  },
  {
    id: 'pt-035',
    userId: 'naver-2002',
    type: 'earn',
    amount: 2000,
    reason: 'review_photo',
    description: 'LG 스마트 홈 리뷰 작성 (사진 포함)',
    campaignId: '9',
    balance: 9500,
    expiresAt: '2026-10-22T14:15:00Z',
    transactedAt: '2025-10-22T14:15:00Z',
    createdAt: '2025-10-22T14:15:00Z',
  },
];

/**
 * 사용자별 포인트 거래 내역 조회
 */
export function getPointTransactionsByUserId(userId: string): PointTransaction[] {
  return mockPointTransactions
    .filter((pt) => pt.userId === userId)
    .sort((a, b) => {
      return new Date(b.transactedAt).getTime() - new Date(a.transactedAt).getTime();
    });
}

/**
 * 사용자별 포인트 요약 정보 계산
 */
export function getPointSummaryByUserId(userId: string): PointSummary {
  const transactions = getPointTransactionsByUserId(userId);

  // 총 포인트 계산
  const totalPoints = transactions.reduce((sum, pt) => {
    if (pt.type === 'earn' || pt.type === 'refund') {
      return sum + pt.amount;
    } else if (pt.type === 'spend') {
      return sum - pt.amount;
    }
    return sum;
  }, 0);

  // 곧 만료될 포인트 (30일 이내)
  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expiringPoints = transactions
    .filter((pt) => {
      if (!pt.expiresAt) return false;
      const expiresAt = new Date(pt.expiresAt);
      return expiresAt > now && expiresAt <= thirtyDaysLater;
    })
    .reduce((sum, pt) => sum + pt.amount, 0);

  return {
    userId,
    totalPoints,
    availablePoints: totalPoints,
    expiringPoints,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 캠페인별 포인트 거래 내역 조회
 */
export function getPointTransactionsByCampaignId(campaignId: string): PointTransaction[] {
  return mockPointTransactions
    .filter((pt) => pt.campaignId === campaignId)
    .sort((a, b) => {
      return new Date(b.transactedAt).getTime() - new Date(a.transactedAt).getTime();
    });
}
