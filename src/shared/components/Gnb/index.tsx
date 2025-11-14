'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { GnbProps } from './types';
import { IconNotification } from '@pop-ui/foundation';

import styles from './style.module.scss';

export function Gnb({ notification = 0 }: GnbProps) {
  let notifiStyles = '';

  if (notification > 0) {
    notifiStyles = styles.NotificationIcon__Active;
  }

  return (
    <header className={styles.Gnb}>
      <Link href="/" className={styles.Gnb__Logo}>
        <Image src="/images/Logo.svg" alt="로고 이미지" width={146} height={36} />
      </Link>
      <Link
        href="/notifications"
        className={styles.Notification__Icon}
        aria-label="알림 페이지로 이동"
      >
        <IconNotification size={24} />
        {notification > 0 && (
          <span className={notifiStyles}> {notification >= 10 ? '9+' : notification}</span>
        )}
      </Link>
    </header>
  );
}
