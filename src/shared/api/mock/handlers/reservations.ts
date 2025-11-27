// /**
//  * Reservation 관련 MSW 핸들러
//  *
//  * 예약 API 엔드포인트를 Mock으로 구현합니다.
//  */

// import { http, HttpResponse } from 'msw';

// import type { ApiResponse } from '@shared/api/types/common.types';
// import type {
//   Reservation,
//   CreateReservationRequest,
//   UpdateReservationRequest,
// } from '@entities/reservation';
// import { toISO } from '@shared/lib/date';

// import {
//   mockReservations,
//   getReservationsByUserId,
//   findReservationById,
// } from '../data/reservations';

// export const reservationHandlers = [
//   /**
//    * 예약 목록 조회 (나의 예약)
//    * GET /api/reservations
//    */
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

//     const reservations = getReservationsByUserId(userId);

//     return HttpResponse.json({
//       success: true,
//       data: reservations,
//     } satisfies ApiResponse<Reservation[]>);
//   }),

//   /**
//    * 예약 상세 조회
//    * GET /api/reservations/:id
//    */
//   http.get('/api/reservations/:id', ({ params }) => {
//     const reservation = findReservationById(params.id as string);

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

//   /**
//    * 예약 생성
//    * POST /api/campaigns/:campaignId/reserve
//    */
//   http.post('/api/campaigns/:campaignId/reserve', async ({ params, request }) => {
//     const body = (await request.json()) as CreateReservationRequest & { userId: string };
//     const campaignId = params.campaignId as string;

//     // 간단한 검증
//     if (!body.recipientName || !body.recipientPhone || !body.address || !body.postalCode) {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '필수 항목을 모두 입력해주세요.',
//         } satisfies ApiResponse<never>,
//         { status: 400 },
//       );
//     }

//     // 이미 예약이 존재하는지 확인 (실제로는 Application ID로 확인)
//     const existingReservations = getReservationsByUserId(body.userId);
//     const duplicate = existingReservations.find((r) => r.campaignId === campaignId);

//     if (duplicate) {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '이미 예약이 완료된 체험입니다.',
//         } satisfies ApiResponse<never>,
//         { status: 400 },
//       );
//     }

//     // 새 예약 생성
//     const newReservation: Reservation = {
//       id: `res-${Date.now()}`,
//       userId: body.userId,
//       campaignId,
//       applicationId: `app-temp-${Date.now()}`, // 실제로는 Application ID 필요
//       status: 'pending',
//       recipientName: body.recipientName,
//       recipientPhone: body.recipientPhone,
//       address: body.address,
//       addressDetail: body.addressDetail,
//       postalCode: body.postalCode,
//       deliveryMemo: body.deliveryMemo,
//       reservedAt: toISO(),
//       createdAt: toISO(),
//       updatedAt: toISO(),
//     };

//     mockReservations.push(newReservation);

//     return HttpResponse.json({
//       success: true,
//       data: newReservation,
//     } satisfies ApiResponse<Reservation>);
//   }),

//   /**
//    * 예약 수정
//    * PATCH /api/reservations/:id
//    */
//   http.patch('/api/reservations/:id', async ({ params, request }) => {
//     const reservationId = params.id as string;
//     const body = (await request.json()) as UpdateReservationRequest;

//     const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId);

//     if (reservationIndex === -1) {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '예약을 찾을 수 없습니다.',
//         } satisfies ApiResponse<never>,
//         { status: 404 },
//       );
//     }

//     // 예약 수정 (pending 상태에서만 가능)
//     const reservation = mockReservations[reservationIndex];
//     if (reservation.status !== 'pending') {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '대기 중인 예약만 수정할 수 있습니다.',
//         } satisfies ApiResponse<never>,
//         { status: 400 },
//       );
//     }

//     // 업데이트
//     mockReservations[reservationIndex] = {
//       ...reservation,
//       ...body,
//       updatedAt: toISO(),
//     };

//     return HttpResponse.json({
//       success: true,
//       data: mockReservations[reservationIndex],
//     } satisfies ApiResponse<Reservation>);
//   }),

//   /**
//    * 예약 확정
//    * PATCH /api/reservations/:id/confirm
//    */
//   http.patch('/api/reservations/:id/confirm', ({ params }) => {
//     const reservationId = params.id as string;
//     const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId);

//     if (reservationIndex === -1) {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '예약을 찾을 수 없습니다.',
//         } satisfies ApiResponse<never>,
//         { status: 404 },
//       );
//     }

//     const reservation = mockReservations[reservationIndex];

//     if (reservation.status !== 'pending') {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '대기 중인 예약만 확정할 수 있습니다.',
//         } satisfies ApiResponse<never>,
//         { status: 400 },
//       );
//     }

//     // 예약 확정
//     mockReservations[reservationIndex] = {
//       ...reservation,
//       status: 'confirmed',
//       confirmedAt: toISO(),
//       updatedAt: toISO(),
//     };

//     return HttpResponse.json({
//       success: true,
//       data: mockReservations[reservationIndex],
//     } satisfies ApiResponse<Reservation>);
//   }),

//   /**
//    * 예약 취소
//    * DELETE /api/reservations/:id
//    */
//   http.delete('/api/reservations/:id', ({ params }) => {
//     const reservationId = params.id as string;
//     const reservationIndex = mockReservations.findIndex((r) => r.id === reservationId);

//     if (reservationIndex === -1) {
//       return HttpResponse.json(
//         {
//           success: false,
//           error: '예약을 찾을 수 없습니다.',
//         } satisfies ApiResponse<never>,
//         { status: 404 },
//       );
//     }

//     const reservation = mockReservations[reservationIndex];

//     // 예약 취소
//     mockReservations[reservationIndex] = {
//       ...reservation,
//       status: 'cancelled',
//       cancelledAt: toISO(),
//       updatedAt: toISO(),
//     };

//     return HttpResponse.json({
//       success: true,
//       data: mockReservations[reservationIndex],
//     } satisfies ApiResponse<Reservation>);
//   }),
// ];
