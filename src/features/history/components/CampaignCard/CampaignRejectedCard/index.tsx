import dayjs from 'dayjs';

import { CONSTANTS } from '@shared/config/constants';
import { HISTORY_MESSAGES } from '@features/history/constants';

import type { CampaignRejectedCardProps } from './types';

import styles from './style.module.scss';

/**
 * 미선정 체험 카드 컴포넌트
 * @param recruitmentSchedule - 모집 일정
 * @param maxRecruitment - 최대 선정 인원
 * @returns 미선정 체험 카드 컴포넌트
 */
export function CampaignRejectedCard({
  recruitmentSchedule,
  maxRecruitment,
}: CampaignRejectedCardProps) {
  if (!recruitmentSchedule) {
    return null;
  }

  return (
    <div className={styles.CampaignRejectedCard__Date} aria-label="모집 일정 및 선정 인원">
      <time dateTime={recruitmentSchedule[0]}>
        {HISTORY_MESSAGES.RECRUITMENT} {dayjs(recruitmentSchedule[0]).format('MM.DD')}
      </time>
      <span> ~ </span>
      <time dateTime={recruitmentSchedule[1]}>{dayjs(recruitmentSchedule[1]).format('MM.DD')}</time>
      <span className={styles.CampaignRejectedCard__MaxRecruitment}>
        {maxRecruitment ?? CONSTANTS.DEFAULT_COUNT.MAX_RECRUITMENT}{' '}
        {HISTORY_MESSAGES.SELECTED_COUNT}
      </span>
    </div>
  );
}
