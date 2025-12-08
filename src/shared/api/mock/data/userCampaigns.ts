import { UserCampaigns } from '@entities/user/types/user.types';
import { mockApplications } from './applications';

export const getUserCampaigns = (): UserCampaigns => {
  const userId = 'kakao-1001';
  const myApplications = mockApplications.filter((app) => app.userId === userId);

  // 1. 참여한 캠페인 수
  const participatedCampaigns = myApplications.filter((app) =>
    ['selected', 'reviewed', 'completed'].includes(app.status),
  ).length;

  // 2. 등록된 리뷰 수
  const enrolledReviews = myApplications.filter((app) => app.reviewStatus === 'reviewed').length;

  // 3. 내 체험단 현황 리스트 (최근 5개)
  const campaigns = myApplications
    .filter((app) => {
      if (app.status === 'selected') return true;
      if (app.status === 'reviewed') {
        return ['notReviewed', 'visited', 'requiredForEditing'].includes(
          app.reviewStatus as string,
        );
      }
      return false;
    })
    .map((app) => ({
      campaign: app.campaign,
      applicationId: app.id,
      status: (app.status === 'selected'
        ? app.isReservated
          ? 'plan'
          : 'reservation'
        : 'review') as 'plan' | 'reservation' | 'review',
      date: app.reservationDate || app.createdAt,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    name: '김철수',
    participatedCampaigns,
    enrolledReviews,
    campaigns,
  };
};

export const mockUserCampaigns: UserCampaigns = getUserCampaigns();
