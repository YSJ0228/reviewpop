'use client';

import { NotificationType } from '@entities/notification/types/notification.types';
import Image from 'next/image';

import styles from './style.module.scss';

export default function NotificationCard() {
  const ICONS: Record<NotificationType, string> = {
    default: '/images/icons/IcoNotice.svg',
    schedule: '/images/icons/IcoTime.svg',
    edit: '/images/icons/IcoList.svg',
  };
  return (
    <div className={styles.Notification}>
      <Image src={ICONS.default} width={20} height={20} alt={`아이콘`} />
      <div className={styles.Notification__Wrapper}>
        <div className={styles.Notification__Wrapper__Header}>
          <h3>새로운 체험 오픈!</h3>
          <span>1분 전</span>
        </div>
        <p className={styles.Notification__Wrapper__Content}>
          축하합니다! {`<그라운드220>`} 체험단에 선정되었어요. 체험 방문 일정을 예약해주세요.
        </p>
      </div>
    </div>
  );
}
