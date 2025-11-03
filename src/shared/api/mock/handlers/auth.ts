/**
 * 인증 관련 MSW 핸들러
 *
 * 인증/사용자 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { LoginRequest } from '@entities/user/types/user.types';
import type { ApiResponse } from '@shared/api/types/common.types';

import { mockUsers } from '../data/users';

export const authHandlers = [
  /**
   * 로그인
   * POST /api/auth/login
   */
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    // 간단한 검증 (실제로는 백엔드에서 처리)
    if (body.email === 'user@example.com' && body.password === 'password123') {
      const loginData = {
        user: mockUsers[0],
        token: 'mock-jwt-token-12345',
      };

      return HttpResponse.json({
        success: true,
        data: loginData,
      } satisfies ApiResponse<typeof loginData>);
    }

    return HttpResponse.json(
      {
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.',
      } satisfies ApiResponse<never>,
      { status: 401 },
    );
  }),

  /**
   * 현재 사용자 정보 조회
   * GET /api/auth/me
   */
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          error: '인증이 필요합니다.',
        } satisfies ApiResponse<never>,
        { status: 401 },
      );
    }

    const currentUser = mockUsers[0];

    return HttpResponse.json({
      success: true,
      data: currentUser,
    } satisfies ApiResponse<typeof currentUser>);
  }),
];
