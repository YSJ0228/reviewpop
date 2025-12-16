import { CampaignDetail, CAMPAIGN_CATEGORIES, CAMPAIGN_STATUSES } from '../../types/campaign.types';
import {
  getRandomBoolean,
  getRandomElement,
  getRandomElements,
  getRandomImage,
  getRandomInt,
} from '@/mocks/utils/random';

const LOCATIONS = [
  { sido: '서울', sigungu: '강남구' },
  { sido: '서울', sigungu: '마포구' },
  { sido: '서울', sigungu: '송파구' },
  { sido: '경기', sigungu: '성남시' },
  { sido: '경기', sigungu: '수원시' },
  { sido: '부산', sigungu: '해운대구' },
];

// 지역별 실제 주소 예시
const ADDRESSES_BY_LOCATION: Record<string, string[]> = {
  '서울 강남구': [
    '강남구 테헤란로 152',
    '강남구 역삼동 737',
    '강남구 논현로 508',
    '강남구 선릉로 433',
    '강남구 봉은사로 524',
    '강남구 압구정로 113',
    '강남구 신사동 540',
    '강남구 도산대로 45',
  ],
  '서울 마포구': [
    '마포구 홍익로 3',
    '마포구 상암동 1605',
    '마포구 월드컵북로 396',
    '마포구 합정동 426',
    '마포구 독막로 19',
    '마포구 잔다리로 23',
    '마포구 서교동 395',
    '마포구 와우산로 94',
  ],
  '서울 송파구': [
    '송파구 올림픽로 300',
    '송파구 잠실동 40',
    '송파구 석촌동 180',
    '송파구 문정동 618',
    '송파구 가락동 171',
    '송파구 거여동 112',
    '송파구 방이동 88',
    '송파구 송파대로 111',
  ],
  '경기 성남시': [
    '성남시 분당구 정자일로 95',
    '성남시 분당구 판교역로 235',
    '성남시 분당구 불정로 90',
    '성남시 수정구 수정로 50',
    '성남시 중원구 광명로 290',
    '성남시 분당구 정자동 178',
    '성남시 분당구 야탑동 343',
    '성남시 분당구 서현동 245',
  ],
  '경기 수원시': [
    '수원시 영통구 광교로 42',
    '수원시 영통구 월드컵로 206',
    '수원시 팔달구 중부대로 100',
    '수원시 영통구 원천동 1116',
    '수원시 영통구 광교중앙로 124',
    '수원시 권선구 세권로 108',
    '수원시 영통구 이의동 1319',
    '수원시 팔달구 인계동 1114',
  ],
  '부산 해운대구': [
    '해운대구 해운대해변로 264',
    '해운대구 우동 1394',
    '해운대구 센텀중앙로 97',
    '해운대구 좌동 1270',
    '해운대구 마린시티1로 45',
    '해운대구 중동 1394',
    '해운대구 달맞이길 30',
    '해운대구 송정동 712',
  ],
};

const KEYWORDS = ['맛집', '데이트', '핫플', '가성비', '분위기', '감성', '포토존', '신상'];

// 카테고리별 제목 템플릿
const TITLE_TEMPLATES: Record<string, string[]> = {
  음료: [
    '프리미엄 카페 체험',
    '감성 카페 방문 체험',
    '신상 음료 체험단',
    '핫플 카페 체험',
    '특별한 음료 체험',
  ],
  뷰티: [
    '프리미엄 뷰티 체험',
    '신상 화장품 체험단',
    '뷰티 브랜드 체험',
    '스킨케어 체험',
    '메이크업 체험단',
  ],
  식품: [
    '맛집 탐방 체험',
    '신상 식품 체험단',
    '프리미엄 식품 체험',
    '특별한 맛집 체험',
    '음식 체험단',
  ],
  전자제품: [
    '신상 전자제품 체험',
    '최신 기기 체험단',
    '프리미엄 전자제품 체험',
    '테크 제품 체험',
    '스마트 기기 체험단',
  ],
  건강: [
    '건강 제품 체험',
    '웰니스 체험단',
    '건강식품 체험',
    '라이프스타일 체험',
    '건강 브랜드 체험단',
  ],
  패션: [
    '패션 브랜드 체험',
    '신상 의류 체험단',
    '스타일링 체험',
    '트렌디 패션 체험',
    '프리미엄 패션 체험단',
  ],
  가전: [
    '신상 가전제품 체험',
    '프리미엄 가전 체험단',
    '생활 가전 체험',
    '스마트 가전 체험',
    '최신 가전제품 체험단',
  ],
  향수: [
    '프리미엄 향수 체험',
    '신상 향수 체험단',
    '특별한 향수 체험',
    '브랜드 향수 체험',
    '럭셔리 향수 체험단',
  ],
  액세서리: [
    '액세서리 체험단',
    '신상 액세서리 체험',
    '프리미엄 액세서리 체험',
    '스타일 액세서리 체험단',
    '트렌디 액세서리 체험',
  ],
  생활용품: [
    '생활용품 체험단',
    '신상 생활용품 체험',
    '프리미엄 생활용품 체험',
    '일상용품 체험',
    '라이프스타일 체험단',
  ],
  기타: ['특별 체험단', '신상 제품 체험', '프리미엄 체험', '브랜드 체험단', '특별한 체험'],
};

