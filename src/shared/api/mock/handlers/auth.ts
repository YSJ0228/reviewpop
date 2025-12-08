/**
 * 인증 관련 MSW 핸들러
 *
 * 인증/사용자 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';
import { ROUTES } from '@shared/config/routes';
import { CONSTANTS } from '@shared/config/constants';
import { generateJWT, verifyJWT } from '@shared/lib/jwt';
import { toISO, fromUnix } from '@shared/lib/date';
import type { AuthResponse, AuthErrorResponse, KakaoUserInfo } from '@shared/types/auth.types';
import type { LoginRequest } from '@entities/user/types/user.types';
import type { ApiResponse } from '@shared/api/types/common.types';
import { mockUsers } from '../data/users';
import { findKakaoUserByToken } from '../data/oauth';
import { getUserCampaigns } from '../data/userCampaigns';

export const authHandlers = [
  /**
   * 카카오 소셜 로그인 (백엔드 API Mock)
   * POST /api/auth/social/kakao
   */
  http.post(ROUTES.API.SOCIAL_LOGIN.KAKAO, async ({ request }) => {
    try {
      const body = (await request.json()) as { access_token: string };
      const { access_token } = body;

      if (!access_token) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_TOKEN',
              message: 'Access Token이 필요합니다.',
            },
          },
          { status: 400 },
        );
      }

      // 카카오 사용자 정보 가져오기 (Mock)
      const kakaoUser = findKakaoUserByToken(access_token);

      // 우리 서비스의 JWT 생성
      const userId = `kakao-${kakaoUser.id}`;
      const token = generateJWT({
        userId,
        email: kakaoUser.kakao_account.email,
        name: kakaoUser.properties.nickname,
        provider: 'kakao',
      });

      // 사용자 정보 구성
      const user = {
        id: userId,
        email: kakaoUser.kakao_account.email,
        name: kakaoUser.properties.nickname,
        profileImage: kakaoUser.properties.profile_image || null,
        provider: 'kakao' as const,
        createdAt: toISO(),
      };

      return HttpResponse.json({
        success: true,
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: '서버 오류가 발생했습니다.',
          },
        },
        { status: 500 },
      );
    }
  }),

  /**
   * 네이버 소셜 로그인 (백엔드 API Mock)
   * POST /api/auth/social/naver
   *
   * TODO: 네이버 구현 시 추가
   */
  http.post(ROUTES.API.SOCIAL_LOGIN.NAVER, async ({ request }) => {
    return HttpResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '네이버 로그인은 아직 구현되지 않았습니다.',
        },
      },
      { status: 501 },
    );
  }),

  /**
   * 현재 사용자 정보 조회
   * GET /api/auth/me
   */
  http.get(ROUTES.API.ME, ({ request, cookies }) => {
    // 쿠키에서 토큰 가져오기
    const token = cookies[CONSTANTS.COOKIE_KEYS.AUTH_TOKEN];

    // if (!token) {
    //   return HttpResponse.json(
    //     {
    //       success: false,
    //       error: {
    //         code: 'UNAUTHORIZED',
    //         message: '인증이 필요합니다.',
    //       },
    //     },
    //     { status: 401 },
    //   );
    // }

    // // JWT 검증
    // const payload = verifyJWT(token);

    // if (!payload) {
    //   return HttpResponse.json(
    //     {
    //       success: false,
    //       error: {
    //         code: 'INVALID_TOKEN',
    //         message: '유효하지 않은 토큰입니다.',
    //       },
    //     },
    //     { status: 401 },
    //   );
    // }

    // // 사용자 정보 반환
    // const user = {
    //   id: payload.userId,
    //   email: payload.email,
    //   name: payload.name,
    //   profileImage: null, // JWT에는 프로필 이미지가 없으므로
    //   provider: payload.provider,
    //   createdAt: fromUnix(payload.iat).toISOString(),
    // };
    const user = mockUsers.find((u) => u.id === 'kakao-1001');

    return HttpResponse.json({
      success: true,
      data: user,
    });
  }),

  http.patch(ROUTES.API.ME, async ({ request, cookies }) => {
    const token = cookies[CONSTANTS.COOKIE_KEYS.AUTH_TOKEN];

    // if (!token) {
    //   return HttpResponse.json(
    //     {
    //       success: false,
    //       error: {
    //         code: 'UNAUTHORIZED',
    //         message: '인증이 필요합니다.',
    //       },
    //     },
    //     { status: 401 },
    //   );
    // }

    // // JWT 검증
    // const payload = verifyJWT(token);

    // if (!payload) {
    //   return HttpResponse.json(
    //     {
    //       success: false,
    //       error: {
    //         code: 'INVALID_TOKEN',
    //         message: '유효하지 않은 토큰입니다.',
    //       },
    //     },
    //     { status: 401 },
    //   );
    // }
    const body = (await request.json()) as {
      name?: string;
      phoneNumber?: string;
      blogAddress?: string;
    };

    // 실제라면 JWT의 userId로 찾지만, 지금은 mockUsers 활용
    const user = mockUsers.find((u) => u.id === 'kakao-1001');
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: '사용자를 찾을 수 없습니다.',
          },
        },
        { status: 404 },
      );
    }

    // 업데이트
    if (body.name !== undefined) user.name = body.name;
    if (body.phoneNumber !== undefined) user.phoneNumber = body.phoneNumber;
    if (body.blogAddress !== undefined) user.blogAddress = body.blogAddress;

    return HttpResponse.json({
      success: true,
      data: user,
    });
  }),

  http.get(ROUTES.API.PROFILE, () => {
    const userCampaign = getUserCampaigns();
    return HttpResponse.json({
      success: true,
      data: userCampaign,
    });
  }),

  /**
   * 로그아웃
   * POST /api/auth/logout
   */
  // http.post(ROUTES.API.LOGOUT, () => {
  //   return HttpResponse.json({
  //     success: true,
  //     message: '로그아웃되었습니다.',
  //   });
  // }),
];
