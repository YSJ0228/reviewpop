/**
 * Mock 사용자 데이터
 *
 * 테스트 및 개발용 가짜 사용자 데이터입니다.
 * 총 20명의 사용자로 다양한 활동 패턴을 시뮬레이션합니다.
 */

import type { User } from '@entities/user/types/user.types';

export const mockUsers: User[] = [
  // Kakao OAuth 사용자
  {
    id: 'kakao-1001',
    email: 'park.minsoo@kakao.com',
    name: '박민수',
    provider: 'kakao',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'kakao-1002',
    email: 'choi.jiyoung@kakao.com',
    name: '최지영',
    provider: 'kakao',
    createdAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'kakao-1003',
    email: 'jung.sehun@kakao.com',
    name: '정세훈',
    provider: 'kakao',
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'kakao-1004',
    email: 'kang.yuna@kakao.com',
    name: '강유나',
    provider: 'kakao',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'kakao-1005',
    email: 'song.jihoon@kakao.com',
    name: '송지훈',
    provider: 'kakao',
    createdAt: '2024-02-20T00:00:00Z',
  },

  // Naver OAuth 사용자
  {
    id: 'naver-2001',
    email: 'han.sora@naver.com',
    name: '한소라',
    provider: 'naver',
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'naver-2002',
    email: 'yoon.taeyang@naver.com',
    name: '윤태양',
    provider: 'naver',
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'naver-2003',
    email: 'lim.hyemin@naver.com',
    name: '임혜민',
    provider: 'naver',
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'naver-2004',
    email: 'oh.juwon@naver.com',
    name: '오주원',
    provider: 'naver',
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'naver-2005',
    email: 'shin.dongha@naver.com',
    name: '신동하',
    provider: 'naver',
    createdAt: '2024-03-20T00:00:00Z',
  },

  // 최근 가입한 사용자들
  {
    id: 'kakao-1006',
    email: 'lee.chaerin@kakao.com',
    name: '이채린',
    provider: 'kakao',
    createdAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 'kakao-1007',
    email: 'kim.dohyun@kakao.com',
    name: '김도현',
    provider: 'kakao',
    createdAt: '2024-10-05T00:00:00Z',
  },
  {
    id: 'naver-2006',
    email: 'jeon.subin@naver.com',
    name: '전수빈',
    provider: 'naver',
    createdAt: '2024-10-10T00:00:00Z',
  },
  {
    id: 'naver-2007',
    email: 'baek.jiho@naver.com',
    name: '백지호',
    provider: 'naver',
    createdAt: '2024-10-15T00:00:00Z',
  },
  {
    id: 'kakao-1008',
    email: 'nam.yejin@kakao.com',
    name: '남예진',
    provider: 'kakao',
    createdAt: '2024-10-20T00:00:00Z',
  },
  {
    id: 'kakao-1009',
    email: 'go.seungho@kakao.com',
    name: '고승호',
    provider: 'kakao',
    createdAt: '2024-10-25T00:00:00Z',
  },
  {
    id: 'naver-2008',
    email: 'hwang.minji@naver.com',
    name: '황민지',
    provider: 'naver',
    createdAt: '2024-10-30T00:00:00Z',
  },
];

/**
 * User ID로 사용자 찾기
 */
export function findUserById(userId: string): User | undefined {
  return mockUsers.find((user) => user.id === userId);
}

/**
 * Email로 사용자 찾기
 */
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}