// 카테고리별 설명 템플릿
const DESCRIPTION_TEMPLATES: Record<string, string[]> = {
  음료: [
    '프리미엄 원두로 내린 특별한 커피와 다양한 음료를 체험해보세요. 감성적인 분위기와 함께 즐기는 특별한 시간을 선사합니다.',
    '신선한 원두와 정성스럽게 내린 음료를 맛볼 수 있는 체험입니다. 다양한 메뉴와 함께하는 특별한 카페 경험을 제공합니다.',
    '트렌디한 카페에서 최신 음료 트렌드를 경험해보세요. 인스타그램에서 화제가 되는 메뉴들을 직접 체험할 수 있습니다.',
    '프리미엄 카페의 특별한 음료와 디저트를 즐길 수 있는 체험입니다. 고급스러운 분위기와 함께하는 특별한 시간을 선사합니다.',
    '다양한 원두와 특별한 레시피로 만든 음료를 체험해보세요. 카페의 감성과 함께하는 특별한 경험을 제공합니다.',
  ],
  뷰티: [
    '최신 뷰티 트렌드를 반영한 프리미엄 화장품을 체험해보세요. 피부에 맞는 제품을 직접 사용해보며 효과를 확인할 수 있습니다.',
    '신상 화장품 라인업을 먼저 경험해보세요. 전문가의 추천과 함께하는 특별한 뷰티 체험을 제공합니다.',
    '고급스러운 뷰티 브랜드의 제품을 직접 체험할 수 있는 기회입니다. 다양한 제품을 테스트하며 나에게 맞는 제품을 찾아보세요.',
    '피부 케어 전문 제품을 체험해보세요. 효과적인 스킨케어 루틴을 경험하며 건강한 피부를 위한 솔루션을 찾을 수 있습니다.',
    '트렌디한 메이크업 제품을 직접 사용해보며 스타일링을 완성해보세요. 다양한 컬러와 텍스처를 경험할 수 있습니다.',
  ],
  식품: [
    '신선한 재료로 만든 맛있는 음식을 체험해보세요. 다양한 메뉴와 함께하는 특별한 식사 경험을 제공합니다.',
    '프리미엄 식품 브랜드의 제품을 직접 맛볼 수 있는 기회입니다. 고품질의 재료로 만든 특별한 맛을 경험해보세요.',
    '인기 맛집의 시그니처 메뉴를 체험해보세요. 정성스럽게 준비된 음식과 함께하는 특별한 식사 시간을 선사합니다.',
    '다양한 요리와 함께하는 특별한 식품 체험입니다. 신선한 재료와 정성스러운 조리로 만든 맛을 경험할 수 있습니다.',
    '트렌디한 음식 문화를 경험해보세요. 최신 푸드 트렌드를 반영한 메뉴들을 직접 맛볼 수 있는 기회입니다.',
  ],
  전자제품: [
    '최신 기술이 적용된 전자제품을 직접 체험해보세요. 혁신적인 기능과 편리함을 경험하며 일상생활의 변화를 느껴보세요.',
    '신상 전자제품을 먼저 사용해볼 수 있는 특별한 기회입니다. 최신 스펙과 기능을 직접 테스트하며 성능을 확인해보세요.',
    '프리미엄 전자제품의 고급스러운 디자인과 뛰어난 성능을 체험해보세요. 일상생활을 더욱 편리하게 만들어줍니다.',
    '스마트한 기능이 탑재된 전자제품을 경험해보세요. 최신 기술을 활용한 제품으로 생활의 질을 향상시킬 수 있습니다.',
    '혁신적인 전자제품을 직접 사용해보며 그 편리함을 경험해보세요. 다양한 기능을 테스트하며 나에게 맞는 제품을 찾아보세요.',
  ],
  건강: [
    '건강한 라이프스타일을 위한 제품을 체험해보세요. 웰빙과 건강을 위한 특별한 솔루션을 경험할 수 있습니다.',
    '프리미엄 건강식품을 직접 섭취해보며 그 효과를 확인해보세요. 영양가 높은 제품으로 건강을 관리할 수 있습니다.',
    '자연 유래 성분으로 만든 건강 제품을 체험해보세요. 안전하고 효과적인 건강 솔루션을 경험할 수 있습니다.',
    '전문가가 추천하는 건강 제품을 직접 사용해보세요. 과학적으로 검증된 성분으로 만든 제품을 경험할 수 있습니다.',
    '건강한 생활을 위한 다양한 제품을 체험해보세요. 웰니스 라이프스타일을 실현할 수 있는 특별한 기회입니다.',
  ],
  패션: [
    '트렌디한 패션 아이템을 직접 착용해보며 스타일링을 완성해보세요. 다양한 디자인과 컬러를 경험할 수 있습니다.',
    '신상 의류 컬렉션을 먼저 체험해보세요. 최신 패션 트렌드를 반영한 아이템으로 스타일을 업그레이드할 수 있습니다.',
    '프리미엄 패션 브랜드의 제품을 직접 착용해보며 그 품질을 경험해보세요. 고급스러운 소재와 디자인을 느낄 수 있습니다.',
    '다양한 스타일링을 시도해보며 나만의 룩을 완성해보세요. 전문 스타일리스트의 조언과 함께하는 특별한 경험입니다.',
    '트렌디한 패션 아이템으로 스타일을 변화시켜보세요. 최신 유행을 반영한 제품으로 새로운 룩을 연출할 수 있습니다.',
  ],
  가전: [
    '최신 가전제품의 편리한 기능을 직접 체험해보세요. 일상생활을 더욱 편리하게 만들어주는 제품을 경험할 수 있습니다.',
    '프리미엄 가전제품의 뛰어난 성능과 디자인을 경험해보세요. 고급스러운 기능으로 생활의 질을 향상시킬 수 있습니다.',
    '스마트한 가전제품을 사용해보며 그 편리함을 느껴보세요. 최신 기술이 적용된 제품으로 효율적인 생활을 경험할 수 있습니다.',
    '혁신적인 가전제품을 직접 사용해보며 생활의 변화를 경험해보세요. 다양한 기능을 테스트하며 나에게 맞는 제품을 찾아보세요.',
    '고품질 가전제품의 뛰어난 성능을 체험해보세요. 오래 사용할 수 있는 제품으로 생활을 더욱 편리하게 만들어줍니다.',
  ],
  향수: [
    '프리미엄 향수의 고급스러운 향을 직접 경험해보세요. 다양한 노트의 조합으로 나만의 특별한 향을 찾을 수 있습니다.',
    '신상 향수 컬렉션을 먼저 체험해보세요. 독특한 향과 지속력으로 하루 종일 기분 좋은 향을 즐길 수 있습니다.',
    '럭셔리 향수 브랜드의 제품을 직접 뿌려보며 그 향을 경험해보세요. 고급스러운 향으로 특별한 하루를 만들어줍니다.',
    '다양한 향수를 테스트해보며 나에게 맞는 향을 찾아보세요. 전문가의 추천과 함께하는 특별한 향수 체험입니다.',
    '트렌디한 향수를 직접 사용해보며 그 매력을 경험해보세요. 독특한 향으로 개성을 표현할 수 있습니다.',
  ],
  액세서리: [
    '트렌디한 액세서리로 스타일을 완성해보세요. 다양한 디자인과 소재를 경험하며 나만의 룩을 연출할 수 있습니다.',
    '신상 액세서리 컬렉션을 먼저 체험해보세요. 최신 트렌드를 반영한 아이템으로 스타일을 업그레이드할 수 있습니다.',
    '프리미엄 액세서리의 고급스러운 디자인을 경험해보세요. 고품질 소재로 만든 제품으로 특별한 스타일을 완성할 수 있습니다.',
    '다양한 액세서리를 착용해보며 다양한 스타일링을 시도해보세요. 전문 스타일리스트의 조언과 함께하는 특별한 경험입니다.',
    '트렌디한 액세서리로 개성을 표현해보세요. 독특한 디자인으로 나만의 스타일을 만들어낼 수 있습니다.',
  ],
  생활용품: [
    '일상생활을 더욱 편리하게 만들어주는 생활용품을 체험해보세요. 실용적이고 효율적인 제품을 경험할 수 있습니다.',
    '신상 생활용품을 먼저 사용해보며 그 편리함을 경험해보세요. 최신 디자인과 기능을 갖춘 제품을 테스트할 수 있습니다.',
    '프리미엄 생활용품의 고급스러운 품질을 경험해보세요. 오래 사용할 수 있는 제품으로 생활의 질을 향상시킬 수 있습니다.',
    '다양한 생활용품을 직접 사용해보며 나에게 맞는 제품을 찾아보세요. 실용적이고 효율적인 솔루션을 경험할 수 있습니다.',
    '트렌디한 생활용품으로 일상생활을 변화시켜보세요. 최신 디자인과 기능을 갖춘 제품으로 더 나은 생활을 경험할 수 있습니다.',
  ],
  기타: [
    '특별한 제품을 직접 체험해보며 그 매력을 경험해보세요. 다양한 제품을 테스트하며 나에게 맞는 것을 찾을 수 있습니다.',
    '신상 제품을 먼저 경험해보세요. 최신 트렌드를 반영한 제품으로 특별한 경험을 할 수 있습니다.',
    '프리미엄 제품의 고급스러운 품질을 직접 경험해보세요. 고품질의 제품으로 생활의 질을 향상시킬 수 있습니다.',
    '브랜드의 특별한 제품을 체험해보며 그 가치를 경험해보세요. 다양한 제품을 테스트하며 나에게 맞는 것을 찾아보세요.',
    '특별한 제품으로 새로운 경험을 해보세요. 독특한 제품을 직접 사용하며 그 매력을 느낄 수 있습니다.',
  ],
};

