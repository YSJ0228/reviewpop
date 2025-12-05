import type { Application } from '@entities/application';
import { INITIAL_CAMPAIGNS } from '@entities/campaign/api/mock/data';

function getCampaign(id: string) {
  const campaign = INITIAL_CAMPAIGNS.find((c) => c.id === id);
  if (!campaign) throw new Error(`Campaign ${id} not found`);
  return campaign;
}

export const mockMyCampaigns: Application[] = [
  // 1. 미선정 (Rejected)
  {
    id: 'app-1',
    userId: 'kakao-1001',
    campaign: getCampaign('1'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'rejected',
    isReservated: false,
    createdAt: '2025-11-05T10:00:00Z',
  },

  // 1.5. 신청 (Pending)
  {
    id: 'app-2',
    userId: 'kakao-1001',
    campaign: getCampaign('2'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'pending',
    isReservated: false,
    createdAt: '2025-11-25T09:00:00Z',
  },

  // 2. 선정 - 방문 예약 전 (Selected - Before Reservation)
  {
    id: 'app-3',
    userId: 'kakao-1001',
    campaign: getCampaign('3'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'selected',
    isReservated: false,
    createdAt: '2025-11-09T14:00:00Z',
  },
  {
    id: 'app-4',
    userId: 'kakao-1001',
    campaign: getCampaign('4'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'pending',
    isReservated: false,
    createdAt: '2025-11-09T14:00:00Z',
  },

  // 3. 선정 - 방문 예약 후 (Selected - After Reservation)
  {
    id: 'app-5',
    userId: 'kakao-1001',
    campaign: getCampaign('5'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'reviewed',
    reservationId: 'res-004',
    reviewStatus: 'notReviewed',
    isReservated: true,
    reservationDate: '2025-11-15T10:00:00',
    createdAt: '2025-11-05T11:00:00Z',
  },

  // 4. 후기 - 작성 전 (Review - Before) - 방문 완료

  {
    id: 'app-6',
    userId: 'kakao-1001',
    campaign: getCampaign('6'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'selected',
    isReservated: true,
    reservationDate: '2025-11-28T14:00:00',
    reservationId: 'res-005',
    createdAt: '2025-10-25T09:00:00Z',
  },
  // 4-1. 후기 - 체험 완료 (예약 날짜 익일)
  {
    id: 'app-7',
    userId: 'kakao-1001',
    campaign: getCampaign('7'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'reviewed',
    reviewStatus: 'visited', // 체험 완료 (예약 날짜 익일)
    isReservated: true,
    reservationDate: '2025-11-14T14:00:00',
    createdAt: '2025-11-05T11:00:00Z',
  },

  // 4-2. 후기 - 체험이 종료되었지만 후기 미등록 (Review - Closed but Not Reviewed)
  {
    id: 'app-8',
    userId: 'kakao-1001',
    campaign: getCampaign('8'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'reviewed', // 후기 탭에 표시되도록
    reviewStatus: 'notReviewed', // 후기 미등록 상태
    isReservated: true,
    reservationDate: '2025-09-18T13:00:00', // 체험 종료일
    createdAt: '2025-09-05T10:00:00Z',
  },

  // 5. 후기 - 검토 중 (Review - Pending)
  {
    id: 'app-9',
    userId: 'kakao-1001',
    campaign: getCampaign('9'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'reviewed',
    reviewStatus: 'reviewPending', // 후기 검토 중
    isReservated: true,
    reservationDate: '2025-10-22T14:00:00',
    createdAt: '2025-10-10T15:00:00Z',
  },

  // 6. 후기 - 수정 요청 (Review - Requested)
  {
    id: 'app-10',
    userId: 'kakao-1001',
    campaign: getCampaign('10'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'reviewed',
    reviewStatus: 'requiredForEditing', // 후기 수정 요청
    isReservated: true,
    reservationDate: '2025-10-25T11:00:00',
    createdAt: '2025-10-08T09:00:00Z',
  },

  // 7. 완료 (Completed) - 종료 탭
  {
    id: 'app-11',
    userId: 'kakao-1001',
    campaign: getCampaign('11'),
    name: '김철수',
    blogAddress: 'https://blog.naver.com/user1',
    phoneNumber: '010-1234-5678',
    status: 'completed',
    reviewStatus: 'reviewed', // 체험 종료 (종료 탭)
    isReservated: true,
    reservationDate: '2025-09-20T13:00:00',
    createdAt: '2025-09-05T10:00:00Z',
  },
];

export function findMyCampaignById(id: string): Application | undefined {
  return mockMyCampaigns.find((app) => app.campaign.id === id);
}
