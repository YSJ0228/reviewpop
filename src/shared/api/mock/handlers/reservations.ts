/**
 * Reservation 관련 MSW 핸들러
 *
 * 예약 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ApiResponse } from '@shared/api/types/common.types';
import type {
  Reservation,
  PostReservation,
  ReservationConfig,
  ReservedDateTimes,
} from '@entities/reservation';
import {
  mockReservations,
  mockReservationConfig,
  mockReservedDateTimes,
} from '@shared/api/mock/data/reservations';
import { mockApplications } from '../data/applications';

import { mockApplications as myCampaignsMockApps } from '@entities/history/api/myMock';

export const reservationHandlers = [
  /**
   * 예약 설정 조회
   * GET /api/reservations/:campaignId/config
   */
  http.get('/api/reservations/:campaignId/config', () => {
    return HttpResponse.json({
      success: true,
      data: mockReservationConfig,
    } satisfies ApiResponse<ReservationConfig>);
  }),

  /**
   * 예약된 시간대 조회
   * GET /api/reservations/:campaignId/reserved-times
   */
  http.get('/api/reservations/:campaignId/reserved-times', () => {
    return HttpResponse.json({
      success: true,
      data: mockReservedDateTimes,
    } satisfies ApiResponse<ReservedDateTimes>);
  }),

  /**
   * 예약 상세 조회
   * GET /api/reservations/:id
   */
  http.get('/api/reservations/:id', ({ params }) => {
    const reservation = mockReservations.find((r) => r.id === params.id);

    if (!reservation) {
      return HttpResponse.json(
        {
          success: false,
          error: '예약을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: reservation,
    } satisfies ApiResponse<Reservation>);
  }),

  /**
   * 예약 생성
   * POST /api/reservations
   */
  http.post('/api/reservations', async ({ request }) => {
    const body = (await request.json()) as PostReservation;

    // 간단한 검증
    if (!body.campaignId || !body.applicationId || !body.personCount || !body.date) {
      return HttpResponse.json(
        {
          success: false,
          error: '필수 항목을 모두 입력해주세요.',
        } satisfies ApiResponse<never>,
        { status: 400 },
      );
    }

    // 새 예약 생성
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      campaignId: body.campaignId,
      applicationId: body.applicationId,
      date: body.date,
      personCount: body.personCount,
      isVisited: false,
    };

    mockReservations.push(newReservation);

    // Update application status (Centralized Data)
    const application = mockApplications.find((app) => app.id === body.applicationId);
    if (application) {
      application.isReservated = true;
      application.reservationDate = body.date;
      application.reservationId = newReservation.id;
      // status는 selected 유지 (방문 전까지는 선정 탭에 표시)
      // reviewStatus도 아직 설정하지 않음
    }

    // Update application status (My Campaigns Data - Sync)
    const myCampaignApp = myCampaignsMockApps.find((app) => app.id === body.applicationId);
    if (myCampaignApp) {
      myCampaignApp.isReservated = true;
      myCampaignApp.reservationDate = body.date;
      myCampaignApp.reservationId = newReservation.id;
      // status는 selected 유지
    }

    return HttpResponse.json({
      success: true,
      data: newReservation,
    } satisfies ApiResponse<Reservation>);
  }),

  /**
   * 예약 수정
   * PATCH /api/reservations/:id
   */
  http.patch('/api/reservations/:id', async ({ params, request }) => {
    const reservationId = params.id as string;
    type UpdateReservationRequest = Pick<Reservation, 'date' | 'personCount'>;
    const body = (await request.json()) as UpdateReservationRequest;

    const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId);

    if (reservationIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: '예약을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    // 업데이트
    mockReservations[reservationIndex] = {
      ...mockReservations[reservationIndex],
      ...body,
    };

    // Update application status (Centralized Data)
    const application = mockApplications.find((app) => app.reservationId === reservationId);
    if (application && body.date) {
      application.reservationDate = body.date;
    }

    // Update application status (My Campaigns Data - Sync)
    const myCampaignApp = myCampaignsMockApps.find((app) => app.reservationId === reservationId);
    if (myCampaignApp && body.date) {
      myCampaignApp.reservationDate = body.date;
    }

    return HttpResponse.json({
      success: true,
      data: mockReservations[reservationIndex],
    } satisfies ApiResponse<Reservation>);
  }),

  /**
   * 예약 취소
   * DELETE /api/reservations/:id
   */
  http.delete('/api/reservations/:id', ({ params }) => {
    const reservationId = params.id as string;
    const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId);

    if (reservationIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          error: '예약을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    // 예약 취소 (배열에서 제거)
    mockReservations.splice(reservationIndex, 1);

    // Update application status (Centralized Data)
    const application = mockApplications.find((app) => app.reservationId === reservationId);
    if (application) {
      application.isReservated = false;
      application.reservationDate = undefined;
      application.reservationId = undefined;
      application.status = 'selected'; // 예약 취소 시 selected 상태로 복귀
      application.reviewStatus = undefined;
    }

    // Update application status (My Campaigns Data - Sync)
    const myCampaignApp = myCampaignsMockApps.find((app) => app.reservationId === reservationId);
    if (myCampaignApp) {
      myCampaignApp.isReservated = false;
      myCampaignApp.reservationDate = undefined;
      myCampaignApp.reservationId = undefined;
      myCampaignApp.status = 'selected';
      myCampaignApp.reviewStatus = undefined;
    }

    return HttpResponse.json({
      success: true,
      data: undefined,
    } satisfies ApiResponse<void>);
  }),
];
