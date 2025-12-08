import { UserCampaigns } from '@entities/user/types/user.types';
import { mockApplications } from './applications';

const userId = 'kakao-1001';
const myApplications = mockApplications.filter((app) => app.userId === userId);

// 1. 참여한 캠페인 수 (selected, reviewed, completed 상태)
const participatedCampaigns = myApplications.filter((app) =>
  ['selected', 'reviewed', 'completed'].includes(app.status),
).length;

// 2. 등록된 리뷰 수 (reviewed 상태 중 reviewStatus가 reviewed인 것)
const enrolledReviews = myApplications.filter((app) => app.reviewStatus === 'reviewed').length;

// 3. 내 체험단 현황 리스트 (최근 5개)
const campaigns = myApplications
  .map((app) => ({
    campaign: app.campaign,
    applicationId: app.id,
    status: (app.status === 'pending'
      ? 'plan'
      : app.status === 'selected'
        ? 'reservation'
        : 'review') as 'plan' | 'reservation' | 'review',
    date: app.reservationDate || app.createdAt,
  }))
  .slice(0, 5);

export const mockUserCampaigns: UserCampaigns = {
  name: '김철수',
  participatedCampaigns,
  enrolledReviews,
  campaigns,
};
