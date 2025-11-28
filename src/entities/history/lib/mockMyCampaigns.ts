import { MyCampaign } from '../types/myCampaign.types';

export const mockMyCampaigns: MyCampaign[] = [
  // 미선정 상태 (2개)
  {
    id: '1',
    brand: '스타벅스',
    providedItem: '아메리카노 Tall 1잔 + 머그컵 1개',
    thumbnail: 'https://picsum.photos/seed/campaign1/400/300',
    status: 'rejected',
    recruitmentSchedule: ['2025-11-01', '2025-11-15'],
    maxRecruitment: 15,
  },
  {
    id: '2',
    brand: '설화수',
    providedItem: '럭셔리 스킨케어 체험 세트 + 맞춤형 뷰티 컨설팅',
    thumbnail: 'https://picsum.photos/seed/campaign2/400/300',
    status: 'rejected',
    recruitmentSchedule: ['2025-11-05', '2025-11-18'],
    maxRecruitment: 20,
  },
  // 신청 상태 (5개)
  {
    id: '3',
    brand: '삼성전자',
    providedItem: '최신 스마트폰 체험 + 액세서리 세트 제공',
    thumbnail: 'https://picsum.photos/seed/campaign3/400/300',
    status: 'applied',
    applicationDate: '2025-11-09',
    announcementDate: '2025-11-11',
  },
  {
    id: '4',
    brand: '종근당',
    providedItem: '건강기능식품 체험 세트 + 맞춤형 건강 상담',
    thumbnail: 'https://picsum.photos/seed/campaign4/400/300',
    status: 'applied',
    applicationDate: '2025-11-01',
    announcementDate: '2025-11-12',
  },
  {
    id: '5',
    brand: '애플',
    providedItem: '신제품 애플 워치 체험 + 액세서리 할인 쿠폰',
    thumbnail: 'https://picsum.photos/seed/campaign5/400/300',
    status: 'applied',
    applicationDate: '2025-11-02',
    announcementDate: '2025-11-21',
  },
  {
    id: '6',
    brand: '휩드',
    providedItem: '피부 타입 상담 + 자기만의 특별한 클렌징 폼 제작 체험',
    thumbnail: 'https://picsum.photos/seed/campaign4/400/300',
    status: 'applied',
    applicationDate: '2025-11-10',
    announcementDate: '2025-11-28',
  },
  {
    id: '7',
    brand: '롯데제과',
    providedItem: '새로 나온 과자 체험 + 공장 투어 기회',
    thumbnail: 'https://picsum.photos/seed/campaign5/400/300',
    status: 'applied',
    applicationDate: '2025-11-12',
    announcementDate: '2025-11-30',
  },

  // 선정 상태 (4개)
  {
    id: '8',
    brand: '이니스프리',
    providedItem: '신제품 스킨케어 세트',
    thumbnail: 'https://picsum.photos/seed/campaign6/400/300',
    status: 'selected',
    visitStatus: 'before',
    deadline: '2025-11-25',
  },
  {
    id: '9',
    brand: 'CJ제일제당',
    providedItem: '신제품 소스 + 요리 클래스 참여 기회',
    thumbnail: 'https://picsum.photos/seed/campaign7/400/300',
    status: 'selected',
    visitStatus: 'scheduled',
    appliedAt: ['2025-11-28', '17:00'],
  },
  {
    id: '10',
    brand: '나이키',
    providedItem: '신제품 운동화 + 피트니스 클래스 참여 기회',
    thumbnail: 'https://picsum.photos/seed/campaign8/400/300',
    status: 'selected',
    visitStatus: 'scheduled',
    appliedAt: ['2025-11-30', '10:00'],
  },

  // 등록 상태 (3개)
  {
    id: '11',
    brand: 'LG전자',
    providedItem: '최신 노트북 + 노트북 파우치 제공',
    thumbnail: 'https://picsum.photos/seed/campaign9/400/300',
    status: 'registered',
    reviewStatus: 'visited',
    appliedAt: ['2025-11-12', '14:00'],
    visitPeriod: ['2025-11-8', '2025-11-23'],
  },
  {
    id: '12',
    brand: '빙그레',
    providedItem: '신제품 아이스크림 세트 + 맛 평가 설문 참여',
    thumbnail: 'https://picsum.photos/seed/campaign10/400/300',
    status: 'registered',
    reviewStatus: 'notReviewed',
    appliedAt: ['2025-10-28', '16:00'],
    visitPeriod: ['2025-10-20', '2025-11-05'],
  },
  {
    id: '13',
    brand: '아모레퍼시픽',
    providedItem: '신제품 메이크업 키트 + 메이크업 클래스 참여',
    thumbnail: 'https://picsum.photos/seed/campaign11/400/300',
    status: 'registered',
    reviewStatus: 'reviewPending',
    appliedAt: ['2025-11-15', '11:00'],
  },
  {
    id: '14',
    brand: '다이슨',
    providedItem: '무선 청소기 + 청소기 액세서리 세트',
    thumbnail: 'https://picsum.photos/seed/campaign12/400/300',
    status: 'registered',
    reviewStatus: 'requiredForEditing',
    appliedAt: ['2025-11-18', '09:00'],
  },

  // 종료 상태 (3개)
  {
    id: '15',
    brand: '페레로로쉐',
    providedItem: '초콜릿 세트 + 초콜릿 만들기 체험',
    thumbnail: 'https://picsum.photos/seed/campaign13/400/300',
    status: 'completed',
    appliedAt: ['2025-09-10', '17:00'],
  },
  {
    id: '16',
    brand: '조말론',
    providedItem: '신제품 향수 세트 + 맞춤형 향수 제작 체험',
    thumbnail: 'https://picsum.photos/seed/campaign14/400/300',
    status: 'completed',
    appliedAt: ['2025-10-20', '12:00'],
  },
  {
    id: '17',
    brand: '카카오프렌즈',
    providedItem: '한정판 피규어 + 굿즈 세트',
    thumbnail: 'https://picsum.photos/seed/campaign15/400/300',
    status: 'completed',
    appliedAt: ['2025-11-15', '10:00'],
  },
];

export function findMyCampaignById(id: string): MyCampaign | undefined {
  return mockMyCampaigns.find((campaign) => campaign.id === id);
}
