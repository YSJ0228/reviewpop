import { MyCampaignDetail } from '../types/myCampaign.types';
import { findMyCampaignById } from './mockMyCampaigns';

function requireMyCampaign(id: string) {
  const campaign = findMyCampaignById(id);
  if (!campaign) {
    throw new Error(`mockCampaigns에 ID가 ${id}인 캠페인이 없습니다.`);
  }
  return campaign;
}

// 캠페인 상세 정보 (mockCampaigns 확장)
export const mockMyCampaignDetails: Record<string, MyCampaignDetail> = {
  // 각 캠페인별 상세 정보 생성
  '1': {
    ...requireMyCampaign('1'),
    description:
      '스타벅스의 신제품 커피를 가장 먼저 체험해보세요! 프리미엄 원두를 사용한 특별한 블렌드로, 부드러운 맛과 풍부한 향이 특징입니다.',
    reviewMission: [
      '체험 매장 방문 인증샷 2장 이상',
      '시음 후기 및 향/맛 묘사',
      '#스타벅스체험 해시태그 포함',
    ],
    providedItems: ['신제품 원두 200g', '브랜드 머그컵 1개'],
    currentRecruitment: 47,
    maxRecruitment: 50,
    requirements: ['스타벅스 리워드 회원', '네이버 블로그 또는 인스타 운영자'],
    experiencePrecautions: ['타인 양도 불가', '리뷰에 쿠폰 코드 노출 금지'],
  },
  '2': {
    ...requireMyCampaign('2'),
    description:
      '설화수의 프리미엄 화장품 라인을 체험할 수 있는 특별한 기회! 한방 성분이 함유된 고급 스킨케어 제품으로 피부 본연의 아름다움을 찾아보세요.',
    reviewMission: [
      '제품 개봉 사진 3장 이상',
      '사용감 및 향에 대한 설명',
      '#설화수리뷰 해시태그 포함',
    ],
    providedItems: ['프리미엄 에센스 30ml', '크림 15ml 샘플'],
    currentRecruitment: 28,
    maxRecruitment: 30,
    requirements: ['뷰티 카테고리 운영 경력 6개월 이상', '리뷰 평균 조회수 300 이상'],
    experiencePrecautions: ['제품 양도 금지', '피부 트러블 발생 시 즉시 고객센터 연락'],
  },
  '3': {
    ...requireMyCampaign('3'),
    description:
      '삼성전자의 최신 무선 이어폰을 체험해보세요. 탁월한 노이즈 캔슬링 기능과 고음질 사운드로 최상의 청음 경험을 제공합니다.',
    reviewMission: [
      '제품 언박싱 영상 또는 사진',
      '노이즈 캔슬링 체감 후기',
      '실사용 사진 2장 이상',
    ],
    providedItems: ['무선 이어폰 1세트', '충전 케이스', '사이즈별 이어팁'],
    currentRecruitment: 35,
    maxRecruitment: 40,
    requirements: ['Tech/Sound 카테고리 운영자', 'SNS 팔로워 1000명 이상'],
    experiencePrecautions: ['제품 분해 금지', '임의 펌웨어 업데이트 금지'],
  },
  '4': {
    ...requireMyCampaign('4'),
    description:
      '종근당의 건강 보조 식품으로 활력 넘치는 하루를 시작하세요. 비타민과 미네랄이 풍부하게 함유된 프리미엄 건강식품입니다.',
    reviewMission: ['섭취 전후 느낌 기록', '제품 패키지 사진', '#건강보조식품 해시태그 포함'],
    providedItems: ['건강 보조 식품 1개월분', '섭취 가이드'],
    currentRecruitment: 58,
    maxRecruitment: 80,
    requirements: ['건강 관련 콘텐츠 월 2회 이상 업로드', '의료인 또는 영양사일 경우 우대'],
    experiencePrecautions: ['과다 섭취 금지', '알레르기 유발 성분 확인'],
  },
  '5': {
    ...requireMyCampaign('5'),
    description:
      '애플의 최신 스마트워치를 가장 먼저 체험해보세요. 건강 관리부터 스마트한 일상까지, 손목 위의 작은 혁신을 경험하세요.',
    reviewMission: ['심박/운동 기록 캡처', '헬스 기능 3가지 이상 소개', '생활 속 착용 사진'],
    providedItems: ['스마트워치 1대', '충전 독', '스트랩 2종'],
    currentRecruitment: 19,
    maxRecruitment: 20,
    deliveryInfo: {
      shippingDate: '2025-11-02T00:00:00Z',
      trackingNumber: 'APPLE-DELIVERY-5544',
    },
    requirements: ['애플 제품 사용자', 'SNS 팔로워 1500명 이상'],
    experiencePrecautions: ['제품 임의적인 분해 금지', '체험 종료 후 설문 요청 가능'],
  },
  '6': {
    ...requireMyCampaign('6'),
    description:
      '이니스프리의 유기농 화장품으로 자연의 건강함을 피부에 전하세요. 제주 청정 자연에서 얻은 원료로 만든 순한 화장품입니다.',
    reviewMission: ['피부 전/후 사진 비교 2장 이상', '성분 특징 소개', '사용 후기 1000자 이상'],
    providedItems: ['유기농 스킨케어 세트 (토너, 로션)', '마스크팩 5매'],
    currentRecruitment: 25,
    maxRecruitment: 30,
    deliveryInfo: {
      shippingDate: '2025-10-27T00:00:00Z',
    },
    requirements: ['뷰티 리뷰 경험자', '트러블 피부 또는 민감성 피부 우대'],
    experiencePrecautions: ['보관 시 직사광선 피하기', '이상 반응 시 즉시 사용 중단'],
  },
  '7': {
    ...requireMyCampaign('7'),
    description:
      'CJ제일제당의 프리미엄 쌀로 건강한 한 끼를 준비하세요. 국내산 최고급 쌀로 지은 밥의 차이를 느껴보세요.',
    reviewMission: ['밥짓는 과정 사진', '시식 후기 및 레시피 공유', '#프리미엄쌀 해시태그'],
    providedItems: ['프리미엄 쌀 4kg', '브랜드 레시피북'],
    currentRecruitment: 42,
    maxRecruitment: 50,
    deliveryInfo: {
      shippingDate: '2025-10-23T00:00:00Z',
    },
    requirements: ['요리 콘텐츠 제작자 우대', '가족 구성원 3인 이상'],
    experiencePrecautions: ['보관 시 습기 주의', '체험용 제품 재판매 금지'],
  },
  '8': {
    ...requireMyCampaign('8'),
    description:
      '나이키의 신상 운동화로 스타일과 퍼포먼스를 동시에 잡으세요. 최신 쿠셔닝 기술이 적용된 프리미엄 러닝화입니다.',
    reviewMission: ['착용샷 2장 이상', '착화감 및 러닝 후기', '#나이키러닝 해시태그 포함'],
    providedItems: ['신상 운동화 1켤레', '스포츠 양말 2족'],
    currentRecruitment: 27,
    maxRecruitment: 30,
    deliveryInfo: {
      shippingDate: '2025-10-21T00:00:00Z',
      trackingNumber: 'NIKE-DELIVERY-3321',
    },
    requirements: ['러닝 또는 운동 관련 콘텐츠 운영자', 'SNS 팔로워 800명 이상'],
    experiencePrecautions: ['외부 착용 후 세탁 가이드 준수', '제품 손상 시 비용 청구 가능'],
  },
  '9': {
    ...requireMyCampaign('9'),
    description:
      'LG전자의 스마트 홈 기기로 집안을 더욱 편리하게 만드세요. IoT 기술이 적용된 차세대 홈 솔루션을 경험해보세요.',
    reviewMission: ['체험존 전경 사진 2장 이상', '제품별 기능 체험 후기', '실내 설치 사진 공유'],
    providedItems: ['스마트 플러그 2개', '스마트 전구 1개', '사용 설명서'],
    currentRecruitment: 15,
    maxRecruitment: 20,
    deliveryInfo: {
      shippingDate: '2025-10-20',
    },
    requirements: ['리빙/홈트렌드 콘텐츠 제작자', '영상 콘텐츠 업로드 가능자 우대'],
    experiencePrecautions: ['체험존 내 촬영 규정 준수', '비공개 존 촬영 금지'],
  },
  '10': {
    ...requireMyCampaign('10'),
    description:
      '빙그레의 프리미엄 요거트로 건강한 아침을 시작하세요. 100% 국내산 원유로 만든 신선하고 진한 요거트입니다.',
    reviewMission: [
      '제품 패키지 및 구성 사진',
      '맛과 식감에 대한 후기를 영상 또는 글로 작성',
      '#요거트체험단 태그',
    ],
    providedItems: ['프리미엄 요거트 12개입 세트', '그래놀라 1봉'],
    currentRecruitment: 65,
    maxRecruitment: 100,
    deliveryInfo: {
      shippingDate: '2025-10-13T00:00:00Z',
      trackingNumber: 'BINGGRAE-DELIVERY-9090',
    },
    requirements: ['가정 내 냉장 보관 가능자', '푸드 콘텐츠 제작 경험자'],
    experiencePrecautions: ['냉장 보관 필수', '유통기한 내 섭취 권장'],
  },
  '11': {
    ...requireMyCampaign('11'),
    description:
      '아모레퍼시픽의 신제품 샴푸로 건강한 모발을 가꾸세요. 두피 케어와 모발 영양을 동시에 잡은 프리미엄 헤어케어 제품입니다.',
    reviewMission: ['사용 전/후 사진', '향과 사용감 설명', '영상 리뷰 1편 또는 블로그 리뷰 1건'],
    providedItems: ['신제품 샴푸 500ml', '트리트먼트 200ml'],
    currentRecruitment: 53,
    maxRecruitment: 60,
    deliveryInfo: {
      shippingDate: '2025-10-11T00:00:00Z',
    },
    requirements: ['헤어 케어 리뷰 경험자', '모발 타입 기재 필수'],
    experiencePrecautions: ['사용 중 이상 반응 시 즉시 중단', '외부 보관 시 직사광선 금지'],
  },
  '12': {
    ...requireMyCampaign('12'),
    description:
      '다이슨의 무선 청소기로 집안 구석구석을 깨끗하게 청소하세요. 강력한 흡입력과 긴 배터리 수명이 특징인 프리미엄 청소기입니다.',
    reviewMission: ['언박싱 사진 3장 이상', '청소 전/후 비교 사진', '사용 영상 1편 이상'],
    providedItems: ['무선 청소기 1대', '교체용 필터', '다용도 브러쉬 3종'],
    currentRecruitment: 12,
    maxRecruitment: 15,
    deliveryInfo: {
      shippingDate: '2025-10-06T00:00:00Z',
      trackingNumber: 'DYSON-DELIVERY-4432',
    },
    requirements: ['리빙/육아/반려동물 콘텐츠 운영자', '리뷰 영상 제작 가능자'],
    experiencePrecautions: ['체험 기간 동안 제품 파손 주의', '반납 여부는 개별 안내 예정'],
  },
  '13': {
    ...requireMyCampaign('13'),
    description:
      '페레로로쉐의 프리미엄 초콜릿으로 특별한 순간을 더욱 달콤하게 만드세요. 고급 헤이즐넛이 들어간 럭셔리 초콜릿입니다.',
    reviewMission: ['제품 디테일 사진', '시식 후기와 추천 상황 제안', '#프리미엄초콜릿 해시태그'],
    providedItems: ['프리미엄 초콜릿 세트', '고급 포장 상자'],
    currentRecruitment: 100,
    maxRecruitment: 100,
    deliveryInfo: {
      shippingDate: '2025-09-26T00:00:00Z',
    },
    requirements: ['디저트/카페 리뷰어', '사진 촬영 장비 보유자 우대'],
    experiencePrecautions: [
      '직사광선 및 고온 다습한 장소 보관 금지',
      '알레르기 유발 성분 안내 필수',
    ],
  },
  '14': {
    ...requireMyCampaign('14'),
    description:
      '조말론의 시그니처 향수로 당신만의 향기를 완성하세요. 영국 왕실이 사랑하는 럭셔리 프래그런스 브랜드입니다.',
    reviewMission: ['향수 시향 과정 소개', '향의 지속력 후기', '매장 분위기 사진 2장 이상'],
    providedItems: ['시그니처 향수 50ml', '미니어처 샘플 2종'],
    currentRecruitment: 30,
    maxRecruitment: 30,
    deliveryInfo: {
      shippingDate: '2025-09-23',
      trackingNumber: '6677889900112',
    },
    requirements: ['뷰티 향수 카테고리 운영자', '향수 관련 콘텐츠 월 1회 이상 업로드'],
    experiencePrecautions: ['향수 사용 후 알레르기 반응 주의', '매장 내 촬영 가이드 준수'],
  },
  '15': {
    ...requireMyCampaign('15'),
    description:
      '카카오프렌즈의 귀여운 스마트폰 케이스로 개성을 표현하세요. 실용성과 디자인을 모두 갖춘 프리미엄 케이스입니다.',
    reviewMission: [
      '케이스 착용 사진 3장 이상',
      '보호력 및 디자인 후기',
      '#카카오프렌즈케이스 해시태그',
    ],
    providedItems: ['스마트폰 케이스 1개', '캐릭터 스티커 팩'],
    currentRecruitment: 150,
    maxRecruitment: 150,
    deliveryInfo: {
      shippingDate: '2025-09-16T00:00:00Z',
      trackingNumber: 'KAKAO-DELIVERY-2211',
    },
    requirements: ['스마트폰 액세서리 관심자', '인스타그램 또는 블로그 운영자'],
    experiencePrecautions: ['기종 선택 후 변경 불가', '제품 개봉 시 교환/반품 불가'],
  },
};
