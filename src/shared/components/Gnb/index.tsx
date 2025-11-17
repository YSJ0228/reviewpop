'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconNotification } from '@pop-ui/foundation';

import styles from './style.module.scss';

import type { IGnbProps } from './types';

const MAX_BADGE_COUNT = 9;

export function Gnb({ notification = 0 }: IGnbProps) {
  const validNotificationCount = useMemo(() => {
    return Math.max(0, Math.floor(notification));
  }, [notification]);

  return (
    <header className={styles.Gnb}>
      <Link href="/" className={styles.Gnb__Logo}>
        <Image src="/images/Logo.svg" alt="로고 이미지" width={146} height={36} />
      </Link>
      <Link
        href="/notifications"
        className={styles.Gnb__Notification}
        aria-label={
          validNotificationCount > 0
            ? `알림 페이지로 이동, ${validNotificationCount}개의 새 알림`
            : '알림 페이지로 이동'
        }
      >
        <IconNotification size={24} />
        {validNotificationCount > 0 && (
          <span className={styles.Gnb__Notification__Active} aria-hidden="true">
            {validNotificationCount > MAX_BADGE_COUNT
              ? `${MAX_BADGE_COUNT}+`
              : validNotificationCount}
          </span>
        )}
      </Link>
    </header>
  );
}
