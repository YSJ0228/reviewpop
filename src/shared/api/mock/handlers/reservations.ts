/**
 * Reservation 관련 MSW 핸들러
 *
 * 예약 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ApiResponse } from '@shared/api/types/common.types';
import type { Reservation, PostReservation } from '@entities/reservation';
import { mockReservations } from '@shared/api/mock/data/reservations';

export const reservationHandlers = [
  /**
   * 예약 목록 조회 (나의 예약)
   * GET /api/reservations
   */
  //   http.get('/api/reservations', ({ request }) => {
  //     const url = new URL(request.url);
  //     const userId = url.searchParams.get('userId');

  //     if (!userId) {
  //       return HttpResponse.json(
  //         {
  //           success: false,
  //           error: '사용자 ID가 필요합니다.',
  //         } satisfies ApiResponse<never>,
  //         { status: 400 },
  //       );
  //     }

  //     const reservations = getReservationsByCampaignId(userId);

  //     return HttpResponse.json({
  //       success: true,
  //       data: reservations,
  //     } satisfies ApiResponse<Reservation[]>);
  //   }),

  /**
   * 예약 상세 조회
   * GET /api/reservations/:id
   */
  //   http.get('/api/reservations/:id', ({ params }) => {
  //     const reservation = findReservationByApplicationId(params.id as string);

  //     if (!reservation) {
  //       return HttpResponse.json(
  //         {
  //           success: false,
  //           error: '예약을 찾을 수 없습니다.',
  //         } satisfies ApiResponse<never>,
  //         { status: 404 },
  //       );
  //     }

  //     return HttpResponse.json({
  //       success: true,
  //       data: reservation,
  //     } satisfies ApiResponse<Reservation>);
  //   }),

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

    // 이미 예약이 존재하는지 확인 (실제로는 Application ID로 확인)
    // const existingReservations = getReservationsByUserId(body.userId); // userId가 body에 없음
    // const duplicate = existingReservations.find((r) => r.campaignId === body.campaignId);

    // if (duplicate) {
    //   return HttpResponse.json(
    //     {
    //       success: false,
    //       error: '이미 예약이 완료된 체험입니다.',
    //     } satisfies ApiResponse<never>,
    //     { status: 400 },
    //   );
    // }

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

    return HttpResponse.json({
      success: true,
      data: undefined,
    } satisfies ApiResponse<void>);
  }),
];
