import { Notification } from '@entities/notification/types/notification.types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    campaignId: '1',
    isWatched: false,
    title: '체험단 선정 안내',
    content: '[서울 강남구] 2024년 1월 체험단에 선정되셨습니다.',
    type: 'default',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    campaignId: '2',
    isWatched: true,
    title: '리뷰 작성 기간 안내',
    content: '[서울 마포구] 리뷰 작성 기간이 3일 남았습니다.',
    type: 'schedule',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    campaignId: '3',
    isWatched: true,
    title: '예약 요청 안내',
    content:
      '<그라운드220> 체험 방문 예약을 해주세요. 방문 가능 기간 내 예약이 안될 경우 선정이 취소돼요.',
    type: 'schedule',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 1개월 전
  },
  {
    id: '4',
    campaignId: '4',
    isWatched: true,
    title: '후기 수정 안내',
    content: '<그라운드220> 체험 후기 수정이 필요해요. 자세한 내용을 보시려면 클릭해주세요.',
    type: 'edit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 1개월 전
  },
];
