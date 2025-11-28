import type { CampaignDetail, VisitReservation } from '@entities/campaign/types/campaign.types';

import { findCampaignById } from './mockCampaigns';

const defaultBusinessHours: VisitReservation['businessHours'] = [
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
  { start: '09:00', end: '21:00' },
];

function requireCampaign(id: string) {
  const campaign = findCampaignById(id);
  if (!campaign) {
    throw new Error(`ID가 ${id}인 체험을 찾을 수 없습니다.`);
  }
  return campaign;
}

export const mockCampaignDetails: CampaignDetail[] = [
  {
    ...requireCampaign('1'),
    estimatedValue: 50000,
    keywords: ['커피', '프리미엄', '매장체험'],
    visitReservation: {
      businessHours: defaultBusinessHours,
      isReservationRequired: true,
      reservationMethod: '스타벅스 앱 사전 예약',
      visitReservationNotice: '체험 당일 매장 방문 전 10분 전에 알림톡 확인 필수',
    },
    reviewMission: [
      '체험 매장 방문 인증샷 2장 이상',
      '시음 후기 및 향/맛 묘사',
      '#스타벅스체험 해시태그 포함',
    ],
    reviewMissionNotice: '리뷰는 선정 후 3일 이내 업로드해야 합니다.',
    requirements: ['스타벅스 리워드 회원', '네이버 블로그 또는 인스타 운영자'],
    precautions: ['타인 양도 불가', '리뷰에 쿠폰 코드 노출 금지'],
  },
  {
    ...requireCampaign('2'),
    estimatedValue: 120000,
    keywords: ['설화수', '스킨케어', '뷰티'],
    reviewMission: [
      '제품 개봉 사진 3장 이상',
      '사용감 및 향에 대한 설명',
      '#설화수리뷰 해시태그 포함',
    ],
    reviewMissionNotice: '제품 수령 후 5일 이내 1차 사용 후기를 업로드해야 합니다.',
    requirements: ['뷰티 카테고리 운영 경력 6개월 이상', '리뷰 평균 조회수 300 이상'],
    precautions: ['제품 양도 금지', '피부 트러블 발생 시 즉시 고객센터 연락'],
  },
  {
    ...requireCampaign('3'),
    estimatedValue: 180000,
    keywords: ['이어폰', '삼성전자', '노이즈캔슬링'],
    reviewMission: [
      '제품 언박싱 영상 또는 사진',
      '노이즈 캔슬링 체감 후기',
      '실사용 사진 2장 이상',
    ],
    requirements: ['Tech/Sound 카테고리 운영자', 'SNS 팔로워 1000명 이상'],
    precautions: ['제품 분해 금지', '임의 펌웨어 업데이트 금지'],
  },
  {
    ...requireCampaign('4'),
    estimatedValue: 80000,
    keywords: ['건강식품', '비타민', '종근당'],
    reviewMission: ['섭취 전후 느낌 기록', '제품 패키지 사진', '#건강보조식품 해시태그 포함'],
    requirements: ['건강 관련 콘텐츠 월 2회 이상 업로드', '의료인 또는 영양사일 경우 우대'],
    precautions: ['과다 섭취 금지', '알레르기 유발 성분 확인'],
  },
  {
    ...requireCampaign('5'),
    estimatedValue: 450000,
    keywords: ['스마트워치', '애플', '헬스케어'],
    reviewMission: ['심박/운동 기록 캡처', '헬스 기능 3가지 이상 소개', '생활 속 착용 사진'],
    requirements: ['애플 제품 사용자', 'SNS 팔로워 1500명 이상'],
    precautions: ['제품 임의적인 분해 금지', '체험 종료 후 설문 요청 가능'],
  },
  {
    ...requireCampaign('6'),
    estimatedValue: 90000,
    keywords: ['이니스프리', '유기농', '스킨케어'],
    reviewMission: ['피부 전/후 사진 비교 2장 이상', '성분 특징 소개', '사용 후기 1000자 이상'],
    requirements: ['뷰티 리뷰 경험자', '트러블 피부 또는 민감성 피부 우대'],
    precautions: ['보관 시 직사광선 피하기', '이상 반응 시 즉시 사용 중단'],
  },
  {
    ...requireCampaign('7'),
    estimatedValue: 60000,
    keywords: ['프리미엄쌀', '건강식', 'CJ제일제당'],
    reviewMission: ['밥짓는 과정 사진', '시식 후기 및 레시피 공유', '#프리미엄쌀 해시태그'],
    requirements: ['요리 콘텐츠 제작자 우대', '가족 구성원 3인 이상'],
    precautions: ['보관 시 습기 주의', '체험용 제품 재판매 금지'],
  },
  {
    ...requireCampaign('8'),
    estimatedValue: 250000,
    keywords: ['운동화', '나이키', '러닝'],
    reviewMission: ['착용샷 2장 이상', '착화감 및 러닝 후기', '#나이키러닝 해시태그 포함'],
    requirements: ['러닝 또는 운동 관련 콘텐츠 운영자', 'SNS 팔로워 800명 이상'],
    precautions: ['외부 착용 후 세탁 가이드 준수', '제품 손상 시 비용 청구 가능'],
  },
  {
    ...requireCampaign('9'),
    estimatedValue: 600000,
    keywords: ['스마트홈', 'LG전자', '체험존'],
    visitReservation: {
      businessHours: [
        { start: '10:00', end: '19:00' },
        { start: '10:00', end: '19:00' },
        { start: '10:00', end: '19:00' },
        { start: '10:00', end: '19:00' },
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '18:00' },
      ],
      isReservationRequired: true,
      reservationMethod: 'LG 스마트홈 체험존 온라인 예약 폼',
      visitReservationNotice: '예약 시간 15분 초과 시 체험이 취소될 수 있습니다.',
    },
    reviewMission: ['체험존 전경 사진 2장 이상', '제품별 기능 체험 후기', '실내 설치 사진 공유'],
    requirements: ['리빙/홈트렌드 콘텐츠 제작자', '영상 콘텐츠 업로드 가능자 우대'],
    precautions: ['체험존 내 촬영 규정 준수', '비공개 존 촬영 금지'],
  },
  {
    ...requireCampaign('10'),
    estimatedValue: 40000,
    keywords: ['요거트', '건강간식', '빙그레'],
    reviewMission: [
      '제품 패키지 및 구성 사진',
      '맛과 식감에 대한 후기를 영상 또는 글로 작성',
      '#요거트체험단 태그',
    ],
    requirements: ['가정 내 냉장 보관 가능자', '푸드 콘텐츠 제작 경험자'],
    precautions: ['냉장 보관 필수', '유통기한 내 섭취 권장'],
  },
  {
    ...requireCampaign('11'),
    estimatedValue: 70000,
    keywords: ['샴푸', '헤어케어', '아모레'],
    reviewMission: ['사용 전/후 사진', '향과 사용감 설명', '영상 리뷰 1편 또는 블로그 리뷰 1건'],
    requirements: ['헤어 케어 리뷰 경험자', '모발 타입 기재 필수'],
    precautions: ['사용 중 이상 반응 시 즉시 중단', '외부 보관 시 직사광선 금지'],
  },
  {
    ...requireCampaign('12'),
    estimatedValue: 650000,
    keywords: ['무선청소기', '다이슨', '프리미엄가전'],
    reviewMission: ['언박싱 사진 3장 이상', '청소 전/후 비교 사진', '사용 영상 1편 이상'],
    requirements: ['리빙/육아/반려동물 콘텐츠 운영자', '리뷰 영상 제작 가능자'],
    precautions: ['체험 기간 동안 제품 파손 주의', '반납 여부는 개별 안내 예정'],
  },
  {
    ...requireCampaign('13'),
    estimatedValue: 50000,
    keywords: ['초콜릿', '디저트', '페레로로쉐'],
    reviewMission: ['제품 디테일 사진', '시식 후기와 추천 상황 제안', '#프리미엄초콜릿 해시태그'],
    requirements: ['디저트/카페 리뷰어', '사진 촬영 장비 보유자 우대'],
    precautions: ['직사광선 및 고온 다습한 장소 보관 금지', '알레르기 유발 성분 안내 필수'],
  },
  {
    ...requireCampaign('14'),
    estimatedValue: 180000,
    keywords: ['향수', '조말론', '플래그십스토어'],
    visitReservation: {
      businessHours: defaultBusinessHours,
      isReservationRequired: true,
      reservationMethod: '조말론 청담 플래그십 스토어 전화 예약',
      visitReservationNotice: '예약 변경은 최소 1일 전까지 가능',
    },
    reviewMission: ['향수 시향 과정 소개', '향의 지속력 후기', '매장 분위기 사진 2장 이상'],
    reviewMissionNotice: '후기 업로드 시 향 노트 설명을 포함해주세요.',
    requirements: ['뷰티 향수 카테고리 운영자', '향수 관련 콘텐츠 월 1회 이상 업로드'],
    precautions: ['향수 사용 후 알레르기 반응 주의', '매장 내 촬영 가이드 준수'],
  },
  {
    ...requireCampaign('15'),
    estimatedValue: 30000,
    keywords: ['스마트폰케이스', '카카오프렌즈', '굿즈'],
    reviewMission: [
      '케이스 착용 사진 3장 이상',
      '보호력 및 디자인 후기',
      '#카카오프렌즈케이스 해시태그',
    ],
    requirements: ['스마트폰 액세서리 관심자', '인스타그램 또는 블로그 운영자'],
    precautions: ['기종 선택 후 변경 불가', '제품 개봉 시 교환/반품 불가'],
  },
];
