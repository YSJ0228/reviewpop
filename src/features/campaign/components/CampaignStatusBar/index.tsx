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

  // 선정 확률 높음 배지 표시 조건: 24시간 이하 남았을 때 신청자 수가 모집 인원의 50% 미만일 때
  const shouldShowHighProbabilityBadge = useMemo(() => {
    if (campaign.maxRecruitment === 0 || campaign.maxRecruitment < 0) return false;

    // 남은 시간이 24시간 이하인지 확인
    const hours = diff(deadline, now(), 'hour');
    if (hours > 24 || hours <= 0) return false;

    // 신청자 수가 모집 인원의 50% 미만인지 확인
    const ratio = campaign.currentRecruitment / campaign.maxRecruitment;
    return ratio < 0.5;
  }, [deadline, campaign.currentRecruitment, campaign.maxRecruitment]);

  return (
    <div className={styles.CampaignStatusBar} role="status" aria-live="polite">
      <span className={styles.RemainingTime}>{remainingTimeText}</span>
      <span className={styles.ApplicantCount}>
        신청 {campaign.currentRecruitment}명
        <span className={styles.ApplicantCount__Total}>/{campaign.maxRecruitment}명</span>
      </span>
      {shouldShowHighProbabilityBadge && (
        <span className={styles.SelectionProbabilityBadge} role="status">
          선정 확률 높음
        </span>
      )}
    </div>
  );
}
