'use client';

import Link from 'next/link';
import Image from 'next/image';

import { fromNow } from '@shared/lib/date';
import { Notification, NotificationType } from '@entities/notification/types/notification.types';

import styles from './style.module.scss';

export default function NotificationCard({
  campaignId,
  isWatched,
  title,
  content,
  type,
  createdAt,
}: Notification) {
  const ICONS: Record<NotificationType, string> = {
    default: '/images/icons/IcoNotice.svg',
    schedule: '/images/icons/IcoCalendar.svg',
    edit: '/images/icons/IcoCaution.svg',
  };

  return (
    <Link href={`/campaign/${campaignId}`}>
      <div className={`${styles['Notification']} ${styles[isWatched ? '' : 'Notification--New']}`}>
        <Image src={ICONS[type as NotificationType]} width={18} height={18} alt={`아이콘`} />
        <div className={styles.Notification__Wrapper}>
          <div className={styles.Notification__Wrapper__Header}>
            <h3>{title}</h3>
            <span>{fromNow(createdAt)}</span>
          </div>
          <p className={styles.Notification__Wrapper__Content}>{content}</p>
        </div>
      </div>
    </Link>
  );
}
