// /**
//  * Mock 리뷰 데이터
//  *
//  * 테스트 및 개발용 가짜 리뷰 데이터입니다.
//  * 총 50개의 리뷰로 다양한 체험과 사용자 평가를 시뮬레이션합니다.
//  */

import { ReviewRequest } from '@entities/review';

// import type { Review } from '@entities/review/types/review.types';
// import { findUserById } from './users';

// /**
//  * 사용자 정보 헬퍼 함수
//  */
// function getUserInfo(userId: string) {
//   const user = findUserById(userId);
//   if (!user) throw new Error(`User not found: ${userId}`);
//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     profileImage: user.profileImage || '',
//   };
// }

// /**
//  * 리뷰 Mock 데이터
//  *
//  * 체험별 분포:
//  * - 완료된 체험 (13, 14, 15): 각 10개씩
//  * - 배송 완료된 체험 (9, 10, 11): 각 5-7개씩
//  */
// export const mockReviews: Review[] = [
//   // Campaign #13 리뷰 (10개) - 프리미엄 초콜릿
//   {
//     id: 1,
//     campaignId: '13',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 5,
//     title: '정말 고급스러운 초콜릿이에요',
//     content:
//       '페레로로쉐는 역시 명품 초콜릿이네요. 헤이즐넛 향이 정말 좋고, 선물용으로 완벽합니다. 포장도 고급스러워서 특별한 날 선물하기 딱 좋아요.',
//     images: [
//       'https://picsum.photos/seed/review-1-1/800/600',
//       'https://picsum.photos/seed/review-1-2/800/600',
//     ],
//     createdAt: '2025-09-28T14:30:00Z',
//     updatedAt: '2025-09-28T14:30:00Z',
//   },
//   {
//     id: 2,
//     campaignId: '13',
//     userId: 'kakao-1001',
//     user: getUserInfo('kakao-1001'),
//     rating: 5,
//     title: '맛도 좋고 포장도 예뻐요',
//     content: '달달하면서도 고급스러운 맛입니다. 초콜릿 좋아하시는 분들께 강추!',
//     images: ['https://picsum.photos/seed/review-2-1/800/600'],
//     createdAt: '2025-09-29T10:15:00Z',
//     updatedAt: '2025-09-29T10:15:00Z',
//   },
//   {
//     id: 3,
//     campaignId: '13',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 4,
//     title: '가격이 조금 부담되긴 하지만 맛은 확실해요',
//     content: '맛과 품질은 최고지만 가격대가 있어서 자주 먹기엔 부담스럽네요.',
//     images: [],
//     createdAt: '2025-09-29T15:20:00Z',
//     updatedAt: '2025-09-29T15:20:00Z',
//   },
//   {
//     id: 4,
//     campaignId: '13',
//     userId: 'naver-2001',
//     user: getUserInfo('naver-2001'),
//     rating: 5,
//     title: '선물 받으신 분이 엄청 좋아하셨어요',
//     content: '어머니 생신 선물로 드렸는데 너무 좋아하셨습니다. 다음에 또 주문할게요!',
//     images: [
//       'https://picsum.photos/seed/review-4-1/800/600',
//       'https://picsum.photos/seed/review-4-2/800/600',
//       'https://picsum.photos/seed/review-4-3/800/600',
//     ],
//     createdAt: '2025-09-30T09:00:00Z',
//     updatedAt: '2025-09-30T09:00:00Z',
//   },
//   {
//     id: 5,
//     campaignId: '13',
//     userId: 'kakao-1004',
//     user: getUserInfo('kakao-1004'),
//     rating: 5,
//     title: '명품 초콜릿의 정석',
//     content: '페레로로쉐는 실패가 없어요. 언제 먹어도 맛있고 포장도 고급스럽습니다.',
//     images: ['https://picsum.photos/seed/review-5-1/800/600'],
//     createdAt: '2025-10-01T11:30:00Z',
//     updatedAt: '2025-10-01T11:30:00Z',
//   },
//   {
//     id: 6,
//     campaignId: '13',
//     userId: 'naver-2003',
//     user: getUserInfo('naver-2003'),
//     rating: 4,
//     title: '달달한 게 좋아요',
//     content: '단 걸 좋아하는 저로서는 딱 맞는 달콤함이에요. 커피랑 같이 먹으니 더 맛있네요.',
//     images: [],
//     createdAt: '2025-10-02T14:00:00Z',
//     updatedAt: '2025-10-02T14:00:00Z',
//   },
//   {
//     id: 7,
//     campaignId: '13',
//     userId: 'kakao-1005',
//     user: getUserInfo('kakao-1005'),
//     rating: 5,
//     title: '재구매 의사 100%',
//     content: '너무 맛있어서 다 먹고 바로 재주문했습니다. 헤이즐넛 향이 정말 일품이에요!',
//     images: ['https://picsum.photos/seed/review-7-1/800/600'],
//     createdAt: '2025-10-03T10:20:00Z',
//     updatedAt: '2025-10-03T10:20:00Z',
//   },
//   {
//     id: 8,
//     campaignId: '13',
//     userId: 'naver-2005',
//     user: getUserInfo('naver-2005'),
//     rating: 3,
//     title: '평범해요',
//     content: '유명한 초콜릿이라 기대했는데 생각보다 평범했어요. 나쁘진 않지만 감동은 없었습니다.',
//     images: [],
//     createdAt: '2025-10-04T09:15:00Z',
//     updatedAt: '2025-10-04T09:15:00Z',
//   },
//   {
//     id: 9,
//     campaignId: '13',
//     userId: 'kakao-1006',
//     user: getUserInfo('kakao-1006'),
//     rating: 5,
//     title: '초콜릿 중에 최고',
//     content: '여러 초콜릿 먹어봤지만 페레로로쉐가 제일 맛있어요. 선물용으로도 완벽!',
//     images: [
//       'https://picsum.photos/seed/review-9-1/800/600',
//       'https://picsum.photos/seed/review-9-2/800/600',
//     ],
//     createdAt: '2025-10-05T16:40:00Z',
//     updatedAt: '2025-10-05T16:40:00Z',
//   },
//   {
//     id: 10,
//     campaignId: '13',
//     userId: 'kakao-1007',
//     user: getUserInfo('kakao-1007'),
//     rating: 4,
//     title: '헤이즐넛 향이 진해요',
//     content:
//       '헤이즐넛 좋아하시는 분들은 무조건 만족하실 거예요. 저는 약간 달긴 했지만 맛있었습니다.',
//     images: [],
//     createdAt: '2025-10-06T13:25:00Z',
//     updatedAt: '2025-10-06T13:25:00Z',
//   },

