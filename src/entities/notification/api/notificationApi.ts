import { apiClient } from '@shared/api/client';
import { Notification } from '../types/notification.types';

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  },
  readNotifications: async (id: Notification['id']) => {
    const request = await apiClient.patch(`/notifications/${id}/read`);
    return request.data;
  },
};
