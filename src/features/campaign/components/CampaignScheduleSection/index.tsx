'use client';

import dayjs from '@shared/lib/dayjs.config';
import { formatDate, type DateInput } from '@shared/lib/date';

import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignScheduleSectionProps {
  campaign: CampaignDetail;
}

interface ScheduleItem {
  label: string;
  dateRange: { start: string; end: string };
  isActive: boolean;
  isPast: boolean;
}

const SCHEDULE_CONFIG = [
  { key: 'application' as const, label: '체험단 모집' },
  { key: 'winnerAnnouncement' as const, label: '당첨자 발표' },
  { key: 'review' as const, label: '방문/후기 등록' },
] as const;

/**
 * 날짜 범위를 MM.DD(요일) 형식으로 포맷팅
 * 시작일과 종료일이 같으면 하나의 날짜만 표시
 */
function formatDateRange(start: DateInput, end: DateInput): string {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  // 날짜 유효성 검증
  if (!startDate.isValid() || !endDate.isValid()) {
    console.error('Invalid date provided:', { start, end });
    return '-';
  }

  const startDateNormalized = startDate.startOf('day');
  const endDateNormalized = endDate.startOf('day');

  // 시작일과 종료일이 같은 날이면 하나만 표시
  if (startDateNormalized.isSame(endDateNormalized, 'day')) {
    return formatDate(start, 'MMDD_DDD_SHORT');
  }

  const startFormatted = formatDate(start, 'MMDD_DDD_SHORT');
  const endFormatted = formatDate(end, 'MMDD_DDD_SHORT');
  return `${startFormatted} ~ ${endFormatted}`;
}

/**
 * 일정 항목의 상태 계산
 */
function getScheduleItemStatus(dateRange: { start: string; end: string }) {
  const now = dayjs();
  const start = dayjs(dateRange.start).startOf('day');
  const end = dayjs(dateRange.end).endOf('day');

  // 마감일이 지난 경우
  const isPast = now.isAfter(end);

  // 현재 기간에 해당하는 경우 (시작일 포함, 종료일 포함)
  // isSameOrAfter: now가 start와 같거나 이후인지 확인
  // isSameOrBefore: now가 end와 같거나 이전인지 확인
  const isSameOrAfter = now.isSame(start, 'day') || now.isAfter(start);
  const isSameOrBefore = now.isSame(end, 'day') || now.isBefore(end);
  const isActive = isSameOrAfter && isSameOrBefore;

  return { isPast, isActive };
}

/**
 * 체험 진행 일정 섹션 컴포넌트
 * - 체험단 모집 기간
 * - 당첨자 발표 기간
 * - 방문/후기 등록 기간
 */
export function CampaignScheduleSection({ campaign }: CampaignScheduleSectionProps) {
  const { schedule } = campaign;

  const scheduleItems: ScheduleItem[] = SCHEDULE_CONFIG.map(({ key, label }) => ({
    label,
    dateRange: schedule[key],
    ...getScheduleItemStatus(schedule[key]),
  }));

  return (
    <div className={styles.CampaignScheduleSection}>
      <h2 className={styles.Title}>진행 일정</h2>
      <div className={styles.TimelineContainer}>
        {/* 타임라인 */}
        <div className={styles.TimelineColumn}>
          {scheduleItems.map((item, index) => (
            <div key={index} className={styles.TimelineItem}>
              <div className={`${styles.Marker} ${item.isActive ? styles.MarkerActive : ''}`} />
              {index < scheduleItems.length - 1 && <div className={styles.Connector} />}
            </div>
          ))}
        </div>

        {/* 콘텐츠 */}
        <div className={styles.ContentColumn}>
          {scheduleItems.map((item, index) => (
            <div key={index} className={styles.Content}>
              <div
                className={`${styles.Label} ${item.isPast ? styles.LabelPast : ''} ${item.isActive ? styles.LabelActive : ''}`}
              >
                {item.label}
              </div>
              <div
                className={`${styles.DateRange} ${item.isPast ? styles.DateRangePast : ''} ${item.isActive ? styles.DateRangeActive : ''}`}
              >
                {formatDateRange(item.dateRange.start, item.dateRange.end)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
