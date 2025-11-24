import { http, HttpResponse } from 'msw';
import { mockMyCampaigns } from '../lib';

export const myCampaignHandlers = [
  // 체험 목록 조회
  http.get('/api/my-campaigns', () => {
    return HttpResponse.json({
      data: mockMyCampaigns,
      success: true,
    });
  }),
];
