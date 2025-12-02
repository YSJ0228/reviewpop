import { useQuery } from '@tanstack/react-query';
import type { Application, ApplicationStatus } from '@entities/application';
import type { IMyCampaignsResponse } from '../api/mockMyCampaign.types';

/**
 * 체험 신청 목록을 가져오는 React Query 훅
 * @param userId - 조회할 사용자 ID (기본값: 'kakao-1002')
 */
export function useMyCampaigns(userId: string = 'kakao-1002') {
  return useQuery({
    queryKey: ['my-applications', userId],
    queryFn: async (): Promise<Application[]> => {
      const response = await fetch(`/api/my-campaigns?userId=${userId}`);
      if (!response.ok) {
        throw new Error('체험 목록을 불러오는데 실패했습니다.');
      }
      const json: IMyCampaignsResponse = await response.json();
      return json.data;
    },
  });
}

/**
 * 특정 상태의 체험만 필터링하는 헬퍼 함수
 * - reviewed 탭: status가 'reviewed'이거나, campaign.status가 'closed'이고 reviewStatus가 'notReviewed'인 경우
 * - completed 탭: status가 'completed'인 경우 (승인 완료된 것만)
 */
export function filterCampaignsByStatus(
  applications: Application[] | undefined,
  status: ApplicationStatus,
): Application[] {
  if (!applications) return [];

  // reviewed 탭의 경우 특별 처리
  if (status === 'reviewed') {
    return applications.filter((app) => {
      // 일반적인 reviewed 상태
      if (app.status === 'reviewed') {
        return true;
      }
      // 체험이 종료되었지만 후기 미등록인 경우도 후기 탭에 표시
      if (app.campaign.status === 'closed' && app.reviewStatus === 'notReviewed') {
        return true;
      }
      return false;
    });
  }

  // completed 탭의 경우: 승인 완료된 것만 표시 (reviewStatus가 'reviewed'인 경우)
  if (status === 'completed') {
    return applications.filter((app) => {
      return app.status === 'completed' && app.reviewStatus === 'reviewed';
    });
  }

  // 나머지 탭은 기존 로직 유지
  return applications.filter((app) => app.status === status);
}

/**
 * 발표일을 계산하는 헬퍼 함수
 */
export function calculateAnnouncementDate(
  announcementDate: string | undefined,
  currentDate: Date = new Date(),
): string {
  if (!announcementDate) return '';

  const announcement = new Date(announcementDate);
  if (isNaN(announcement.getTime())) return '';

  // UTC 기준으로 날짜 정규화
  const announcementDay = new Date(
    Date.UTC(announcement.getFullYear(), announcement.getMonth(), announcement.getDate()),
  );
  const todayDay = new Date(
    Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
  );

  const diffTime = announcementDay.getTime() - todayDay.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '곧 발표 예정';
  if (diffDays < 0) return '결과 대기중';

  return `발표일까지 D-${diffDays}`;
}
