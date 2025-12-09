import dayjs from 'dayjs';

import { Campaign } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';
import { diff } from '@shared/lib/date';

export default function StatusBadge({ campaign }: { campaign: Campaign }) {
  const isCompleted = campaign.status === 'completed' || campaign.status === 'closed';
  const now = dayjs();
  const applicationEnd = dayjs(campaign.schedule.application.end);
  const dateDiff = diff(applicationEnd, now, 'hour');
  const isHighProbability =
    !isCompleted &&
    campaign.currentRecruitment < campaign.maxRecruitment / 2 &&
    dateDiff > 0 &&
    dateDiff <= 24;
  const BADGE_MESSAGE = {
    ReviewEnded: '종료된 체험',
    HighProbability: '선정 확률 높음',
  };
  const status = isCompleted ? 'ReviewEnded' : isHighProbability ? 'HighProbability' : null;

  if (!status) return null;

  const style = [styles.Badge, styles[`Badge--${status}`]].join(' ');

  return (
    <div className={style}>
      <span>{BADGE_MESSAGE[status]}</span>
    </div>
  );
}
