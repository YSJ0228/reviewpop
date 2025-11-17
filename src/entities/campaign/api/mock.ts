import { http, HttpResponse } from 'msw';
import { mockCampaignDetails, mockCampaigns } from '../lib';

export const campaignHandlers = [
  // 캠페인 목록 조회
  http.get('/api/campaigns', () => {
    return HttpResponse.json({
      data: mockCampaigns,
      success: true,
    });
  }),

  // 캠페인 상세 조회
  http.get('/api/campaigns/:id', ({ params }) => {
    const { id } = params;
    const campaign = mockCampaignDetails[String(id)];

    if (!campaign) {
      return HttpResponse.json(
        {
          success: false,
          message: '캠페인을 찾을 수 없습니다.',
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
