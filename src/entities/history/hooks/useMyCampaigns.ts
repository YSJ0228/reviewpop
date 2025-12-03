import { useQuery, useMutation } from '@tanstack/react-query';
import type { Application, ApplicationStatus } from '@entities/application';
import { getMyCampaigns, deleteMyCampaign } from '../api/myCampaignApi';

/**
 * 체험 신청 목록을 가져오는 React Query 훅
 */
export function useMyCampaigns() {
  return useQuery({
    queryKey: ['my-applications'],
    queryFn: () => getMyCampaigns(),
    select: (data) => data.applications,
  });
}

/**
 * 체험 신청 취소 훅
 */
export function useDeleteMyCampaign(applicationId: string) {
  return useMutation({
    mutationFn: () => deleteMyCampaign(applicationId),
    onSuccess: () => {
      console.log('체험 신청이 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('체험 신청 삭제에 실패했습니다.', error);
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
      // reviewStatus가 undefined일 수 있으므로 명시적으로 체크
      if (app.campaign.status === 'closed' && app.reviewStatus === 'notReviewed') {
        return true;
      }
      return false;
    });
  }

  // completed 탭의 경우: 승인 완료된 것만 표시 (reviewStatus가 'reviewed'인 경우)
  if (status === 'completed') {
    return applications.filter((app) => {
      // reviewStatus가 undefined일 수 있으므로 명시적으로 체크
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
