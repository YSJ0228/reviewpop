import dayjs from 'dayjs';

import { CONSTANTS } from '@shared/config/constants';
import { DATE_FORMATS } from '@shared/lib/date';
import { HISTORY_MESSAGES, DATE_RANGE_SEPARATOR } from '@features/history/constants';

import type { CampaignRejectedCardFooterProps } from './types';

import styles from './style.module.scss';

/**
 * 미선정 체험 카드 하단 컴포넌트 (bottomContent용)
 * @param recruitmentSchedule - 모집 일정
 * @param maxRecruitment - 최대 선정 인원
 * @returns 미선정 체험 카드 하단 컴포넌트
 */
export function CampaignRejectedCardFooter({
  recruitmentSchedule,
  maxRecruitment,
}: CampaignRejectedCardFooterProps) {
  if (!recruitmentSchedule) {
    return null;
  }

  return (
    <div className={styles.CampaignRejectedCardFooter__Date} aria-label="모집 일정 및 선정 인원">
      <time dateTime={recruitmentSchedule[0]}>
        {HISTORY_MESSAGES.RECRUITMENT}{' '}
        {dayjs(recruitmentSchedule[0]).format(DATE_FORMATS.MMDD_SHORT)}
      </time>
      <span>{DATE_RANGE_SEPARATOR}</span>
      <time dateTime={recruitmentSchedule[1]}>
        {dayjs(recruitmentSchedule[1]).format(DATE_FORMATS.MMDD_SHORT)}
      </time>
      <span className={styles.CampaignRejectedCardFooter__MaxRecruitment}>
        {maxRecruitment ?? CONSTANTS.DEFAULT_COUNT.MAX_RECRUITMENT}{' '}
        {HISTORY_MESSAGES.SELECTED_COUNT}
      </span>
    </div>
  );
}