const createRandomCampaign = (index: number): CampaignDetail => {
  const category = getRandomElement([...CAMPAIGN_CATEGORIES]);
  const status = getRandomElement([...CAMPAIGN_STATUSES]);
  const location = getRandomElement(LOCATIONS);

  // 기준일: 현재 시간
  const NOW = new Date();

  const appStart = new Date(NOW);
  const appEnd = new Date(NOW);
  let annStart = new Date(NOW);
  let reviewStart = new Date(NOW);
  let reviewEnd = new Date(NOW);

  // 상태별 날짜 로직 적용
  switch (status) {
    case 'beforeRecruiting':
      // 모집 전: 시작일은 미래 (1시간 ~ 3일 뒤)
      appStart.setTime(NOW.getTime() + getRandomInt(1, 72) * 60 * 60 * 1000);
      appEnd.setDate(appStart.getDate() + getRandomInt(7, 14));
      break;

    case 'recruiting':
      // 모집 중: 시작일은 과거, 종료일은 미래
      appStart.setDate(NOW.getDate() - getRandomInt(1, 7));
      appEnd.setDate(NOW.getDate() + getRandomInt(1, 7));
      break;

    case 'completed':
      // 완료: 리뷰 마감일이 과거
      reviewEnd.setDate(NOW.getDate() - getRandomInt(1, 30));
      // 역산하여 나머지 날짜 설정
      reviewStart.setDate(reviewEnd.getDate() - getRandomInt(14, 21));
      annStart.setDate(reviewStart.getDate() - getRandomInt(1, 3));
      appEnd.setDate(annStart.getDate() - getRandomInt(1, 3));
      appStart.setDate(appEnd.getDate() - getRandomInt(7, 14));
      break;

    default:
      // 그 외 (inProgress, closed 등): 일반적인 흐름 (모집 종료 ~ 리뷰 마감 전)
      // 모집은 끝났고(과거), 리뷰는 아직 안 끝났거나 진행 중
      appEnd.setDate(NOW.getDate() - getRandomInt(1, 7));
      appStart.setDate(appEnd.getDate() - getRandomInt(7, 14));
      break;
  }

  // completed가 아닌 경우 나머지 날짜 순차 계산 (recruiting, beforeRecruiting 등)
  if (status !== 'completed') {
    // 모집 기간 설정됨 -> 발표일 설정
    annStart = new Date(appEnd);
    annStart.setDate(appEnd.getDate() + getRandomInt(1, 3));

    // 리뷰 기간 설정
    reviewStart = new Date(annStart);
    reviewStart.setDate(annStart.getDate() + getRandomInt(1, 3));
    reviewEnd = new Date(reviewStart);
    reviewEnd.setDate(reviewStart.getDate() + getRandomInt(14, 21));
  }

  const annEnd = new Date(annStart); // 발표는 당일 마감 혹은 하루

  // 제목 생성
  const templates = TITLE_TEMPLATES[category] || TITLE_TEMPLATES['기타'];
  const title = getRandomElement(templates);

  return {
    id: String(index),
    title,
    brand: `브랜드_${index}`,
    thumbnail: `/images/temp/CampaignCardImg-0${getRandomInt(1, 3)}.jpg`,
    detailImages: Array(6 + Math.floor(Math.random() * 10))
      .fill('')
      .map(() =>
        getRandomImage(
          400 + Math.floor(Math.random() * 400),
          400 + Math.floor(Math.random() * 400),
        ),
      ),
    description: (() => {
      const descriptions = DESCRIPTION_TEMPLATES[category] || DESCRIPTION_TEMPLATES['기타'];
      return getRandomElement(descriptions);
    })(),
    status,
    category,
    schedule: {
      application: {
        start: appStart.toISOString(),
        end: appEnd.toISOString(),
      },
      winnerAnnouncement: {
        start: annStart.toISOString(),
        end: annEnd.toISOString(),
      },
      review: {
        start: reviewStart.toISOString(),
        end: reviewEnd.toISOString(),
      },
    },
    location,
    address: (() => {
      const locationKey = `${location.sido} ${location.sigungu}`;
      const addresses = ADDRESSES_BY_LOCATION[locationKey] || [
        `${location.sido} ${location.sigungu} 상세주소`,
      ];
      return getRandomElement(addresses);
    })(),
    maxRecruitment: getRandomInt(5, 20),
    currentRecruitment: getRandomInt(0, 50),
    selectedCount: status === 'recruiting' ? 0 : getRandomInt(5, 20),
    providedItem: `${category} 관련 제공 상품 세트`,
    reservationPrecaution: ['예약은 필수입니다.', '노쇼 시 불이익이 있을 수 있습니다.'],

    // 상세 정보 (CampaignDetail)
    estimatedValue: (() => {
      const value = getRandomInt(10000, 100000);
      // 천원 단위 이하를 0으로 처리
      return Math.floor(value / 1000) * 1000;
    })(),
    keywords: getRandomElements(KEYWORDS, 3),
    visitReservation: {
      businessHours: [
        { start: '09:00', end: '22:00' },
        { start: '09:00', end: '22:00' },
        { start: '09:00', end: '22:00' },
        { start: '09:00', end: '22:00' },
        { start: '09:00', end: '22:00' },
        { start: '10:00', end: '23:00' },
        'closed',
      ],
      isReservationRequired: getRandomBoolean(),
      reservationMethod: '전화 예약',
      visitReservationNotice: '방문 전 예약 필수입니다.',
    },
    reviewMission: [
      '매장 내/외부 사진 5장 이상',
      '메뉴 사진 3장 이상',
      '지도 첨부 필수',
      '키워드 3개 이상 포함',
    ],
    reviewMissionNotice: '가이드라인을 준수하지 않을 경우 수정 요청이 있을 수 있습니다.',
    requirements: ['블로그 일 방문자 100명 이상', '성실하게 리뷰 작성해주실 분'],
    precautions: ['타 쿠폰 중복 사용 불가', '주말/공휴일 사용 불가'],
  };
};

export const INITIAL_CAMPAIGNS: CampaignDetail[] = Array.from({ length: 50 }, (_, i) =>
  createRandomCampaign(i),
);