//   // Campaign #14 리뷰 (10개) - 조말론 향수
//   {
//     id: 11,
//     campaignId: '14',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 5,
//     title: '조말론 향수 역시 명품이네요',
//     content:
//       '향이 정말 은은하고 오래 지속돼요. 여름에도 부담없이 뿌릴 수 있는 향이라 좋습니다. 바디로션도 함께 받았는데 세트로 사용하니 더 좋아요.',
//     images: [
//       'https://picsum.photos/seed/review-11-1/800/600',
//       'https://picsum.photos/seed/review-11-2/800/600',
//       'https://picsum.photos/seed/review-11-3/800/600',
//     ],
//     createdAt: '2025-09-23T10:30:00Z',
//     updatedAt: '2025-09-23T10:30:00Z',
//   },
//   {
//     id: 12,
//     campaignId: '14',
//     userId: 'kakao-1001',
//     user: getUserInfo('kakao-1001'),
//     rating: 5,
//     title: '향이 정말 고급스러워요',
//     content: '뿌리자마자 주변에서 무슨 향수냐고 물어봤어요. 향이 너무 좋습니다!',
//     images: ['https://picsum.photos/seed/review-12-1/800/600'],
//     createdAt: '2025-09-24T14:15:00Z',
//     updatedAt: '2025-09-24T14:15:00Z',
//   },
//   {
//     id: 13,
//     campaignId: '14',
//     userId: 'naver-2002',
//     user: getUserInfo('naver-2002'),
//     rating: 4,
//     title: '지속력이 좋아요',
//     content: '아침에 뿌리면 저녁까지 은은하게 향이 남아있어요. 가격대는 있지만 만족합니다.',
//     images: [],
//     createdAt: '2025-09-25T09:45:00Z',
//     updatedAt: '2025-09-25T09:45:00Z',
//   },
//   {
//     id: 14,
//     campaignId: '14',
//     userId: 'kakao-1003',
//     user: getUserInfo('kakao-1003'),
//     rating: 5,
//     title: '시그니처 향으로 삼았어요',
//     content: '너무 맘에 들어서 제 시그니처 향수로 정했습니다. 계속 리필할 예정이에요!',
//     images: [
//       'https://picsum.photos/seed/review-14-1/800/600',
//       'https://picsum.photos/seed/review-14-2/800/600',
//     ],
//     createdAt: '2025-09-26T11:20:00Z',
//     updatedAt: '2025-09-26T11:20:00Z',
//   },
//   {
//     id: 15,
//     campaignId: '14',
//     userId: 'naver-2004',
//     user: getUserInfo('naver-2004'),
//     rating: 4,
//     title: '샘플부터 써보고 정품 구매했어요',
//     content: '샘플로 먼저 써봤는데 너무 좋아서 정품 샀습니다. 향이 은은하고 세련돼요.',
//     images: ['https://picsum.photos/seed/review-15-1/800/600'],
//     createdAt: '2025-09-27T15:30:00Z',
//     updatedAt: '2025-09-27T15:30:00Z',
//   },
//   {
//     id: 16,
//     campaignId: '14',
//     userId: 'kakao-1008',
//     user: getUserInfo('kakao-1008'),
//     rating: 5,
//     title: '사계절 다 어울리는 향',
//     content: '계절 구분 없이 사용할 수 있는 향이에요. 특히 봄, 가을에 정말 잘 어울립니다.',
//     images: [],
//     createdAt: '2025-09-28T10:10:00Z',
//     updatedAt: '2025-09-28T10:10:00Z',
//   },
//   {
//     id: 17,
//     campaignId: '14',
//     userId: 'naver-2006',
//     user: getUserInfo('naver-2006'),
//     rating: 3,
//     title: '제 취향은 아니었어요',
//     content: '향 자체는 좋은데 제 취향과는 맞지 않았습니다. 너무 달콤한 느낌이에요.',
//     images: [],
//     createdAt: '2025-09-29T13:40:00Z',
//     updatedAt: '2025-09-29T13:40:00Z',
//   },
//   {
//     id: 18,
//     campaignId: '14',
//     userId: 'kakao-1009',
//     user: getUserInfo('kakao-1009'),
//     rating: 5,
//     title: '선물로 주기 완벽해요',
//     content: '친구 생일 선물로 줬는데 엄청 좋아했어요. 포장도 예쁘고 향도 고급스럽습니다.',
//     images: ['https://picsum.photos/seed/review-18-1/800/600'],
//     createdAt: '2025-09-30T14:50:00Z',
//     updatedAt: '2025-09-30T14:50:00Z',
//   },
//   {
//     id: 19,
//     campaignId: '14',
//     userId: 'naver-2007',
//     user: getUserInfo('naver-2007'),
//     rating: 4,
//     title: '향이 은은해서 좋아요',
//     content: '너무 강하지 않고 은은해서 좋습니다. 사무실에서 뿌리기에도 부담 없어요.',
//     images: [],
//     createdAt: '2025-10-01T09:20:00Z',
//     updatedAt: '2025-10-01T09:20:00Z',
//   },
//   {
//     id: 20,
//     campaignId: '14',
//     userId: 'naver-2008',
//     user: getUserInfo('naver-2008'),
//     rating: 5,
//     title: '명품 향수의 정석',
//     content: '조말론은 역시 실패가 없네요. 향수 고민하시는 분들께 추천합니다!',
//     images: [
//       'https://picsum.photos/seed/review-20-1/800/600',
//       'https://picsum.photos/seed/review-20-2/800/600',
//     ],
//     createdAt: '2025-10-02T16:15:00Z',
//     updatedAt: '2025-10-02T16:15:00Z',
//   },

