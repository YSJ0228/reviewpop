import { ProfileInfoProps } from './types';

import styles from './style.module.scss';

export function ProfileInfo({ name, campaign, review }: ProfileInfoProps) {
  return (
    <div className={styles.ProfileInfo}>
      <h2 className={styles.ProfileInfo__Name}>{name}</h2>
      <div className={styles.ProfileInfo__Info}>
        <div className={styles.ProfileInfo__Detail}>
          <span className={styles.ProfileInfo__DetailTitle}>참여한 체험</span>
          <span className={styles.ProfileInfo__DetailValue}>{campaign}</span>
        </div>
        <div className={styles.ProfileInfo__Detail}>
          <span className={styles.ProfileInfo__DetailTitle}>등록한 후기</span>
          <span className={styles.ProfileInfo__DetailValue}>{review}</span>
        </div>
      </div>
    </div>
  );
}
