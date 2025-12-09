'use client';

import { LoadingSpinner } from '@shared/components';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { useNotifications } from '@entities/notification/model/useNotifications';
import NotificationList from '@features/notifications/components/NotificationList';

import styles from './page.module.scss';

export default function NotificationsContent() {
  const { newNotifications, oldNotifications, isLoading } = useNotifications();

  usePageHeader({
    showBackButton: true,
    title: '알림',
    showXButton: false,
    isVisible: true,
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className={styles.Notification}>
      <NotificationList notifications={newNotifications} />
      <h2>지난 알림</h2>
      <NotificationList notifications={oldNotifications} />
    </div>
  );
}