//   // Campaign #15 리뷰 (10개) - 카카오프렌즈 케이스
//   {
//     id: 21,
//     campaignId: '15',
//     userId: 'naver-2001',
//     user: getUserInfo('naver-2001'),
//     rating: 5,
//     title: '라이언 케이스 너무 귀여워요',
//     content:
//       '라이언 좋아해서 샀는데 실물이 더 귀엽네요! 케이스 두께도 적당하고 버튼 작동도 잘 됩니다. 캐릭터 굿즈 좋아하시는 분들께 추천!',
//     images: [
//       'https://picsum.photos/seed/review-21-1/800/600',
//       'https://picsum.photos/seed/review-21-2/800/600',
//     ],
//     createdAt: '2025-09-18T10:30:00Z',
//     updatedAt: '2025-09-18T10:30:00Z',
//   },
//   {
//     id: 22,
//     campaignId: '15',
//     userId: 'naver-2001',
//     user: getUserInfo('naver-2001'),
//     rating: 4,
//     title: '귀엽고 실용적이에요',
//     content: '귀여운 디자인에 보호 기능도 좋아요. 다만 미끄러운 편이라 조심해야 할 것 같아요.',
//     images: ['https://picsum.photos/seed/review-22-1/800/600'],
//     createdAt: '2025-09-19T14:20:00Z',
//     updatedAt: '2025-09-19T14:20:00Z',
//   },
//   {
//     id: 23,
//     campaignId: '15',
//     userId: 'kakao-1001',
//     user: getUserInfo('kakao-1001'),
//     rating: 5,
//     title: '어피치 케이스 완전 귀여워요',
//     content: '어피치 팬이라 샀는데 너무 만족스럽습니다. 색상도 예쁘고 케이스 품질도 좋아요!',
//     images: [],
//     createdAt: '2025-09-20T09:45:00Z',
//     updatedAt: '2025-09-20T09:45:00Z',
//   },
//   {
//     id: 24,
//     campaignId: '15',
//     userId: 'kakao-1004',
//     user: getUserInfo('kakao-1004'),
//     rating: 4,
//     title: '튼튼하고 귀여워요',
//     content: '떨어뜨려도 폰이 잘 보호될 것 같아요. 디자인도 마음에 들고 만족합니다.',
//     images: ['https://picsum.photos/seed/review-24-1/800/600'],
//     createdAt: '2025-09-21T11:15:00Z',
//     updatedAt: '2025-09-21T11:15:00Z',
//   },
//   {
//     id: 25,
//     campaignId: '15',
//     userId: 'naver-2003',
//     user: getUserInfo('naver-2003'),
//     rating: 5,
//     title: '무지 케이스도 귀여워요',
//     content: '무지 좋아해서 샀는데 실물이 더 귀엽네요. 친구한테도 추천했어요!',
//     images: [
//       'https://picsum.photos/seed/review-25-1/800/600',
//       'https://picsum.photos/seed/review-25-2/800/600',
//       'https://picsum.photos/seed/review-25-3/800/600',
//     ],
//     createdAt: '2025-09-22T13:50:00Z',
//     updatedAt: '2025-09-22T13:50:00Z',
//   },
//   {
//     id: 26,
//     campaignId: '15',
//     userId: 'kakao-1005',
//     user: getUserInfo('kakao-1005'),
//     rating: 3,
//     title: '귀엽긴 한데 좀 두꺼워요',
//     content: '디자인은 마음에 드는데 케이스가 생각보다 두껍네요. 주머니에 넣기 불편해요.',
//     images: [],
//     createdAt: '2025-09-23T10:25:00Z',
//     updatedAt: '2025-09-23T10:25:00Z',
//   },
//   {
//     id: 27,
//     campaignId: '15',
//     userId: 'naver-2005',
//     user: getUserInfo('naver-2005'),
//     rating: 5,
//     title: '제이지 케이스 강추!',
//     content: '제이지 캐릭터 진짜 귀여워요. 케이스 품질도 좋고 만족스럽습니다!',
//     images: ['https://picsum.photos/seed/review-27-1/800/600'],
//     createdAt: '2025-09-24T15:40:00Z',
//     updatedAt: '2025-09-24T15:40:00Z',
//   },
//   {
//     id: 28,
//     campaignId: '15',
//     userId: 'kakao-1007',
//     user: getUserInfo('kakao-1007'),
//     rating: 4,
//     title: '스티커까지 받아서 좋아요',
//     content: '케이스도 귀엽고 스티커 세트까지 받아서 더 좋았어요. 가성비 좋습니다!',
//     images: [],
//     createdAt: '2025-09-25T09:10:00Z',
//     updatedAt: '2025-09-25T09:10:00Z',
//   },
//   {
//     id: 29,
//     campaignId: '15',
//     userId: 'naver-2007',
//     user: getUserInfo('naver-2007'),
//     rating: 5,
//     title: '튜브 케이스 사용 중이에요',
//     content: '튜브 캐릭터 팬이라 샀는데 너무 만족해요. 주변에서 다 예쁘다고 하네요!',
//     images: ['https://picsum.photos/seed/review-29-1/800/600'],
//     createdAt: '2025-09-26T14:30:00Z',
//     updatedAt: '2025-09-26T14:30:00Z',
//   },
//   {
//     id: 30,
//     campaignId: '15',
//     userId: 'kakao-1009',
//     user: getUserInfo('kakao-1009'),
//     rating: 5,
//     title: '재구매했어요',
//     content: '너무 맘에 들어서 다른 캐릭터로 하나 더 샀습니다. 캐릭터별로 모으고 싶어요!',
//     images: [
//       'https://picsum.photos/seed/review-30-1/800/600',
//       'https://picsum.photos/seed/review-30-2/800/600',
//     ],
//     createdAt: '2025-09-27T11:55:00Z',
//     updatedAt: '2025-09-27T11:55:00Z',
//   },

