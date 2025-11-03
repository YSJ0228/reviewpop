import { http, HttpResponse } from 'msw';
import type { Campaign, CampaignDetail } from '@/features/history/types/campaign.types';

const mockCampaigns: Campaign[] = [
  // 신청 상태 (5개)
  {
    id: '1',
    title: '신제품 커피 체험단 모집',
    brand: '스타벅스',
    imageUrl: 'https://picsum.photos/seed/campaign1/400/300',
    status: 'applied',
    applicationDate: '2025-11-01',
    deadline: '2025-11-15',
    category: '음료',
    points: 1000,
  },
  {
    id: '2',
    title: '프리미엄 화장품 리뷰어 모집',
    brand: '설화수',
    imageUrl: 'https://picsum.photos/seed/campaign2/400/300',
    status: 'applied',
    applicationDate: '2025-10-28',
    deadline: '2025-11-10',
    category: '뷰티',
    points: 1500,
  },
  {
    id: '3',
    title: '무선 이어폰 체험단',
    brand: '삼성전자',
    imageUrl: 'https://picsum.photos/seed/campaign3/400/300',
    status: 'applied',
    applicationDate: '2025-10-25',
    deadline: '2025-11-08',
    category: '전자제품',
    points: 2000,
  },
  {
    id: '4',
    title: '건강 보조 식품 체험단',
    brand: '종근당',
    imageUrl: 'https://picsum.photos/seed/campaign4/400/300',
    status: 'applied',
    applicationDate: '2025-10-20',
    deadline: '2025-11-05',
    category: '건강',
    points: 800,
  },
  {
    id: '5',
    title: '신규 스마트워치 리뷰어',
    brand: '애플',
    imageUrl: 'https://picsum.photos/seed/campaign5/400/300',
    status: 'applied',
    applicationDate: '2025-10-15',
    deadline: '2025-11-01',
    category: '전자제품',
    points: 3000,
  },

  // 선정 상태 (4개)
  {
    id: '6',
    title: '유기농 화장품 체험단',
    brand: '이니스프리',
    imageUrl: 'https://picsum.photos/seed/campaign6/400/300',
    status: 'selected',
    applicationDate: '2025-10-10',
    deadline: '2025-10-25',
    category: '뷰티',
    points: 1200,
  },
  {
    id: '7',
    title: '프리미엄 쌀 체험단',
    brand: 'CJ제일제당',
    imageUrl: 'https://picsum.photos/seed/campaign7/400/300',
    status: 'selected',
    applicationDate: '2025-10-08',
    deadline: '2025-10-22',
    category: '식품',
    points: 900,
  },
  {
    id: '8',
    title: '신상 운동화 리뷰어',
    brand: '나이키',
    imageUrl: 'https://picsum.photos/seed/campaign8/400/300',
    status: 'selected',
    applicationDate: '2025-10-05',
    deadline: '2025-10-20',
    category: '패션',
    points: 2500,
  },
  {
    id: '9',
    title: '스마트 홈 기기 체험단',
    brand: 'LG전자',
    imageUrl: 'https://picsum.photos/seed/campaign9/400/300',
    status: 'selected',
    applicationDate: '2025-10-03',
    deadline: '2025-10-18',
    category: '전자제품',
    points: 1800,
  },

  // 등록 상태 (3개)
  {
    id: '10',
    title: '프리미엄 요거트 체험단',
    brand: '빙그레',
    imageUrl: 'https://picsum.photos/seed/campaign10/400/300',
    status: 'registered',
    applicationDate: '2025-09-28',
    deadline: '2025-10-12',
    category: '식품',
    points: 700,
  },
  {
    id: '11',
    title: '신제품 샴푸 리뷰어',
    brand: '아모레퍼시픽',
    imageUrl: 'https://picsum.photos/seed/campaign11/400/300',
    status: 'registered',
    applicationDate: '2025-09-25',
    deadline: '2025-10-10',
    category: '뷰티',
    points: 1000,
  },
  {
    id: '12',
    title: '무선 청소기 체험단',
    brand: '다이슨',
    imageUrl: 'https://picsum.photos/seed/campaign12/400/300',
    status: 'registered',
    applicationDate: '2025-09-20',
    deadline: '2025-10-05',
    category: '가전',
    points: 3500,
  },

  // 종료 상태 (3개)
  {
    id: '13',
    title: '프리미엄 초콜릿 체험단',
    brand: '페레로로쉐',
    imageUrl: 'https://picsum.photos/seed/campaign13/400/300',
    status: 'completed',
    applicationDate: '2025-09-10',
    deadline: '2025-09-25',
    category: '식품',
    points: 600,
  },
  {
    id: '14',
    title: '고급 향수 리뷰어',
    brand: '조말론',
    imageUrl: 'https://picsum.photos/seed/campaign14/400/300',
    status: 'completed',
    applicationDate: '2025-09-05',
    deadline: '2025-09-20',
    category: '향수',
    points: 2000,
  },
  {
    id: '15',
    title: '스마트폰 케이스 체험단',
    brand: '카카오프렌즈',
    imageUrl: 'https://picsum.photos/seed/campaign15/400/300',
    status: 'completed',
    applicationDate: '2025-09-01',
    deadline: '2025-09-15',
    category: '액세서리',
    points: 500,
  },
];

