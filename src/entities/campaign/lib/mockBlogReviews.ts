import { BlogReview } from '@entities/review/types/review.types';

export const mockBlogReviews: BlogReview[] = [
  // Campaign 6: 이니스프리 유기농 화장품
  {
    id: '101',
    campaignId: '6',
    thumbnail: 'https://picsum.photos/seed/blog101/400/300',
    title: '이니스프리 유기농 스킨케어 2주 사용 찐후기 (내돈내산 아님)',
    article:
      '안녕하세요! 뷰티 블로거 뷰티퀸입니다. 오늘은 이니스프리에서 새로 나온 유기농 스킨케어 라인을 소개해드릴게요. 2주 동안 꾸준히 사용해봤는데, 확실히 피부결이 달라지는 게 느껴지더라고요...',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '뷰티퀸',
    date: '2025-11-10',
  },
  {
    id: '102',
    campaignId: '6',
    thumbnail: 'https://picsum.photos/seed/blog102/400/300',
    title: '민감성 피부 추천템! 이니스프리 신상 솔직 리뷰',
    article:
      '환절기라 피부가 뒤집어져서 고민이었는데, 이번에 체험단으로 선정되어 이니스프리 유기농 라인을 써보게 되었어요. 순한 성분이라 자극 없이 스며드는 느낌이 너무 좋았습니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '민감성탈출',
    date: '2025-11-12',
  },
  {
    id: '103',
    campaignId: '6',
    thumbnail: 'https://picsum.photos/seed/blog103/400/300',
    title: '이니스프리 유기농 라인, 한 달 사용 후기 (피부 변화 기록)',
    article:
      '2주차 리뷰에 이어 한 달 사용 후기로 돌아왔습니다. 붉은기가 많이 진정되었고 속건조가 잡히는 느낌이에요. 재구매 의사 200%입니다!',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '피부미인도전',
    date: '2025-11-15',
  },
  {
    id: '104',
    campaignId: '6',
    thumbnail: 'https://picsum.photos/seed/blog104/400/300',
    title: '성분 분석! 이니스프리 유기농 스킨케어, 진짜 순할까?',
    article:
      '화장품 성분 분석 어플로 꼼꼼하게 따져봤습니다. 유해 성분 0개! 민감성 피부도 안심하고 쓸 수 있는 착한 화장품 인정합니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '성분요정',
    date: '2025-11-16',
  },
  {
    id: '105',
    campaignId: '6',
    thumbnail: 'https://picsum.photos/seed/blog105/400/300',
    title: '이니스프리 팝업스토어 방문 & 유기농 라인 체험기',
    article:
      '성수동에서 열린 이니스프리 팝업스토어에 다녀왔어요. 유기농 라인을 직접 테스트해보고 샘플도 받아왔는데, 향이 너무 힐링되네요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '핫플사냥꾼',
    date: '2025-11-18',
  },

  // Campaign 7: CJ제일제당 프리미엄 쌀
  {
    id: '201',
    campaignId: '7',
    thumbnail: 'https://picsum.photos/seed/blog201/400/300',
    title: '밥맛이 꿀맛! CJ 프리미엄 쌀로 지은 저녁 밥상',
    article:
      '한국인은 밥심이죠! 오늘은 CJ제일제당에서 보내주신 프리미엄 쌀로 밥을 지어봤어요. 윤기가 좌르르 흐르는 게 보기만 해도 군침이 돌더라고요. 아이들도 밥맛이 좋다며 두 그릇이나 먹었답니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '집밥김선생',
    date: '2025-11-05',
  },

  // Campaign 8: 나이키 신상 운동화
  {
    id: '301',
    campaignId: '8',
    thumbnail: 'https://picsum.photos/seed/blog301/400/300',
    title: '러닝화 끝판왕? 나이키 신상 신고 10km 달려봄',
    article:
      '드디어 도착했습니다! 나이키 신상 러닝화 언박싱부터 착용감 테스트까지 꼼꼼하게 리뷰해볼게요. 쿠셔닝이 정말 예술이라 무릎에 무리가 덜 가는 느낌이었어요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '달리는남자',
    date: '2025-11-08',
  },
  {
    id: '302',
    campaignId: '8',
    thumbnail: 'https://picsum.photos/seed/blog302/400/300',
    title: '데일리 운동화로 딱! 나이키 신상 코디 모음',
    article:
      '운동할 때만 신나요? 아니죠! 일상복에도 찰떡같이 어울리는 나이키 신상 운동화 코디 5가지를 준비했습니다. 디자인이 워낙 예뻐서 어디에나 잘 어울려요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '패션피플',
    date: '2025-11-09',
  },
  {
    id: '303',
    campaignId: '8',
    thumbnail: 'https://picsum.photos/seed/blog303/400/300',
    title: '나이키 런닝화 사이즈 팁 & 착화감 비교',
    article:
      '발볼 넓은 러너분들 주목! 이번 신상 사이즈 고르는 팁 알려드립니다. 반업했더니 딱 좋네요. 쿠션감은 말할 것도 없고요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '발볼러',
    date: '2025-11-11',
  },
  {
    id: '304',
    campaignId: '8',
    thumbnail: 'https://picsum.photos/seed/blog304/400/300',
    title: '가벼움 그 자체! 나이키 신상 신고 마라톤 완주',
    article:
      '이번 하프 마라톤은 나이키 신상과 함께했습니다. 후반부에도 발이 무겁지 않아서 기록 단축에 성공했어요! 러너들에게 강추합니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '마라토너',
    date: '2025-11-13',
  },
  {
    id: '305',
    campaignId: '8',
    thumbnail: 'https://picsum.photos/seed/blog305/400/300',
    title: '커플 운동화 추천, 나이키 신상 컬러별 리뷰',
    article:
      '남친이랑 커플로 맞췄는데 너무 예뻐요. 저는 화이트, 남친은 블랙으로 샀는데 시밀러룩 포인트로 딱입니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '럽스타그램',
    date: '2025-11-14',
  },

  // Campaign 9: LG전자 스마트 홈
  {
    id: '401',
    campaignId: '9',
    thumbnail: 'https://picsum.photos/seed/blog401/400/300',
    title: '우리 집이 스마트해졌어요! LG 스마트홈 체험존 방문기',
    article:
      'LG전자 스마트홈 체험존에 다녀왔습니다. IoT 기술로 연결된 가전들이 알아서 척척 작동하는 모습을 보니 미래에 온 것 같았어요. 특히 음성 인식 기능이 정말 편리하더라고요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '테크덕후',
    date: '2025-11-01',
  },

  // Campaign 10: 빙그레 프리미엄 요거트
  {
    id: '501',
    campaignId: '10',
    thumbnail: 'https://picsum.photos/seed/blog501/400/300',
    title: '아침 대용으로 딱! 빙그레 프리미엄 요거트 & 그래놀라',
    article:
      '바쁜 아침, 챙겨 먹기 힘드시죠? 저는 요즘 빙그레 프리미엄 요거트로 간편하고 든든하게 해결하고 있어요. 꾸덕한 질감과 진한 맛이 일품입니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '건강한하루',
    date: '2025-10-28',
  },

  // Campaign 12: 다이슨 무선 청소기
  {
    id: '601',
    campaignId: '12',
    thumbnail: 'https://picsum.photos/seed/blog601/400/300',
    title: '청소가 즐거워진다? 다이슨 무선 청소기 한 달 사용기',
    article:
      '다이슨 무선 청소기를 사용한 지 벌써 한 달이 되었네요. 강력한 흡입력 덕분에 청소 시간이 반으로 줄었어요. 특히 침구 청소 툴이 정말 유용했습니다.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '살림왕',
    date: '2025-10-25',
  },
  {
    id: '602',
    campaignId: '12',
    thumbnail: 'https://picsum.photos/seed/blog602/400/300',
    title: '다이슨 vs 타사 무선 청소기 비교 분석',
    article:
      '집에 있는 A사 청소기와 흡입력, 소음, 배터리 지속 시간을 비교해봤습니다. 역시 다이슨이 비싼 값을 하네요. 먼지 통 비우기도 훨씬 편해요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '비교왕',
    date: '2025-10-26',
  },
  {
    id: '603',
    campaignId: '12',
    thumbnail: 'https://picsum.photos/seed/blog603/400/300',
    title: '반려동물 털 청소 끝판왕, 다이슨 펫 툴 사용기',
    article:
      '고양이 두 마리를 키우는데 털 날림 때문에 스트레스였거든요. 다이슨 펫 툴 써보고 광명 찾았습니다. 소파에 박힌 털까지 싹 빨아들이네요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '냥집사',
    date: '2025-10-27',
  },
  {
    id: '604',
    campaignId: '12',
    thumbnail: 'https://picsum.photos/seed/blog604/400/300',
    title: '다이슨 배터리 관리 팁 & 필터 청소 방법',
    article:
      '비싼 가전 오래 쓰는 꿀팁 공유합니다. 배터리 수명 늘리는 충전 습관과 필터 물세척 방법, 어렵지 않아요!',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '살림고수',
    date: '2025-10-29',
  },
  {
    id: '605',
    campaignId: '12',
    thumbnail: 'https://picsum.photos/seed/blog605/400/300',
    title: '부모님 효도 선물 1위, 다이슨 청소기 선물 후기',
    article:
      '엄마 무릎이 안 좋으셔서 가벼운 무선 청소기를 선물해드렸어요. 손목에 무리도 안 가고 청소가 너무 편해졌다고 좋아하시네요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '효녀심청',
    date: '2025-10-30',
  },

  // Campaign 13: 페레로로쉐
  {
    id: '701',
    campaignId: '13',
    thumbnail: 'https://picsum.photos/seed/blog701/400/300',
    title: '발렌타인데이 선물 추천! 페레로로쉐 프리미엄 패키지',
    article:
      '특별한 날, 특별한 사람에게 선물하기 좋은 페레로로쉐 프리미엄 패키지를 소개합니다. 고급스러운 포장과 달콤한 초콜릿의 조화가 완벽해요.',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '선물요정',
    date: '2025-10-15',
  },

  // Campaign 14: 조말론 향수
  {
    id: '801',
    campaignId: '14',
    thumbnail: 'https://picsum.photos/seed/blog801/400/300',
    title: '나만의 시그니처 향 찾기, 조말론 플래그십 스토어 방문',
    article:
      '조말론 청담 플래그십 스토어에서 프래그런스 컨설팅을 받고 왔어요. 저에게 딱 맞는 향을 추천해주셔서 인생 향수를 찾았습니다!',
    url: 'https://blog.naver.com/blogpeople/223999413544',
    author: '향기나는삶',
    date: '2025-10-10',
  },
];
