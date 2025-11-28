import { http, HttpResponse } from 'msw';
import { mockNotifications } from '../lib/notifications';

export const notificationHandlers = [
  http.get('/api/notifications', () => {
    return HttpResponse.json(mockNotifications);
  }),
];
