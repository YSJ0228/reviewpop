import { http, HttpResponse } from 'msw';
import { INITIAL_CAMPAIGNS } from './data';
import { CampaignCategory, CampaignStatus } from '../../types/campaign.types';

export const campaignHandlers = [
  // 캠페인 목록 조회 (필터링 지원)
  http.get('/api/campaigns', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') as CampaignCategory | null;
    const status = url.searchParams.get('status') as CampaignStatus | null;
    const location = url.searchParams.get('location'); // '서울', '경기' 등
    const page = Number(url.searchParams.get('page') || '1');
    const size = Number(url.searchParams.get('size') || '10');

    let filteredCampaigns = [...INITIAL_CAMPAIGNS];

    if (category) {
      filteredCampaigns = filteredCampaigns.filter((c) => c.category === category);
    }

    if (status) {
      filteredCampaigns = filteredCampaigns.filter((c) => c.status === status);
    }

    if (location) {
      filteredCampaigns = filteredCampaigns.filter((c) => c.location.sido === location);
    }

    // Sorting Logic
    filteredCampaigns.sort((a, b) => {
      switch (status) {
        case 'recruiting':
          // 마감 임박순 (application.end 오름차순)
          return (
            new Date(a.schedule.application.end).getTime() -
            new Date(b.schedule.application.end).getTime()
          );
        case 'beforeRecruiting':
          // 오픈 임박순 (application.start 오름차순)
          return (
            new Date(a.schedule.application.start).getTime() -
            new Date(b.schedule.application.start).getTime()
          );
        case 'completed':
          // 최신 종료순 (winnerAnnouncement.end 내림차순)
          return (
            new Date(b.schedule.winnerAnnouncement.end).getTime() -
            new Date(a.schedule.winnerAnnouncement.end).getTime()
          );
        default:
          // 기본: 최신순 (ID 역순 - numeric sort)
          return b.id.localeCompare(a.id, undefined, { numeric: true });
      }
    });

    // Pagination Logic
    const totalCount = filteredCampaigns.length;
    const totalPages = Math.ceil(totalCount / size);
    const start = (page - 1) * size;
    const end = start + size;
    const content = filteredCampaigns.slice(start, end).map((campaign) => {
      // 목록 조회 시에는 상세 정보 제외 (Lightweight)

      const {
        estimatedValue,
        keywords,
        visitReservation,
        reviewMission,
        reviewMissionNotice,
        requirements,
        precautions,
        ...summary
      } = campaign;
      return summary;
    });

    return HttpResponse.json({
      success: true,
      data: {
        content,
        meta: {
          page,
          size,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
        },
      },
    });
  }),

  // 캠페인 상세 조회
  http.get('/api/campaigns/:id', ({ params }) => {
    const { id } = params;
    const campaign = INITIAL_CAMPAIGNS.find((c) => c.id === id);

    if (campaign) {
      return HttpResponse.json({
        success: true,
        data: campaign,
      });
    }

    return HttpResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
  }),
];
