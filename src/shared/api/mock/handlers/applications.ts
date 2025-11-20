/**
 * Application 관련 MSW 핸들러
 *
 * 체험 신청 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ApiResponse } from '@shared/api/types/common.types';
import type { Application, CreateApplicationRequest } from '@entities/application';
import { toISO } from '@shared/lib/date';

import {
  mockApplications,
  findApplicationById,
  getApplicationsByUserId,
  getApplicationsByCampaignId,
  findApplicationByUserAndCampaign,
} from '../data/applications';
import { findCampaignById } from '@entities/campaign/lib';

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
        } satisfies ApiResponse<never>,
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
    const application = findApplicationById(params.id as string);

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
    const campaign = findCampaignById(campaignId);

    if (!campaign) {
      return HttpResponse.json(
        {
          success: false,
          error: '체험을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    const applications = getApplicationsByCampaignId(campaignId);

    return HttpResponse.json({
      success: true,
      data: applications,
    } satisfies ApiResponse<Application[]>);
  }),

  /**
   * 체험 신청
   * POST /api/campaigns/:campaignId/apply
   */
  http.post('/api/campaigns/:campaignId/apply', async ({ params, request }) => {
    const campaignId = params.campaignId as string;
    const body = (await request.json()) as CreateApplicationRequest & { userId: string };

    // 체험 존재 여부 확인
    const campaign = findCampaignById(campaignId);
    if (!campaign) {
      return HttpResponse.json(
        {
          success: false,
          error: '체험을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    // 체험 상태 확인
    if (campaign.status !== 'active') {
      return HttpResponse.json(
        {
          success: false,
          error: '현재 신청할 수 없는 체험입니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 신청 마감일 확인
    const now = new Date();
    const deadline = new Date(campaign.schedule.applicationSchedule[1]);
    if (now > deadline) {
      return HttpResponse.json(
        {
          success: false,
          error: '신청 마감된 체험입니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 중복 신청 확인
    const existingApplication = findApplicationByUserAndCampaign(body.userId, campaignId);
    if (existingApplication && existingApplication.status !== 'cancelled') {
      return HttpResponse.json(
        {
          success: false,
          error: '이미 신청한 체험입니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 모집 인원 확인
    if (campaign.currentRecruitment >= campaign.maxRecruitment) {
      return HttpResponse.json(
        {
          success: false,
          error: '모집 인원이 마감되었습니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 새 신청 생성
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId: body.userId,
      campaignId,
      status: 'pending',
      message: body.message,
      snsAccount: body.snsAccount,
      motivation: body.motivation,
      appliedAt: toISO(),
      createdAt: toISO(),
      updatedAt: toISO(),
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

  /**
   * 신청 취소
   * DELETE /api/applications/:id
   */
  http.delete('/api/applications/:id', ({ params, request }) => {
    const applicationId = params.id as string;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return HttpResponse.json(
        {
          success: false,
          error: '사용자 ID가 필요합니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    const applicationIndex = mockApplications.findIndex((app) => app.id === applicationId);

    if (applicationIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: '신청 내역을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    const application = mockApplications[applicationIndex];

    // 본인 확인
    if (application.userId !== userId) {
      return HttpResponse.json(
        {
          success: false,
          error: '본인의 신청만 취소할 수 있습니다.',
        } satisfies ApiResponse<never>,
        { status: 403 },
      );
    }

    // 대기 중인 신청만 취소 가능
    if (application.status !== 'pending') {
      return HttpResponse.json(
        {
          success: false,
          error: '대기 중인 신청만 취소할 수 있습니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 신청 취소 처리
    mockApplications[applicationIndex] = {
      ...application,
      status: 'cancelled',
      cancelledAt: toISO(),
      updatedAt: toISO(),
    };

    // 체험 현재 신청 수 감소
    const campaign = findCampaignById(application.campaignId);
    if (campaign && campaign.currentRecruitment > 0) {
      campaign.currentRecruitment -= 1;
    }

    return HttpResponse.json({
      success: true,
      data: mockApplications[applicationIndex],
    } satisfies ApiResponse<Application>);
  }),

  /**
   * 신청 상태 변경 (관리자용 - 선정/거절)
   * PATCH /api/applications/:id/status
   */
  http.patch('/api/applications/:id/status', async ({ params, request }) => {
    const applicationId = params.id as string;
    const body = (await request.json()) as { status: 'selected' | 'rejected' };

    const applicationIndex = mockApplications.findIndex((app) => app.id === applicationId);

    if (applicationIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: '신청 내역을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    const application = mockApplications[applicationIndex];

    // 대기 중인 신청만 상태 변경 가능
    if (application.status !== 'pending') {
      return HttpResponse.json(
        {
          success: false,
          error: '대기 중인 신청만 상태를 변경할 수 있습니다.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 신청 상태 변경
    mockApplications[applicationIndex] = {
      ...application,
      status: body.status,
      decidedAt: toISO(),
      updatedAt: toISO(),
    };

    // 선정된 경우 체험의 선정 수 증가
    if (body.status === 'selected') {
      const campaign = findCampaignById(application.campaignId);
      if (campaign) {
        campaign.selectedCount = (campaign.selectedCount || 0) + 1;
      }
    }

    return HttpResponse.json({
      success: true,
      data: mockApplications[applicationIndex],
    } satisfies ApiResponse<Application>);
  }),
];