// 캠페인 상세 정보 (mockCampaigns 확장)
const mockCampaignDetails: CampaignDetail[] = mockCampaigns.map((campaign) => {
  // 각 캠페인별 상세 정보 생성
  const detailsMap: Record<string, Partial<CampaignDetail>> = {
    '1': {
      description:
        '스타벅스의 신제품 커피를 가장 먼저 체험해보세요! 프리미엄 원두를 사용한 특별한 블렌드로, 부드러운 맛과 풍부한 향이 특징입니다.',
      reviewMission: [
        '제품 사진 3장 이상 촬영',
        '맛과 향에 대한 상세한 후기 작성 (200자 이상)',
        'SNS에 해시태그와 함께 업로드',
        '리뷰팝에 최종 리뷰 등록',
      ],
      providedItems: ['신제품 커피 2팩', '브랜드 굿즈 (텀블러)', '쿠폰 5,000원'],
      currentRecruitment: 47,
      maxRecruitment: 50,
      requirements: ['커피 관련 리뷰 경험 보유자 우대', '인스타그램 팔로워 500명 이상'],
      notices: ['제품 수령 후 7일 이내 리뷰 작성 필수', '허위 리뷰 작성 시 패널티 부과'],
    },
    '2': {
      description:
        '설화수의 프리미엄 화장품 라인을 체험할 수 있는 특별한 기회! 한방 성분이 함유된 고급 스킨케어 제품으로 피부 본연의 아름다움을 찾아보세요.',
      reviewMission: [
        '사용 전/후 피부 상태 비교 사진 촬영',
        '2주간 사용 후기 작성',
        '제품의 텍스처, 흡수력, 보습력 등 상세 리뷰',
        '블로그 또는 인스타그램 포스팅',
      ],
      providedItems: ['에센스 30ml', '크림 15ml', '토너 샘플 5개'],
      currentRecruitment: 28,
      maxRecruitment: 30,
      requirements: ['뷰티 블로거 또는 인플루언서', '20-40대 여성'],
      notices: ['민감성 피부는 패치 테스트 권장', '개봉 후 반품 불가'],
    },
    '3': {
      description:
        '삼성전자의 최신 무선 이어폰을 체험해보세요. 탁월한 노이즈 캔슬링 기능과 고음질 사운드로 최상의 청음 경험을 제공합니다.',
      reviewMission: [
        '음질, 착용감, 배터리 수명 상세 리뷰',
        '다양한 환경에서의 사용 후기 (출퇴근, 운동, 업무 등)',
        '제품 사진 및 착용 사진 5장 이상',
        '유튜브 또는 블로그 리뷰 작성',
      ],
      providedItems: ['무선 이어폰 1세트', '추가 이어팁 3종', '충전 케이블'],
      currentRecruitment: 35,
      maxRecruitment: 40,
      requirements: ['전자기기 리뷰 경험자', '유튜브 채널 보유자 우대'],
      notices: ['체험 후 제품은 증정', '상세한 리뷰 작성 시 추가 포인트 지급'],
    },
    '4': {
      description:
        '종근당의 건강 보조 식품으로 활력 넘치는 하루를 시작하세요. 비타민과 미네랄이 풍부하게 함유된 프리미엄 건강식품입니다.',
      reviewMission: [
        '4주간 꾸준히 섭취 후 체감 효과 작성',
        '섭취 방법 및 맛 평가',
        '건강 상태 변화 상세 기록',
        '리뷰팝 및 개인 SNS에 후기 등록',
      ],
      providedItems: ['건강 보조 식품 1개월분', '복용 가이드북'],
      currentRecruitment: 58,
      maxRecruitment: 80,
      requirements: ['건강식품 섭취 경험자', '성실한 후기 작성 가능자'],
      notices: ['질병 치료 중인 경우 의사와 상담 필요', '임산부 섭취 금지'],
    },
    '5': {
      description:
        '애플의 최신 스마트워치를 가장 먼저 체험해보세요. 건강 관리부터 스마트한 일상까지, 손목 위의 작은 혁신을 경험하세요.',
      reviewMission: [
        '건강 추적 기능 상세 리뷰 (심박수, 수면, 운동)',
        '배터리 수명 및 충전 속도 평가',
        '앱 연동 및 사용성 후기',
        '제품 사진 10장 이상 및 영상 리뷰',
      ],
      providedItems: ['애플 워치 1개', '추가 밴드 2종', '충전 독'],
      currentRecruitment: 19,
      maxRecruitment: 20,
      deliveryInfo: {
        shippingDate: '2025-11-08',
      },
      requirements: ['아이폰 사용자', '테크 리뷰어 또는 유튜버'],
      notices: ['체험 후 반납 필수', '분실 시 변상 책임'],
    },
    '6': {
      description:
        '이니스프리의 유기농 화장품으로 자연의 건강함을 피부에 전하세요. 제주 청정 자연에서 얻은 원료로 만든 순한 화장품입니다.',
      reviewMission: [
        '2주간 사용 후 피부 변화 후기',
        '성분 및 사용감 상세 리뷰',
        '제품 사진 및 텍스처 사진 촬영',
        '인스타그램 피드 또는 스토리 업로드',
      ],
      providedItems: ['스킨 케어 세트 (토너, 로션, 크림)', '클렌징 폼'],
      currentRecruitment: 25,
      maxRecruitment: 30,
      deliveryInfo: {
        shippingDate: '2025-10-28',
        trackingNumber: '1234567890123',
      },
      requirements: ['자연주의 화장품 선호자', '민감성/건성 피부'],
      notices: ['개봉 후 1개월 이내 사용 권장', '냉장 보관 필요'],
    },
    '7': {
      description:
        'CJ제일제당의 프리미엄 쌀로 건강한 한 끼를 준비하세요. 국내산 최고급 쌀로 지은 밥의 차이를 느껴보세요.',
      reviewMission: [
        '밥의 윤기, 찰기, 맛 평가',
        '다양한 요리 활용 후기 (밥, 죽, 볶음밥 등)',
        '요리 완성 사진 3장 이상',
        '가족 반응 및 만족도 작성',
      ],
      providedItems: ['프리미엄 쌀 10kg', '레시피 카드'],
      currentRecruitment: 42,
      maxRecruitment: 50,
      deliveryInfo: {
        shippingDate: '2025-10-25',
        trackingNumber: '9876543210987',
      },
      requirements: ['요리 블로거', '가족 구성원 3인 이상'],
      notices: ['수령 후 서늘한 곳에 보관', '개봉 후 1개월 이내 소비 권장'],
    },
    '8': {
      description:
        '나이키의 신상 운동화로 스타일과 퍼포먼스를 동시에 잡으세요. 최신 쿠셔닝 기술이 적용된 프리미엄 러닝화입니다.',
      reviewMission: [
        '착용감 및 쿠셔닝 성능 평가',
        '러닝, 워킹, 일상 착용 등 다양한 활동 후기',
        '디자인 및 스타일 평가',
        '운동화 착용 사진 5장 이상',
      ],
      providedItems: ['나이키 운동화 1켤레', '운동 양말 2켤레', '신발 가방'],
      currentRecruitment: 27,
      maxRecruitment: 30,
      deliveryInfo: {
        shippingDate: '2025-10-22',
        trackingNumber: '1122334455667',
      },
      requirements: ['러닝 동호회 회원 또는 운동 인플루언서', '사이즈 측정 필수'],
      notices: ['체험 후 제품 증정', '상세 리뷰 미작성 시 포인트 회수'],
    },
    '9': {
      description:
        'LG전자의 스마트 홈 기기로 집안을 더욱 편리하게 만드세요. IoT 기술이 적용된 차세대 홈 솔루션을 경험해보세요.',
      reviewMission: [
        '설치 과정 및 설정 난이도 평가',
        '스마트폰 앱 연동 및 사용성 후기',
        '실제 생활에서의 편의성 평가',
        '제품 설치 및 사용 영상 촬영',
      ],
      providedItems: ['스마트 홈 허브', '스마트 플러그 2개', '센서 3개'],
      currentRecruitment: 15,
      maxRecruitment: 20,
      deliveryInfo: {
        shippingDate: '2025-10-20',
      },
      requirements: ['스마트 홈 기기 사용 경험자', '상세한 리뷰 작성 가능자'],
      notices: ['전문 설치 지원 가능', 'Wi-Fi 환경 필수'],
    },
    '10': {
      description:
        '빙그레의 프리미엄 요거트로 건강한 아침을 시작하세요. 100% 국내산 원유로 만든 신선하고 진한 요거트입니다.',
      reviewMission: [
        '맛, 질감, 신선도 평가',
        '다양한 활용법 소개 (그래놀라, 과일 등)',
        '제품 및 요리 사진 3장 이상',
        '가족 만족도 및 재구매 의향 작성',
      ],
      providedItems: ['프리미엄 요거트 20개입', '그래놀라 1봉'],
      currentRecruitment: 65,
      maxRecruitment: 100,
      deliveryInfo: {
        shippingDate: '2025-10-15',
        trackingNumber: '2233445566778',
      },
      requirements: ['유제품 섭취 가능자', '냉장 보관 가능 환경'],
      notices: ['유통기한 14일', '냉장 보관 필수', '락토프리 제품 아님'],
    },
    '11': {
      description:
        '아모레퍼시픽의 신제품 샴푸로 건강한 모발을 가꾸세요. 두피 케어와 모발 영양을 동시에 잡은 프리미엄 헤어케어 제품입니다.',
      reviewMission: [
        '2주간 사용 후 두피 및 모발 변화 후기',
        '향, 거품, 세정력 평가',
        '사용 전/후 모발 사진 촬영',
        '블로그 또는 인스타그램 리뷰',
      ],
      providedItems: ['샴푸 500ml', '트리트먼트 200ml', '헤어 에센스 샘플'],
      currentRecruitment: 53,
      maxRecruitment: 60,
      deliveryInfo: {
        shippingDate: '2025-10-12',
        trackingNumber: '3344556677889',
      },
      requirements: ['손상모 또는 탈모 고민이 있는 분', '헤어케어 관심자'],
      notices: ['개봉 후 6개월 이내 사용', '눈에 들어가지 않도록 주의'],
    },
    '12': {
      description:
        '다이슨의 무선 청소기로 집안 구석구석을 깨끗하게 청소하세요. 강력한 흡입력과 긴 배터리 수명이 특징인 프리미엄 청소기입니다.',
      reviewMission: [
        '흡입력, 소음, 배터리 수명 상세 평가',
        '다양한 표면(카펫, 마루, 타일) 청소 후기',
        '부속품 활용 및 관리 방법',
        '청소 전/후 비교 사진 및 영상',
      ],
      providedItems: ['다이슨 무선 청소기', '다양한 헤드 5종', '거치대'],
      currentRecruitment: 12,
      maxRecruitment: 15,
      deliveryInfo: {
        shippingDate: '2025-10-08',
        trackingNumber: '4455667788990',
      },
      requirements: ['가전 리뷰어', '유튜브 채널 보유자 우대'],
      notices: ['체험 후 제품 증정', '상세 리뷰 작성 필수'],
    },
    '13': {
      description:
        '페레로로쉐의 프리미엄 초콜릿으로 특별한 순간을 더욱 달콤하게 만드세요. 고급 헤이즐넛이 들어간 럭셔리 초콜릿입니다.',
      reviewMission: [
        '맛, 향, 질감 상세 평가',
        '선물용으로의 적합성 평가',
        '제품 및 개봉 사진 촬영',
        '개인 SNS 또는 블로그 리뷰',
      ],
      providedItems: ['초콜릿 대용량 팩 1개', '선물 포장 세트'],
      currentRecruitment: 100,
      maxRecruitment: 100,
      deliveryInfo: {
        shippingDate: '2025-09-28',
        trackingNumber: '5566778899001',
      },
      requirements: ['디저트 리뷰어', '선물 추천 콘텐츠 제작 가능자'],
      notices: ['상온 보관 가능', '유통기한 6개월', '견과류 알레르기 주의'],
    },
    '14': {
      description:
        '조말론의 시그니처 향수로 당신만의 향기를 완성하세요. 영국 왕실이 사랑하는 럭셔리 프래그런스 브랜드입니다.',
      reviewMission: [
        '향의 지속력, 확산력, 변화 평가',
        '계절 및 상황별 어울리는 향 추천',
        '제품 사진 및 스타일링 사진 촬영',
        '블로그 또는 인스타그램 상세 리뷰',
      ],
      providedItems: ['향수 100ml', '바디 로션', '샘플 3종'],
      currentRecruitment: 30,
      maxRecruitment: 30,
      deliveryInfo: {
        shippingDate: '2025-09-23',
        trackingNumber: '6677889900112',
      },
      requirements: ['향수 애호가', '뷰티 인플루언서'],
      notices: ['직사광선 피해 보관', '피부 테스트 권장', '임산부 사용 주의'],
    },
    '15': {
      description:
        '카카오프렌즈의 귀여운 스마트폰 케이스로 개성을 표현하세요. 실용성과 디자인을 모두 갖춘 프리미엄 케이스입니다.',
      reviewMission: [
        '내구성 및 보호 기능 평가',
        '디자인 만족도 및 실사용 후기',
        '제품 착용 사진 5장 이상',
        '인스타그램 스토리 또는 피드 업로드',
      ],
      providedItems: ['스마트폰 케이스 1개', '캐릭터 스티커 세트'],
      currentRecruitment: 150,
      maxRecruitment: 150,
      deliveryInfo: {
        shippingDate: '2025-09-18',
        trackingNumber: '7788990011223',
      },
      requirements: ['캐릭터 굿즈 애호가', '10-30대'],
      notices: ['기종 선택 필수', '교환/반품 불가'],
    },
  };

  const details = detailsMap[campaign.id] || {};

  return {
    ...campaign,
    description: details.description || '캠페인 상세 설명이 준비 중입니다.',
    reviewMission: details.reviewMission || ['리뷰 작성하기'],
    providedItems: details.providedItems || ['체험 제품'],
    currentRecruitment: details.currentRecruitment || 0,
    maxRecruitment: details.maxRecruitment || 100,
    deliveryInfo: details.deliveryInfo,
    notices: details.notices,
    requirements: details.requirements,
  };
});

export const campaignHandlers = [
  // 캠페인 목록 조회
  http.get('/api/campaigns', () => {
    return HttpResponse.json({
      data: mockCampaigns,
      success: true,
    });
  }),

  // 캠페인 상세 조회
  http.get('/api/campaigns/:id', ({ params }) => {
    const { id } = params;
    const campaign = mockCampaignDetails.find((c) => c.id === id);

    if (!campaign) {
      return HttpResponse.json(
        {
          success: false,
          message: '캠페인을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: campaign,
      success: true,
    });
  }),
];