//   // Campaign #9 리뷰 (3개) - 스마트 홈 기기
//   {
//     id: 31,
//     campaignId: '9',
//     userId: 'kakao-1001',
//     user: getUserInfo('kakao-1001'),
//     rating: 5,
//     title: 'LG 스마트 홈 정말 편리해요',
//     content:
//       '설치도 쉽고 앱 연동도 간편합니다. 집에 오기 전에 미리 에어컨 켜놓을 수 있어서 너무 좋아요. 스마트 플러그로 전기료도 절약할 수 있을 것 같습니다.',
//     images: [
//       'https://picsum.photos/seed/review-31-1/800/600',
//       'https://picsum.photos/seed/review-31-2/800/600',
//     ],
//     createdAt: '2025-10-21T10:30:00Z',
//     updatedAt: '2025-10-21T10:30:00Z',
//   },
//   {
//     id: 32,
//     campaignId: '9',
//     userId: 'naver-2002',
//     user: getUserInfo('naver-2002'),
//     rating: 4,
//     title: '설치가 생각보다 쉬워요',
//     content:
//       '처음엔 어려울 줄 알았는데 매뉴얼대로 하니까 금방 설치했어요. 음성 명령도 잘 인식합니다.',
//     images: ['https://picsum.photos/seed/review-32-1/800/600'],
//     createdAt: '2025-10-22T14:15:00Z',
//     updatedAt: '2025-10-22T14:15:00Z',
//   },
//   {
//     id: 33,
//     campaignId: '9',
//     userId: 'kakao-1006',
//     user: getUserInfo('kakao-1006'),
//     rating: 5,
//     title: '스마트 홈 입문용으로 최고',
//     content: '스마트 홈 처음 써보는데 정말 편리하네요. 센서들도 반응이 빠르고 만족스럽습니다!',
//     images: [],
//     createdAt: '2025-10-23T09:40:00Z',
//     updatedAt: '2025-10-23T09:40:00Z',
//   },

