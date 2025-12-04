'use client';

import { DateValue, TimeGrid as MantineTimeGrid } from '@mantine/dates';
import { formatDate } from '@shared/lib/date';
import 'dayjs/locale/ko';
import { generateTimeSlots } from './utils';
import { useReservedDateTimes } from '@features/reserve/hooks/useReserve';
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

/**
 * ISO 8601 날짜시간 문자열을 HH:mm 형식으로 변환
 */
function parseReservedTimes(dateTimes: string[]): string[] {
  return dateTimes.map((dt) => formatDate(dt, 'TIME'));
}

export function TimeGrid({ value, onChange, intervalMinutes, date, campaignId }: TimeGridProps) {
  const { data: reservedDateTimes, isLoading } = useReservedDateTimes(
    campaignId,
    date?.toString() ?? '',
  );

  const reservedTimes = reservedDateTimes?.dateTimes
    ? parseReservedTimes(reservedDateTimes.dateTimes)
    : [];

  const handleChange = (time: string | null) => {
    onChange?.(time);
  };

  return (
    <div className={styles.TimeGrid}>
      {TIME_SECTIONS.map((section) => {
        const times = generateTimeSlots({
          startTime: section.startTime,
          endTime: section.endTime,
          intervalMinutes,
        });

        const isSelectedInThisSection = value && times.includes(value);

        return (
          <div key={section.label} className={styles.TimeGrid__Section}>
            <h3 className={styles.TimeGrid__SectionLabel}>{section.label}</h3>
            <MantineTimeGrid
              data={times}
              value={isSelectedInThisSection ? value : null}
              onChange={handleChange}
              disabled={!date || isLoading}
              disableTime={reservedTimes}
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
