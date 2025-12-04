import { ReviewMissionSectionProps } from './types';

import styles from './style.module.scss';

/**
 * 후기 미션 섹션 컴포넌트
 * @param missions - 후기 미션 목록
 * @param campaignId - 체험 ID
 */
export function ReviewMissionSection({ missions, campaignId }: ReviewMissionSectionProps) {
  if (!missions || missions.length === 0) {
    return null;
  }

  return (
    <section aria-label="후기 미션 내용" className={styles.ReviewMissionSection}>
      <div className={styles.ReviewMissionSection__SectionContent}>
        <h3>후기 미션</h3>
        <ul className={styles.ReviewMissionSection__MissionList}>
          {missions.map((mission, index) => (
            <li
              key={`${campaignId}-mission-${index}`}
              className={styles.ReviewMissionSection__MissionItem}
            >
              {mission}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