//   // Campaign #10 리뷰 (5개) - 프리미엄 요거트
//   {
//     id: 34,
//     campaignId: '10',
//     userId: 'naver-2001',
//     user: getUserInfo('naver-2001'),
//     rating: 5,
//     title: '빙그레 요거트 역시 맛있어요',
//     content:
//       '진하고 부드러운 맛이 일품입니다. 그래놀라랑 같이 먹으니 아침 식사로 딱이에요. 신선도도 좋고 유통기한도 넉넉해서 좋습니다.',
//     images: [
//       'https://picsum.photos/seed/review-34-1/800/600',
//       'https://picsum.photos/seed/review-34-2/800/600',
//     ],
//     createdAt: '2025-10-16T10:20:00Z',
//     updatedAt: '2025-10-16T10:20:00Z',
//   },
//   {
//     id: 35,
//     campaignId: '10',
//     userId: 'kakao-1006',
//     user: getUserInfo('kakao-1006'),
//     rating: 4,
//     title: '건강한 아침 식사',
//     content: '과일이랑 같이 먹으면 정말 맛있어요. 가족 모두 만족하고 있습니다.',
//     images: ['https://picsum.photos/seed/review-35-1/800/600'],
//     createdAt: '2025-10-17T09:15:00Z',
//     updatedAt: '2025-10-17T09:15:00Z',
//   },
//   {
//     id: 36,
//     campaignId: '10',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 5,
//     title: '진하고 고소해요',
//     content: '시판 요거트 중에 제일 맛있는 것 같아요. 신맛도 적당하고 진해서 좋습니다!',
//     images: [],
//     createdAt: '2025-10-18T11:30:00Z',
//     updatedAt: '2025-10-18T11:30:00Z',
//   },
//   {
//     id: 37,
//     campaignId: '10',
//     userId: 'naver-2004',
//     user: getUserInfo('naver-2004'),
//     rating: 4,
//     title: '아이들이 좋아해요',
//     content: '아이들 간식으로 주는데 잘 먹습니다. 건강한 재료라 안심하고 줄 수 있어요.',
//     images: ['https://picsum.photos/seed/review-37-1/800/600'],
//     createdAt: '2025-10-19T14:50:00Z',
//     updatedAt: '2025-10-19T14:50:00Z',
//   },
//   {
//     id: 38,
//     campaignId: '10',
//     userId: 'kakao-1008',
//     user: getUserInfo('kakao-1008'),
//     rating: 5,
//     title: '다이어트 중인데 딱이에요',
//     content: '저칼로리에 고단백이라 다이어트 하면서 먹기 좋아요. 맛도 좋고 포만감도 있습니다.',
//     images: [],
//     createdAt: '2025-10-20T10:10:00Z',
//     updatedAt: '2025-10-20T10:10:00Z',
//   },

