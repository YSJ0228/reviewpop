import { http, HttpResponse } from 'msw';
import { INITIAL_NOTIFICATIONS } from './data';

// 메모리상에서 알림 데이터 관리
const notifications = [...INITIAL_NOTIFICATIONS];

export const notificationHandlers = [
  // 내 알림 목록 조회
  http.get('/api/notifications', () => {
    // 실제로는 토큰 기반 인증.
    // 최신순 정렬
    const sortedNotifications = [...notifications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return HttpResponse.json(sortedNotifications);
  }),

  // 알림 읽음 처리 (해당 알림 및 그 이후에 생성된 모든 알림 읽음 처리)
  http.patch('/api/notifications/:id/read', ({ params }) => {
    const { id } = params;
    const targetNotification = notifications.find((n) => n.id === id);

    if (targetNotification) {
      const targetDate = new Date(targetNotification.createdAt);

      // 타겟 알림보다 최신이거나 같은 알림들을 모두 읽음 처리
      notifications.forEach((n, index) => {
        const currentDate = new Date(n.createdAt);
        if (currentDate >= targetDate) {
          notifications[index] = { ...n, isWatched: true };
        }
      });

      return HttpResponse.json({ success: true });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
