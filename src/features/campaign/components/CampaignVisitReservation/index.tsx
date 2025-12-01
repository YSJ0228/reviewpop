'use client';

import { useMemo } from 'react';

import type { CampaignDetail, VisitReservation } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignVisitReservationProps {
  campaign: CampaignDetail;
}

const WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;

/**
 * 영업시간 정보를 파싱하여 각 요일별로 개별 항목 배열로 반환
 */
function parseBusinessHours(
  businessHours: VisitReservation['businessHours'],
): Array<{ day: string; startTime?: string; endTime?: string; isClosed: boolean }> {
  // 런타임 검증: businessHours는 항상 7개 요소를 가져야함
  if (businessHours.length !== 7) {
    console.warn('businessHours should have exactly 7 elements');
    return [];
  }

  return businessHours.map((hours, dayIndex) => {
    if (hours === 'closed') {
      return {
        day: WEEKDAY_NAMES[dayIndex],
        isClosed: true,
      };
    }

    return {
      day: WEEKDAY_NAMES[dayIndex],
      startTime: hours.start,
      endTime: hours.end,
      isClosed: false,
    };
  });
}

/**
 * 체험 방문 및 예약 정보 섹션 컴포넌트
 * - 영업시간
 * - 예약 유무
 * - 예약 방법
 */
export function CampaignVisitReservation({ campaign }: CampaignVisitReservationProps) {
  const { visitReservation, status } = campaign;

  const businessHoursInfo = useMemo(
    () => (visitReservation ? parseBusinessHours(visitReservation.businessHours) : []),
    [visitReservation],
  );

  // 종료된 캠페인에서는 방문 및 예약 섹션을 표시하지 않음
  if (status === 'completed' || status === 'closed') {
    return null;
  }

  if (!visitReservation) {
    return null;
  }

  return (
    <div className={styles.CampaignVisitReservation}>
      <h2 className={styles.Title}>방문 및 예약</h2>

      {/* 영업시간 */}
      <div className={styles.BusinessHours}>
        <div className={styles.LabelColumn}>
          <span className={styles.Label}>영업시간</span>
        </div>
        <div className={styles.ContentColumn}>
          {businessHoursInfo.map((dayHour, index) => (
            <div key={index} className={styles.BusinessHoursItem}>
              <span className={styles.Day}>{dayHour.day}</span>
              <span className={styles.Time}>
                {dayHour.isClosed ? '정기휴무' : `${dayHour.startTime} - ${dayHour.endTime}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 예약 유무 */}
      {visitReservation.isReservationRequired && (
        <div className={styles.InfoItem}>
          <span className={styles.Label}>예약 유무</span>
          <span className={styles.Value}>방문 전 예약필수</span>
        </div>
      )}

      {/* 예약 방법 */}
      {visitReservation.reservationMethod && (
        <div className={styles.InfoItem}>
          <span className={styles.Label}>예약 방법</span>
          <div className={styles.ValueContainer}>
            <span className={styles.Value}>{visitReservation.reservationMethod}</span>
            {visitReservation.isReservationRequired && (
              <span className={styles.Notice}>(당첨 시 연락처 전달)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