//   // Campaign #11 리뷰 (5개) - 샴푸
//   {
//     id: 39,
//     campaignId: '11',
//     userId: 'kakao-1001',
//     user: getUserInfo('kakao-1001'),
//     rating: 5,
//     title: '아모레 샴푸 향이 좋아요',
//     content:
//       '사용한 지 2주 됐는데 머리결이 부드러워진 느낌이에요. 향도 은은하고 오래 지속되네요. 탈모 예방 효과도 기대하고 있습니다.',
//     images: [
//       'https://picsum.photos/seed/review-39-1/800/600',
//       'https://picsum.photos/seed/review-39-2/800/600',
//     ],
//     createdAt: '2025-10-13T10:30:00Z',
//     updatedAt: '2025-10-13T10:30:00Z',
//   },
//   {
//     id: 40,
//     campaignId: '11',
//     userId: 'kakao-1008',
//     user: getUserInfo('kakao-1008'),
//     rating: 4,
//     title: '두피가 깨끗해진 느낌',
//     content: '샴푸 후 두피가 시원하고 깨끗한 느낌이에요. 거품도 풍성하고 헹굼도 잘 되네요.',
//     images: ['https://picsum.photos/seed/review-40-1/800/600'],
//     createdAt: '2025-10-14T14:20:00Z',
//     updatedAt: '2025-10-14T14:20:00Z',
//   },
//   {
//     id: 41,
//     campaignId: '11',
//     userId: 'kakao-1004',
//     user: getUserInfo('kakao-1004'),
//     rating: 5,
//     title: '트리트먼트 세트로 쓰니 더 좋아요',
//     content: '샴푸랑 트리트먼트 같이 쓰니까 효과가 배가 되는 것 같아요. 머리결이 정말 좋아졌어요!',
//     images: [],
//     createdAt: '2025-10-15T09:45:00Z',
//     updatedAt: '2025-10-15T09:45:00Z',
//   },
//   {
//     id: 42,
//     campaignId: '11',
//     userId: 'naver-2006',
//     user: getUserInfo('naver-2006'),
//     rating: 3,
//     title: '제 두피엔 좀 자극적이었어요',
//     content:
//       '향은 좋은데 제 두피에는 약간 자극적인 느낌이었어요. 민감성 두피는 패치테스트 추천합니다.',
//     images: [],
//     createdAt: '2025-10-16T11:10:00Z',
//     updatedAt: '2025-10-16T11:10:00Z',
//   },
//   {
//     id: 43,
//     campaignId: '11',
//     userId: 'kakao-1003',
//     user: getUserInfo('kakao-1003'),
//     rating: 4,
//     title: '가성비 좋은 샴푸',
//     content: '가격 대비 품질이 좋아요. 매일 사용하기 부담없는 가격이라 만족합니다.',
//     images: ['https://picsum.photos/seed/review-43-1/800/600'],
//     createdAt: '2025-10-17T15:35:00Z',
//     updatedAt: '2025-10-17T15:35:00Z',
//   },

