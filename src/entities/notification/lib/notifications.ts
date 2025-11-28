import { Notification } from '@entities/notification/types/notification.types';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    campaignId: '1',
    isWatched: false,
    title: '체험단 선정 안내',
    content: '축하합니다! <그라운드220> 체험단에 선정되었어요. 체험 방문 일정을 예약해주세요.',
    type: 'default',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1시간 전
  },
  {
    id: 2,
    campaignId: '2',
    isWatched: true,
    title: '체험단 선정 안내',
    content:
      '<그라운드220> 체험단에 선정이 안됐어요. 이번엔 아쉽지만 다음 체험에서 꼭 다시 만나요.',
    type: 'default',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
  },
  {
    id: 3,
    campaignId: '3',
    isWatched: true,
    title: '예약 요청 안내',
    content:
      '<그라운드220> 체험 방문 예약을 해주세요. 방문 가능 기간 내 예약이 안될 경우 선정이 취소돼요.',
    type: 'schedule',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 1개월 전
  },
  {
    id: 4,
    campaignId: '4',
    isWatched: true,
    title: '후기 수정 안내',
    content: '<그라운드220> 체험 후기 수정이 필요해요. 자세한 내용을 보시려면 클릭해주세요.',
    type: 'edit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 1개월 전
  },
];
