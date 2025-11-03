/**
 * Mock 사용자 데이터
 *
 * 테스트 및 개발용 가짜 사용자 데이터입니다.
 */

import type { User } from '@entities/user/types/user.types';

export const mockUsers: User[] = [
  {
    id: 'legacy-1',
    email: 'user@example.com',
    name: '홍길동',
    profileImage: null,
    provider: undefined, // 기존 이메일 로그인 (deprecated)
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'legacy-2',
    email: 'test@example.com',
    name: '김철수',
    profileImage: null,
    provider: undefined,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 'legacy-3',
    email: 'jane@example.com',
    name: '이영희',
    profileImage: null,
    provider: undefined,
    createdAt: '2024-01-03T00:00:00Z',
  },
];