//   // Campaign #12 리뷰 (2개) - 다이슨 청소기
//   {
//     id: 44,
//     campaignId: '12',
//     userId: 'kakao-1009',
//     user: getUserInfo('kakao-1009'),
//     rating: 5,
//     title: '다이슨 청소기 흡입력 최고',
//     content:
//       '무선이라 정말 편리하고 흡입력도 강력합니다. 침대 매트리스 청소할 때 먼지가 얼마나 많이 나오는지 놀랐어요. 배터리 수명도 충분하고 소음도 생각보다 적습니다. 비싸지만 그만한 가치가 있는 제품이에요.',
//     images: [
//       'https://picsum.photos/seed/review-44-1/800/600',
//       'https://picsum.photos/seed/review-44-2/800/600',
//       'https://picsum.photos/seed/review-44-3/800/600',
//     ],
//     createdAt: '2025-10-09T11:20:00Z',
//     updatedAt: '2025-10-09T11:20:00Z',
//   },
//   {
//     id: 45,
//     campaignId: '12',
//     userId: 'naver-2003',
//     user: getUserInfo('naver-2003'),
//     rating: 4,
//     title: '무선이라 정말 편해요',
//     content:
//       '무선 청소기 처음 써보는데 정말 편리하네요. 다양한 헤드가 있어서 용도에 맞게 사용할 수 있어요. 다만 가격이 좀 부담스럽긴 합니다.',
//     images: ['https://picsum.photos/seed/review-45-1/800/600'],
//     createdAt: '2025-10-10T14:45:00Z',
//     updatedAt: '2025-10-10T14:45:00Z',
//   },

