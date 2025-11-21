'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconNotification, IconSetting } from '@pop-ui/foundation';

import styles from './style.module.scss';

import type { IGnbProps } from './types';

const MAX_BADGE_COUNT = 9;
const ICON_SIZE = 24;
const PROFILE_PATH = '/profile';
const NOTIFICATIONS_PATH = '/notifications';
const SETTINGS_PATH = '/settings';

export function Gnb({ notification = 0 }: IGnbProps) {
  const pathname = usePathname();

  const showSetting = pathname === PROFILE_PATH;
  const rightClassName = [showSetting && styles.Gnb__Right].filter(Boolean).join(' ');

  const validNotificationCount = useMemo(() => {
    return Math.max(0, Math.floor(notification));
  }, [notification]);

  return (
    <header className={styles.Gnb}>
      <Link href="/" className={styles.Gnb__Logo}>
        <Image src="/images/Logo-left.svg" alt="리뷰팝 로고" width={99} height={14} />
        <Image src="/images/Logo-right.svg" alt="" width={44} height={14} />
      </Link>
      <div className={rightClassName}>
        <Link
          href={NOTIFICATIONS_PATH}
          className={styles.Gnb__Notification}
          aria-label={
            validNotificationCount > 0
              ? `알림 페이지로 이동, ${validNotificationCount}개의 새 알림`
              : '알림 페이지로 이동'
          }
        >
          <IconNotification size={ICON_SIZE} />
          {validNotificationCount > 0 && (
            <span className={styles.Gnb__Notification__Active} aria-hidden="true">
              {validNotificationCount > MAX_BADGE_COUNT
                ? `${MAX_BADGE_COUNT}+`
                : validNotificationCount}
            </span>
          )}
        </Link>
        {showSetting && (
          <Link
            href={SETTINGS_PATH}
            className={styles.Gnb__Setting}
            aria-label="설정 페이지로 이동"
          >
            <IconSetting size={ICON_SIZE} />
          </Link>
        )}
      </div>
    </header>
  );
}
