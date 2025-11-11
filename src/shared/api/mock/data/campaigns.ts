/**
 * Mock 캠페인 데이터
 *
 * 기본 캠페인 엔티티 데이터를 관리합니다.
 * 총 15개의 캠페인 데이터로 다양한 상태와 카테고리를 시뮬레이션합니다.
 */

import type {
  Campaign,
  CampaignStatus,
  CampaignCategory,
} from '@entities/campaign/types/campaign.types';

/**
 * Campaign mock 데이터
 *
 * 상태 분포:
 * - active (진행 중): 5개
 * - closed (마감): 10개
 */
export const mockCampaigns: Campaign[] = [
  // Active 캠페인 (5개)
  {
    id: '1',
    title: '신제품 커피 체험단 모집',
    brand: '스타벅스',
    description:
      '스타벅스의 신제품 커피를 가장 먼저 체험해보세요! 프리미엄 원두를 사용한 특별한 블렌드로, 부드러운 맛과 풍부한 향이 특징입니다.',
    category: 'food' as CampaignCategory,
    status: 'active' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign1/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign1/800/600',
      'https://picsum.photos/seed/campaign1-2/800/600',
    ],
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    applicationDeadline: '2025-11-15T23:59:59Z',
    reviewDeadline: '2025-12-07T23:59:59Z',
    maxRecruitment: 50,
    currentRecruitment: 47,
    selectedCount: 0,
    points: 1000,
    createdAt: '2025-10-25T00:00:00Z',
  },
  {
    id: '2',
    title: '프리미엄 화장품 리뷰어 모집',
    brand: '설화수',
    description:
      '설화수의 프리미엄 화장품 라인을 체험할 수 있는 특별한 기회! 한방 성분이 함유된 고급 스킨케어 제품으로 피부 본연의 아름다움을 찾아보세요.',
    category: 'beauty' as CampaignCategory,
    status: 'active' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign2/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign2/800/600',
      'https://picsum.photos/seed/campaign2-2/800/600',
    ],
    startDate: '2025-10-28T00:00:00Z',
    endDate: '2025-11-27T23:59:59Z',
    applicationDeadline: '2025-11-10T23:59:59Z',
    reviewDeadline: '2025-12-04T23:59:59Z',
    maxRecruitment: 30,
    currentRecruitment: 28,
    selectedCount: 0,
    points: 1500,
    createdAt: '2025-10-22T00:00:00Z',
  },
  {
    id: '3',
    title: '무선 이어폰 체험단',
    brand: '삼성전자',
    description:
      '삼성전자의 최신 무선 이어폰을 체험해보세요. 탁월한 노이즈 캔슬링 기능과 고음질 사운드로 최상의 청음 경험을 제공합니다.',
    category: 'electronics' as CampaignCategory,
    status: 'active' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign3/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign3/800/600',
      'https://picsum.photos/seed/campaign3-2/800/600',
    ],
    startDate: '2025-10-25T00:00:00Z',
    endDate: '2025-11-24T23:59:59Z',
    applicationDeadline: '2025-11-08T23:59:59Z',
    reviewDeadline: '2025-12-01T23:59:59Z',
    maxRecruitment: 40,
    currentRecruitment: 35,
    selectedCount: 0,
    points: 2000,
    createdAt: '2025-10-19T00:00:00Z',
  },
  {
    id: '4',
    title: '건강 보조 식품 체험단',
    brand: '종근당',
    description:
      '종근당의 건강 보조 식품으로 활력 넘치는 하루를 시작하세요. 비타민과 미네랄이 풍부하게 함유된 프리미엄 건강식품입니다.',
    category: 'health' as CampaignCategory,
    status: 'active' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign4/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign4/800/600',
      'https://picsum.photos/seed/campaign4-2/800/600',
    ],
    startDate: '2025-10-20T00:00:00Z',
    endDate: '2025-11-19T23:59:59Z',
    applicationDeadline: '2025-11-05T23:59:59Z',
    reviewDeadline: '2025-11-26T23:59:59Z',
    maxRecruitment: 80,
    currentRecruitment: 58,
    selectedCount: 0,
    points: 800,
    createdAt: '2025-10-14T00:00:00Z',
  },
  {
    id: '5',
    title: '신규 스마트워치 리뷰어',
    brand: '애플',
    description:
      '애플의 최신 스마트워치를 가장 먼저 체험해보세요. 건강 관리부터 스마트한 일상까지, 손목 위의 작은 혁신을 경험하세요.',
    category: 'electronics' as CampaignCategory,
    status: 'active' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign5/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign5/800/600',
      'https://picsum.photos/seed/campaign5-2/800/600',
    ],
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-11-14T23:59:59Z',
    applicationDeadline: '2025-11-01T23:59:59Z',
    reviewDeadline: '2025-11-21T23:59:59Z',
    maxRecruitment: 20,
    currentRecruitment: 19,
    selectedCount: 0,
    points: 3000,
    createdAt: '2025-10-09T00:00:00Z',
  },

  // Closed 캠페인 (10개) - 신청 마감되고 선정 완료
  {
    id: '6',
    title: '유기농 화장품 체험단',
    brand: '이니스프리',
    description:
      '이니스프리의 유기농 화장품으로 자연의 건강함을 피부에 전하세요. 제주 청정 자연에서 얻은 원료로 만든 순한 화장품입니다.',
    category: 'beauty' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign6/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign6/800/600',
      'https://picsum.photos/seed/campaign6-2/800/600',
    ],
    startDate: '2025-10-10T00:00:00Z',
    endDate: '2025-11-09T23:59:59Z',
    applicationDeadline: '2025-10-25T23:59:59Z',
    reviewDeadline: '2025-11-16T23:59:59Z',
    maxRecruitment: 30,
    currentRecruitment: 25,
    selectedCount: 2,
    points: 1200,
    createdAt: '2025-10-04T00:00:00Z',
  },
  {
    id: '7',
    title: '프리미엄 쌀 체험단',
    brand: 'CJ제일제당',
    description:
      'CJ제일제당의 프리미엄 쌀로 건강한 한 끼를 준비하세요. 국내산 최고급 쌀로 지은 밥의 차이를 느껴보세요.',
    category: 'food' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign7/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign7/800/600',
      'https://picsum.photos/seed/campaign7-2/800/600',
    ],
    startDate: '2025-10-08T00:00:00Z',
    endDate: '2025-11-07T23:59:59Z',
    applicationDeadline: '2025-10-22T23:59:59Z',
    reviewDeadline: '2025-11-14T23:59:59Z',
    maxRecruitment: 50,
    currentRecruitment: 42,
    selectedCount: 2,
    points: 900,
    createdAt: '2025-10-02T00:00:00Z',
  },
  {
    id: '8',
    title: '신상 운동화 리뷰어',
    brand: '나이키',
    description:
      '나이키의 신상 운동화로 스타일과 퍼포먼스를 동시에 잡으세요. 최신 쿠셔닝 기술이 적용된 프리미엄 러닝화입니다.',
    category: 'fashion' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign8/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign8/800/600',
      'https://picsum.photos/seed/campaign8-2/800/600',
    ],
    startDate: '2025-10-05T00:00:00Z',
    endDate: '2025-11-04T23:59:59Z',
    applicationDeadline: '2025-10-20T23:59:59Z',
    reviewDeadline: '2025-11-11T23:59:59Z',
    maxRecruitment: 30,
    currentRecruitment: 27,
    selectedCount: 2,
    points: 2500,
    createdAt: '2025-09-29T00:00:00Z',
  },
  {
    id: '9',
    title: '스마트 홈 기기 체험단',
    brand: 'LG전자',
    description:
      'LG전자의 스마트 홈 기기로 집안을 더욱 편리하게 만드세요. IoT 기술이 적용된 차세대 홈 솔루션을 경험해보세요.',
    category: 'electronics' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign9/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign9/800/600',
      'https://picsum.photos/seed/campaign9-2/800/600',
    ],
    startDate: '2025-10-03T00:00:00Z',
    endDate: '2025-11-02T23:59:59Z',
    applicationDeadline: '2025-10-18T23:59:59Z',
    reviewDeadline: '2025-11-09T23:59:59Z',
    maxRecruitment: 20,
    currentRecruitment: 15,
    selectedCount: 1,
    points: 1800,
    createdAt: '2025-09-27T00:00:00Z',
  },
  {
    id: '10',
    title: '프리미엄 요거트 체험단',
    brand: '빙그레',
    description:
      '빙그레의 프리미엄 요거트로 건강한 아침을 시작하세요. 100% 국내산 원유로 만든 신선하고 진한 요거트입니다.',
    category: 'food' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign10/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign10/800/600',
      'https://picsum.photos/seed/campaign10-2/800/600',
    ],
    startDate: '2025-09-28T00:00:00Z',
    endDate: '2025-10-28T23:59:59Z',
    applicationDeadline: '2025-10-12T23:59:59Z',
    reviewDeadline: '2025-11-04T23:59:59Z',
    maxRecruitment: 100,
    currentRecruitment: 65,
    selectedCount: 2,
    points: 700,
    createdAt: '2025-09-22T00:00:00Z',
  },
  {
    id: '11',
    title: '신제품 샴푸 리뷰어',
    brand: '아모레퍼시픽',
    description:
      '아모레퍼시픽의 신제품 샴푸로 건강한 모발을 가꾸세요. 두피 케어와 모발 영양을 동시에 잡은 프리미엄 헤어케어 제품입니다.',
    category: 'beauty' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign11/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign11/800/600',
      'https://picsum.photos/seed/campaign11-2/800/600',
    ],
    startDate: '2025-09-25T00:00:00Z',
    endDate: '2025-10-25T23:59:59Z',
    applicationDeadline: '2025-10-10T23:59:59Z',
    reviewDeadline: '2025-11-01T23:59:59Z',
    maxRecruitment: 60,
    currentRecruitment: 53,
    selectedCount: 2,
    points: 1000,
    createdAt: '2025-09-19T00:00:00Z',
  },
  {
    id: '12',
    title: '무선 청소기 체험단',
    brand: '다이슨',
    description:
      '다이슨의 무선 청소기로 집안 구석구석을 깨끗하게 청소하세요. 강력한 흡입력과 긴 배터리 수명이 특징인 프리미엄 청소기입니다.',
    category: 'home' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign12/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign12/800/600',
      'https://picsum.photos/seed/campaign12-2/800/600',
    ],
    startDate: '2025-09-20T00:00:00Z',
    endDate: '2025-10-20T23:59:59Z',
    applicationDeadline: '2025-10-05T23:59:59Z',
    reviewDeadline: '2025-10-27T23:59:59Z',
    maxRecruitment: 15,
    currentRecruitment: 12,
    selectedCount: 1,
    points: 3500,
    createdAt: '2025-09-14T00:00:00Z',
  },
  {
    id: '13',
    title: '프리미엄 초콜릿 체험단',
    brand: '페레로로쉐',
    description:
      '페레로로쉐의 프리미엄 초콜릿으로 특별한 순간을 더욱 달콤하게 만드세요. 고급 헤이즐넛이 들어간 럭셔리 초콜릿입니다.',
    category: 'food' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign13/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign13/800/600',
      'https://picsum.photos/seed/campaign13-2/800/600',
    ],
    startDate: '2025-09-10T00:00:00Z',
    endDate: '2025-10-10T23:59:59Z',
    applicationDeadline: '2025-09-25T23:59:59Z',
    reviewDeadline: '2025-10-17T23:59:59Z',
    maxRecruitment: 100,
    currentRecruitment: 100,
    selectedCount: 1,
    points: 600,
    createdAt: '2025-09-04T00:00:00Z',
  },
  {
    id: '14',
    title: '고급 향수 리뷰어',
    brand: '조말론',
    description:
      '조말론의 시그니처 향수로 당신만의 향기를 완성하세요. 영국 왕실이 사랑하는 럭셔리 프래그런스 브랜드입니다.',
    category: 'beauty' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign14/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign14/800/600',
      'https://picsum.photos/seed/campaign14-2/800/600',
    ],
    startDate: '2025-09-05T00:00:00Z',
    endDate: '2025-10-05T23:59:59Z',
    applicationDeadline: '2025-09-20T23:59:59Z',
    reviewDeadline: '2025-10-12T23:59:59Z',
    maxRecruitment: 30,
    currentRecruitment: 30,
    selectedCount: 1,
    points: 2000,
    createdAt: '2025-08-30T00:00:00Z',
  },
  {
    id: '15',
    title: '스마트폰 케이스 체험단',
    brand: '카카오프렌즈',
    description:
      '카카오프렌즈의 귀여운 스마트폰 케이스로 개성을 표현하세요. 실용성과 디자인을 모두 갖춘 프리미엄 케이스입니다.',
    category: 'accessories' as CampaignCategory,
    status: 'closed' as CampaignStatus,
    imageUrl: 'https://picsum.photos/seed/campaign15/400/300',
    imageUrls: [
      'https://picsum.photos/seed/campaign15/800/600',
      'https://picsum.photos/seed/campaign15-2/800/600',
    ],
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-10-01T23:59:59Z',
    applicationDeadline: '2025-09-15T23:59:59Z',
    reviewDeadline: '2025-10-08T23:59:59Z',
    maxRecruitment: 150,
    currentRecruitment: 150,
    selectedCount: 1,
    points: 500,
    createdAt: '2025-08-26T00:00:00Z',
  },
];

/**
 * Campaign ID로 찾기
 */
export function findCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find((campaign) => campaign.id === id);
}

/**
 * 상태별 캠페인 목록 조회
 */
export function getCampaignsByStatus(status: CampaignStatus): Campaign[] {
  return mockCampaigns.filter((campaign) => campaign.status === status);
}

/**
 * 카테고리별 캠페인 목록 조회
 */
export function getCampaignsByCategory(category: CampaignCategory): Campaign[] {
  return mockCampaigns.filter((campaign) => campaign.category === category);
}

/**
 * 진행 중인 캠페인 목록 조회
 */
export function getActiveCampaigns(): Campaign[] {
  return getCampaignsByStatus('active');
}

/**
 * 마감된 캠페인 목록 조회
 */
export function getClosedCampaigns(): Campaign[] {
  return getCampaignsByStatus('closed');
}
