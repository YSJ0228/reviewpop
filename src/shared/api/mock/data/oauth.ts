/**
 * OAuth Mock 데이터
 */

import type { KakaoUserInfo, NaverUserInfo } from '@shared/types/auth.types';

/**
 * Mock 카카오 사용자 정보
 */
export const mockKakaoUsers: KakaoUserInfo[] = [
  {
    id: 123456789,
    connected_at: '2024-01-01T00:00:00Z',
    properties: {
      nickname: '테스트유저',
      profile_image: 'https://via.placeholder.com/150',
      thumbnail_image: 'https://via.placeholder.com/150',
    },
    kakao_account: {
      profile_nickname_needs_agreement: false,
      profile_image_needs_agreement: false,
      profile: {
        nickname: '테스트유저',
        thumbnail_image_url: 'https://via.placeholder.com/150',
        profile_image_url: 'https://via.placeholder.com/150',
        is_default_image: false,
      },
      has_email: true,
      email_needs_agreement: false,
      is_email_valid: true,
      is_email_verified: true,
      email: 'test@kakao.com',
    },
  },
  {
    id: 987654321,
    connected_at: '2024-02-01T00:00:00Z',
    properties: {
      nickname: '김철수',
      profile_image: 'https://via.placeholder.com/150/0000FF/FFFFFF',
      thumbnail_image: 'https://via.placeholder.com/150/0000FF/FFFFFF',
    },
    kakao_account: {
      profile_nickname_needs_agreement: false,
      profile_image_needs_agreement: false,
      profile: {
        nickname: '김철수',
        thumbnail_image_url: 'https://via.placeholder.com/150/0000FF/FFFFFF',
        profile_image_url: 'https://via.placeholder.com/150/0000FF/FFFFFF',
        is_default_image: false,
      },
      has_email: true,
      email_needs_agreement: false,
      is_email_valid: true,
      is_email_verified: true,
      email: 'chulsu@kakao.com',
    },
  },
];

/**
 * Mock 네이버 사용자 정보
 */
export const mockNaverUsers: NaverUserInfo[] = [
  {
    resultcode: '00',
    message: 'success',
    response: {
      id: 'naver-123456',
      nickname: '네이버유저',
      name: '홍길동',
      email: 'test@naver.com',
      gender: 'M',
      age: '30-39',
      birthday: '01-01',
      profile_image: 'https://via.placeholder.com/150/00FF00/FFFFFF',
      birthyear: '1990',
      mobile: '010-1234-5678',
    },
  },
  {
    resultcode: '00',
    message: 'success',
    response: {
      id: 'naver-654321',
      nickname: '이영희',
      name: '이영희',
      email: 'younghee@naver.com',
      gender: 'F',
      age: '20-29',
      birthday: '12-25',
      profile_image: 'https://via.placeholder.com/150/FF00FF/FFFFFF',
      birthyear: '1995',
      mobile: '010-9876-5432',
    },
  },
];

/**
 * Access Token으로 카카오 사용자 찾기
 *
 * Mock이므로 토큰과 상관없이 첫 번째 사용자 반환
 */
export function findKakaoUserByToken(accessToken: string): KakaoUserInfo {
  // Mock에서는 토큰 검증 없이 첫 번째 사용자 반환
  return mockKakaoUsers[0];
}

/**
 * Access Token으로 네이버 사용자 찾기
 *
 * Mock이므로 토큰과 상관없이 첫 번째 사용자 반환
 */
export function findNaverUserByToken(accessToken: string): NaverUserInfo {
  // Mock에서는 토큰 검증 없이 첫 번째 사용자 반환
  return mockNaverUsers[0];
}
