'use client';

import NotificationCard from '@features/notifications/components/NotificationCard';
import styles from './page.module.scss';

export default function NotificationsPage() {
  return (
    <div className={styles.Notification}>
      <ul>
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </ul>
    </div>
  );
}
