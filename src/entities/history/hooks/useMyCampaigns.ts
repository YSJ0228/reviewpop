import { useQuery } from '@tanstack/react-query';
import type { MyCampaign, MyCampaignStatus } from '@entities/history/types/myCampaign.types';

interface MyCampaignsResponse {
  data: MyCampaign[];
  success: boolean;
}

/**
 * 체험 목록을 가져오는 React Query 훅
 */
export function useMyCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async (): Promise<MyCampaign[]> => {
      const response = await fetch('/api/my-campaigns');
      if (!response.ok) {
        throw new Error('체험 목록을 불러오는데 실패했습니다.');
      }
      const json: MyCampaignsResponse = await response.json();
      return json.data;
    },
  });
}

/**
 * 특정 상태의 체험만 필터링하는 헬퍼 함수
 */
export function filterCampaignsByStatus(
  campaigns: MyCampaign[] | undefined,
  status: MyCampaignStatus,
): MyCampaign[] {
  if (!campaigns) return [];
  return campaigns.filter((campaign) => campaign.status === status);
}

export function calculateAnnouncementDate(campaign: MyCampaign): string {
  if (!campaign.announcementDate) return '';

  const announcementDate = new Date(campaign.announcementDate);
  if (isNaN(announcementDate.getTime())) return '';

  const today = new Date();
  // 날짜 비교를 위해 시간을 00:00:00으로 초기화
  announcementDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = announcementDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '곧 발표 예정';
  } else if (diffDays < 0) {
    return '결과 대기중';
  }

  return `발표일까지 D-${diffDays}`;
}
