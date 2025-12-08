import { Notification } from '@entities/notification/types/notification.types';

import NotificationCard from '../NotificationCard';

import styles from './style.module.scss';

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