//   // Campaign #6 리뷰 (3개) - 이니스프리 화장품
//   {
//     id: 46,
//     campaignId: '6',
//     userId: 'naver-2001',
//     user: getUserInfo('naver-2001'),
//     rating: 5,
//     title: '자연주의 화장품 최고',
//     content:
//       '이니스프리는 역시 믿고 쓰는 브랜드에요. 제주 녹차 성분이 들어가서 피부가 진정되는 느낌입니다. 순하면서도 효과가 좋아요.',
//     images: [
//       'https://picsum.photos/seed/review-46-1/800/600',
//       'https://picsum.photos/seed/review-46-2/800/600',
//     ],
//     createdAt: '2025-10-29T10:30:00Z',
//     updatedAt: '2025-10-29T10:30:00Z',
//   },
//   {
//     id: 47,
//     campaignId: '6',
//     userId: 'kakao-1004',
//     user: getUserInfo('kakao-1004'),
//     rating: 4,
//     title: '피부가 촉촉해졌어요',
//     content: '2주 사용했는데 피부 수분감이 좋아진 것 같아요. 자극도 없고 만족스럽습니다.',
//     images: ['https://picsum.photos/seed/review-47-1/800/600'],
//     createdAt: '2025-10-30T14:15:00Z',
//     updatedAt: '2025-10-30T14:15:00Z',
//   },
//   {
//     id: 48,
//     campaignId: '6',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 5,
//     title: '민감성 피부에도 좋아요',
//     content: '민감성 피부인데 자극 없이 잘 맞네요. 클렌징 폼도 부드럽고 좋습니다!',
//     images: [],
//     createdAt: '2025-10-31T09:45:00Z',
//     updatedAt: '2025-10-31T09:45:00Z',
//   },

//   // Campaign #8 리뷰 (2개) - 나이키 운동화
//   {
//     id: 49,
//     campaignId: '8',
//     userId: 'kakao-1002',
//     user: getUserInfo('kakao-1002'),
//     rating: 5,
//     title: '나이키 신상 운동화 정말 편해요',
//     content:
//       '착용감이 구름 위를 걷는 것처럼 부드럽습니다. 러닝할 때 발 충격도 잘 흡수되고, 디자인도 세련돼서 일상 착용으로도 좋아요. 역시 나이키는 믿고 삽니다!',
//     images: [
//       'https://picsum.photos/seed/review-49-1/800/600',
//       'https://picsum.photos/seed/review-49-2/800/600',
//     ],
//     createdAt: '2025-10-24T11:30:00Z',
//     updatedAt: '2025-10-24T11:30:00Z',
//   },
//   {
//     id: 50,
//     campaignId: '8',
//     userId: 'kakao-1005',
//     user: getUserInfo('kakao-1005'),
//     rating: 5,
//     title: '쿠셔닝 정말 좋아요',
//     content: '장시간 착용해도 발이 안 아파요. 운동할 때도 편하고 디자인도 예뻐서 만족합니다!',
//     images: ['https://picsum.photos/seed/review-50-1/800/600'],
//     createdAt: '2025-10-25T15:20:00Z',
//     updatedAt: '2025-10-25T15:20:00Z',
//   },
// ];

// /**
//  * 체험별 리뷰 조회
//  */
// export function getReviewsByCampaignId(campaignId: string): Review[] {
//   return mockReviews.filter((review) => review.campaignId === campaignId);
// }

// /**
//  * 사용자별 리뷰 조회
//  */
// export function getReviewsByUserId(userId: string): Review[] {
//   return mockReviews.filter((review) => review.userId === userId);
// }

// /**
//  * 평점별 리뷰 조회
//  */
// export function getReviewsByRating(rating: number): Review[] {
//   return mockReviews.filter((review) => review.rating === rating);
// }

// /**
//  * Review ID로 찾기
//  */
// export function findReviewById(id: number): Review | undefined {
//   return mockReviews.find((review) => review.id === id);
// }

export const mockReviewRequest: ReviewRequest = {
  content: '본문에 ‘#데이트팝 #체험단’ 해시태그가 누락되었습니다',
  precaution: [
    '지속적으로 가이드 위반 시 계정이 제한될 수 있습니다.',
    '지속적으로 가이드 위반 시 계정이 제한될 수 있습니다!',
  ],
};
