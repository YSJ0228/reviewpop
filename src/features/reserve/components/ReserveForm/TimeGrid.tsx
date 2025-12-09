'use client';

import { useMemo } from 'react';
import { DateValue, TimeGrid as MantineTimeGrid } from '@mantine/dates';
import { formatDate } from '@shared/lib/date';
import 'dayjs/locale/ko';
import { generateTimeSlots, getPastTimes } from './utils';
import { useReservedDateTimes } from '@entities/reservation/hooks/useReserve';
import styles from './TimeGrid.module.scss';

interface TimeGridProps {
  value?: string | null;
  onChange?: (time: string | null) => void;
  intervalMinutes?: number;
  date: DateValue | null;
  campaignId: string;
}

const TIME_SECTIONS = [
  { label: '오전', startTime: '09:00', endTime: '12:00' },
  { label: '오후', startTime: '12:00', endTime: '18:00' },
] as const;

const GRID_PROPS = { cols: 4, spacing: 'xs', verticalSpacing: 'xs' } as const;

export function TimeGrid({ value, onChange, intervalMinutes, date, campaignId }: TimeGridProps) {
  const { data: reservedDateTimes, isLoading } = useReservedDateTimes(
    campaignId,
    date?.toString() ?? '',
  );

  // 각 섹션별 시간 슬롯 생성
  const sectionTimes = useMemo(() => {
    return TIME_SECTIONS.map((section) => ({
      ...section,
      times: generateTimeSlots({
        startTime: section.startTime,
        endTime: section.endTime,
        intervalMinutes,
      }),
    }));
  }, [intervalMinutes]);

  // 예약된 시간 파싱
  const reservedTimes = reservedDateTimes?.dateTimes
    ? reservedDateTimes.dateTimes.map((dt) => formatDate(dt, 'TIME'))
    : [];

  // 오늘이 선택되었을 때 현재 시간 이전 시간대 비활성화
  const pastTimes = useMemo(() => {
    const allTimes = sectionTimes.flatMap((section) => section.times);
    return getPastTimes(allTimes, date);
  }, [date, sectionTimes]);

  // 비활성화할 시간 = 예약된 시간 + 과거 시간
  const disabledTimes = [...new Set([...reservedTimes, ...pastTimes])];

  return (
    <div className={styles.TimeGrid}>
      {sectionTimes.map((section) => {
        const isSelectedInThisSection = value && section.times.includes(value);

        return (
          <div key={section.label} className={styles.TimeGrid__Section}>
            <h3 className={styles.TimeGrid__SectionLabel}>{section.label}</h3>
            <MantineTimeGrid
              data={section.times}
              value={isSelectedInThisSection ? value : null}
              onChange={onChange}
              disabled={!date || isLoading}
              disableTime={disabledTimes}
              allowDeselect
              simpleGridProps={GRID_PROPS}
              radius={8}
              classNames={{ simpleGrid: styles.TimeGrid__SimpleGrid }}
            />
          </div>
        );
      })}
    </div>
  );
}
