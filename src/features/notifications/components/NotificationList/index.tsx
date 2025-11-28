'use client';

import NotificationCard from '../NotificationCard';
import styles from './style.module.scss';
import { Notification } from '@entities/notification/types/notification.types';

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  return (
    <ul className={styles.NotificationList}>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <NotificationCard {...notification} />
        </li>
      ))}
    </ul>
  );
}
