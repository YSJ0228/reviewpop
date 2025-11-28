import { useEffect, useState } from 'react';
import { Notification } from '../types/notification.types';
import { notificationApi } from '../api/notificationApi';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await notificationApi.getNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const newNotifications: Notification[] = [];
  const oldNotifications: Notification[] = [];

  notifications.forEach((notify) =>
    notify.isWatched ? oldNotifications.push(notify) : newNotifications.push(notify),
  );

  return { newNotifications, oldNotifications, isLoading, error };
};
