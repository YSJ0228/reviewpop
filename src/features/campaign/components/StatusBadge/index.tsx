import dayjs from 'dayjs';

import { Campaign } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export default function StatusBadge({ campaign }: { campaign: Campaign }) {
  const now = dayjs();
  const reviewEnd = dayjs(campaign.schedule.review.end);
  const isReviewEnded = reviewEnd < now;
  const isHighProbability = campaign.currentRecruitment < campaign.maxRecruitment / 2;
  const BADGE_MESSAGE = {
    ReviewEnded: '종료된 체험',
    HighProbability: '선정 확률 높음',
  };
  const status =
    (isReviewEnded && 'ReviewEnded') || (isHighProbability && 'HighProbability') || null;

  if (!status) return null;

  const style = [styles.Badge, styles[`Badge--${status}`]].join(' ');

  return (
    <div className={style}>
      <span>{BADGE_MESSAGE[status]}</span>
    </div>
  );
}
