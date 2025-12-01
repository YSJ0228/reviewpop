'use client';

import { Loader } from '@mantine/core';

import NotificationList from '@features/notifications/components/NotificationList';
import { useNotifications } from '@entities/notification/model/useNotifications';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import styles from './page.module.scss';

export default function NotificationsPage() {
  const { newNotifications, oldNotifications, isLoading } = useNotifications();

  usePageHeader({
    showBackButton: true,
    title: '알림',
    showXButton: false,
    isVisible: true,
  });

  if (isLoading) return <Loader />;
  return (
    <div className={styles.Notification}>
      <NotificationList notifications={newNotifications} />
      <h2>지난 알림</h2>
      <NotificationList notifications={oldNotifications} />
    </div>
  );
}
