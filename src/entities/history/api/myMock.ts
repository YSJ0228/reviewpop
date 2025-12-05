import { http, HttpResponse } from 'msw';

import { mockReservations } from '@shared/api/mock/data/reservations';
import { mockMyCampaigns } from '../lib/mockMyCampaigns';

export const mockApplications = [...mockMyCampaigns];

export const myCampaignHandlers = [
  // 체험 목록 조회
  http.get('/api/my-campaigns', () => {
    // userId 체크 제거 (쿠키 인증 가정)
    // 테스트를 위해 특정 사용자(kakao-1001)의 데이터 반환
    const userId = 'kakao-1001';

    // 특정 사용자의 신청 내역 반환 (mockMyCampaigns 사용)
    // 예약 상태 동기화: mockReservations에 해당 예약이 있는지 확인
    const myApplications = mockApplications
      .filter((app) => app.userId === userId)
      .map((app) => {
        // 예약 ID가 있지만 실제 예약이 삭제된 경우
        if (app.reservationId && !mockReservations.some((r) => r.id === app.reservationId)) {
          return {
            ...app,
            isReservated: false,
            reservationId: undefined,
            reservationDate: undefined,
            status: 'selected' as const,
          };
        }
        return app;
      });

    return HttpResponse.json({
      data: { applications: myApplications },
      success: true,
    });
  }),

  // 체험 신청 취소
  http.delete('/api/campaigns/:campaignId', ({ params }) => {
    const { campaignId } = params;
    const index = mockApplications.findIndex((app) => app.campaign.id === campaignId);

    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '신청 내역을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    mockApplications.splice(index, 1);
    console.log(`[MSW] Campaign ${campaignId} application cancelled`);

    return HttpResponse.json({
      data: null,
      success: true,
    });
  }),
];
