import { http, HttpResponse } from 'msw';
import { mockMyCampaignDetails, mockMyCampaigns } from '../lib';

export const myCampaignHandlers = [
  // 체험 목록 조회
  http.get('/api/my-campaigns', () => {
    return HttpResponse.json({
      data: mockMyCampaigns,
      success: true,
    });
  }),

  // 체험 상세 조회
  http.get('/api/my-campaigns/:id', ({ params }) => {
    const { id } = params;
    const campaign = mockMyCampaignDetails[String(id)];

    if (!campaign) {
      return HttpResponse.json(
        {
          success: false,
          message: '체험을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: campaign,
      success: true,
    });
  }),
];
