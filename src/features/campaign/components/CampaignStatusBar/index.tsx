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
  // 남은 시간 계산
  const { remainingDays, remainingHours } = useMemo(() => {
    const deadline = campaign.schedule.applicationSchedule[1];
    const currentTime = now();
    const hours = diff(deadline, currentTime, 'hour');
    const days = Math.max(0, Math.floor(hours / 24));

    return {
      remainingDays: days,
      remainingHours: hours,
    };
  }, [campaign.schedule.applicationSchedule]);

  const remainingTimeText = useMemo(() => {
    // 마감이 지난 경우
    if (remainingHours <= 0) {
      return '마감됨';
    }

    // 24시간 이하일 때 "오늘 마감" 표시
    if (remainingHours <= 24) {
      return '오늘 마감';
    }

    return `${remainingDays}일 남음`;
  }, [remainingDays, remainingHours]);

  // 선정 확률 높음 배지 표시 조건: 1일 남음 시점부터 신청자 수가 모집 인원의 50% 미만일 때
  const shouldShowHighProbabilityBadge = useMemo(() => {
    if (campaign.maxRecruitment === 0) return false;

    // 남은 일수가 1일 이하인지 확인
    if (remainingDays > 1) return false;

    // 신청자 수가 모집 인원의 50% 미만인지 확인
    const ratio = campaign.currentRecruitment / campaign.maxRecruitment;
    return ratio < 0.5;
  }, [remainingDays, campaign.currentRecruitment, campaign.maxRecruitment]);

  return (
    <div className={styles.CampaignStatusBar}>
      <span className={styles.RemainingTime}>{remainingTimeText}</span>
      <span className={styles.ApplicantCount}>
        신청 {campaign.currentRecruitment}명
        <span className={styles.ApplicantCount__Total}>/{campaign.maxRecruitment}명</span>
      </span>
      {shouldShowHighProbabilityBadge && (
        <span className={styles.SelectionProbabilityBadge}>선정 확률 높음</span>
      )}
    </div>
  );
}
