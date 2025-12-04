import { Notification, NotificationType } from '../../types/notification.types';
import { INITIAL_CAMPAIGNS } from '@entities/campaign/api/mock/data';
import {
  generateId,
  getRandomBoolean,
  getRandomDate,
  getRandomElement,
} from '@/mocks/utils/random';

const NOTIFICATION_TYPES: NotificationType[] = ['default', 'schedule', 'edit'];

const createRandomNotification = (index: number): Notification => {
  const campaign = getRandomElement(INITIAL_CAMPAIGNS);
  const type = getRandomElement(NOTIFICATION_TYPES);
  const isWatched = getRandomBoolean();
  const date = getRandomDate(new Date('2025-11-01'), new Date());

  let title = '알림';
  let content = '새로운 알림이 도착했습니다.';

  switch (type) {
    case 'default':
      title = '캠페인 선정 안내';
      content = `[${campaign.title}] 캠페인에 선정되셨습니다! 지금 바로 확인해보세요.`;
      break;
    case 'schedule':
      title = '리뷰 작성 기간 안내';
      content = `[${campaign.title}] 리뷰 작성 마감일이 3일 남았습니다. 늦지 않게 작성해주세요.`;
      break;
    case 'edit':
      title = '리뷰 수정 요청';
      content = `[${campaign.title}] 작성하신 리뷰에 대한 수정 요청이 있습니다. 확인 후 수정 부탁드립니다.`;
      break;
  }

  return {
    id: `noti_${generateId()}`,
    campaignId: campaign.id,
    isWatched,
    title,
    content,
    type,
    createdAt: date,
  };
};

export const INITIAL_NOTIFICATIONS: Notification[] = Array.from({ length: 15 }, (_, i) =>
  createRandomNotification(i),
);
