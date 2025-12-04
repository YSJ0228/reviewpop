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

const KEYWORDS = ['맛집', '데이트', '핫플', '가성비', '분위기', '감성', '포토존', '신상'];

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

  return {
    id: `campaign_${index}`,
    title: `${location.sido} ${location.sigungu} 방문 체험단 모집 ${index + 1}`,
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
    description: `이 캠페인은 ${category} 카테고리의 ${index + 1}번째 체험단입니다.`,
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
    address: `${location.sido} ${location.sigungu} 상세주소 123`,
    maxRecruitment: getRandomInt(5, 20),
    currentRecruitment: getRandomInt(0, 50),
    selectedCount: status === 'recruiting' ? 0 : getRandomInt(5, 20),
    providedItem: `${category} 관련 제공 상품 세트`,
    reservationPrecaution: ['예약은 필수입니다.', '노쇼 시 불이익이 있을 수 있습니다.'],

    // 상세 정보 (CampaignDetail)
    estimatedValue: getRandomInt(10000, 100000),
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
