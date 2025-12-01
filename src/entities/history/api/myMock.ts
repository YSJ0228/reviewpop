import { http, HttpResponse } from 'msw';
import { mockMyCampaigns } from '../lib/mockMyCampaigns';

export const myCampaignHandlers = [
  // 체험 목록 조회
  http.get('/api/my-campaigns', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return HttpResponse.json(
        {
          success: false,
          message: 'User ID is required',
        },
        { status: 400 },
      );
    }

    // 특정 사용자의 신청 내역 반환 (mockMyCampaigns 사용)
    const myApplications = mockMyCampaigns.filter((app) => app.userId === userId);

    return HttpResponse.json({
      data: myApplications,
      success: true,
    });
  }),
];
