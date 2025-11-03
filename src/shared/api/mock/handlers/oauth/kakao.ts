/**
 * 카카오 OAuth MSW Mock 핸들러
 */

import { http, HttpResponse } from 'msw';
import { CONSTANTS } from '@shared/config/constants';
import type { KakaoTokenResponse } from '@shared/types/auth.types';
import { findKakaoUserByToken } from '../../data/oauth';

/**
 * 카카오 OAuth 핸들러
 */
export const kakaoOAuthHandlers = [
  /**
   * 카카오 토큰 발급
   * POST https://kauth.kakao.com/oauth/token
   */
  http.post(CONSTANTS.OAUTH.KAKAO.TOKEN_URL, async ({ request }) => {
    const body = await request.text();
    const params = new URLSearchParams(body);

    const grantType = params.get('grant_type');
    const code = params.get('code');
    const clientId = params.get('client_id');

    // 간단한 검증
    if (grantType !== 'authorization_code') {
      return HttpResponse.json(
        {
          error: 'invalid_grant',
          error_description: 'grant_type이 잘못되었습니다.',
        },
        { status: 400 },
      );
    }

    if (!code) {
      return HttpResponse.json(
        {
          error: 'invalid_request',
          error_description: 'code가 필요합니다.',
        },
        { status: 400 },
      );
    }

    // Mock Access Token 발급
    const tokenResponse: KakaoTokenResponse = {
      access_token: `mock-kakao-access-token-${Date.now()}`,
      token_type: 'bearer',
      refresh_token: `mock-kakao-refresh-token-${Date.now()}`,
      expires_in: 43200, // 12시간
      scope: 'profile_nickname profile_image account_email',
      refresh_token_expires_in: 5184000, // 60일
    };

    return HttpResponse.json(tokenResponse);
  }),

  /**
   * 카카오 사용자 정보 조회
   * GET https://kapi.kakao.com/v2/user/me
   */
  http.get(CONSTANTS.OAUTH.KAKAO.USER_INFO_URL, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Authorization 헤더 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          msg: '서비스 접근이 거부되었습니다.',
          code: -401,
        },
        { status: 401 },
      );
    }

    const accessToken = authHeader.replace('Bearer ', '');

    // Mock 사용자 정보 반환
    const userInfo = findKakaoUserByToken(accessToken);

    return HttpResponse.json(userInfo);
  }),

  /**
   * 카카오 토큰 정보 확인 (선택사항)
   * GET https://kapi.kakao.com/v1/user/access_token_info
   */
  http.get('https://kapi.kakao.com/v1/user/access_token_info', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          msg: '서비스 접근이 거부되었습니다.',
          code: -401,
        },
        { status: 401 },
      );
    }

    // Mock 토큰 정보 반환
    return HttpResponse.json({
      id: 123456789,
      expires_in: 43199,
      app_id: 123456,
    });
  }),
];
