'use client';

import { useMemo } from 'react';

import { diff, now } from '@shared/lib/date';

import type { Campaign } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignStatusBarProps {
  campaign: Campaign;
}

/**
 * 체험 상태 바 컴포넌트
 * - 남은 일수 표시
 * - 신청 인원 수 표시
 * - 선정 확률 배지 표시
 */
export function CampaignStatusBar({ campaign }: CampaignStatusBarProps) {
  const deadline = campaign.schedule.application.end;

  // 남은 시간 계산
  const { remainingTimeText } = useMemo(() => {
    const currentTime = now();
    const hours = diff(deadline, currentTime, 'hour');
    const days = diff(deadline, currentTime, 'day');

    let timeText: string;
    if (hours <= 0) {
      timeText = '마감됨';
    } else if (hours <= 24) {
      timeText = '오늘 마감';
    } else {
      timeText = `${Math.max(0, days)}일 남음`;
    }

    return {
      remainingTimeText: timeText,
    };
  }, [deadline]);

  return (
    <div className={styles.CampaignStatusBar} role="status" aria-live="polite">
      <span className={styles.RemainingTime}>{remainingTimeText}</span>
      <span className={styles.ApplicantCount}>
        신청 {campaign.currentRecruitment}명
        <span className={styles.ApplicantCount__Total}>/{campaign.maxRecruitment}명</span>
      </span>
    </div>
  );
}
