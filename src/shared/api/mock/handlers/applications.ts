/**
 * Application 관련 MSW 핸들러
 *
 * 체험 신청 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ApiResponse } from '@shared/api/types/common.types';
import type { Application } from '@entities/application';

import {
  mockApplications,
  getApplicationsByUserId,
  getApplicationsByCampaignId,
  getCampaign,
} from '../data/applications';

export const applicationHandlers = [
  /**
   * 나의 신청 목록 조회
   * GET /api/applications
   */
  http.get('/api/applications', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return HttpResponse.json(
        {
          success: false,
          error: '사용자 ID가 필요합니다.',
        } satisfies ApiResponse<Application[]>,
        { status: 400 },
      );
    }

    const applications = getApplicationsByUserId(userId);

    return HttpResponse.json({
      success: true,
      data: applications,
    } satisfies ApiResponse<Application[]>);
  }),

  /**
   * 신청 상세 조회
   * GET /api/applications/:id
   */
  http.get('/api/applications/:id', ({ params }) => {
    const applicationId = params.id as string;
    const application = mockApplications.find((app) => app.id === applicationId);

    if (!application) {
      return HttpResponse.json(
        {
          success: false,
          error: '신청 내역을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: application,
    } satisfies ApiResponse<Application>);
  }),

  /**
   * 특정 체험의 신청 목록 조회 (관리자용)
   * GET /api/campaigns/:campaignId/applications
   */
  http.get('/api/campaigns/:campaignId/applications', ({ params }) => {
    const campaignId = params.campaignId as string;

    try {
      // const campaign = getCampaign(campaignId);
      const applications = getApplicationsByCampaignId(campaignId);

      return HttpResponse.json({
        success: true,
        data: applications,
      } satisfies ApiResponse<Application[]>);
    } catch {
      return HttpResponse.json(
        {
          success: false,
          error: '체험을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }
  }),

  /**
   * 체험 신청
   * POST /api/campaigns/:campaignId/apply
  //  */
  http.post('/api/campaigns/:campaignId/apply', async ({ params, request }) => {
    const campaignId = params.campaignId as string;
    // CreateApplicationRequest가 주석 처리되었으므로 필요한 필드만 정의
    const body = (await request.json()) as {
      name: string;
      phoneNumber: string;
      blogAddress: string;
      message?: string;
    };
    const userId = 'kakao-1001';

    // 체험 존재 여부 확인
    let campaign;
    try {
      campaign = getCampaign(campaignId);
    } catch {
      return HttpResponse.json(
        {
          success: false,
          error: '체험을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    function generateRandomId(length = 5) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    // 새 신청 생성
    const newApplication: Application = {
      id: generateRandomId(),
      campaign,
      userId,
      name: body.name,
      phoneNumber: body.phoneNumber,
      blogAddress: body.blogAddress,
      status: 'pending',
      isReservated: false,
      createdAt: '2025-10-28T09:00:00Z',
    };

    mockApplications.push(newApplication);

    // 체험 현재 신청 수 증가
    campaign.currentRecruitment += 1;

    return HttpResponse.json(
      {
        success: true,
        data: newApplication,
      } satisfies ApiResponse<Application>,
      { status: 201 },
    );
  }),
];
