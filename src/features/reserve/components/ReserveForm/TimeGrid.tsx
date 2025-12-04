'use client';

import dayjs from 'dayjs';
import { DateValue, TimeGrid as MantineTimeGrid } from '@mantine/dates';
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

export function TimeGrid({ value, onChange, intervalMinutes, date, campaignId }: TimeGridProps) {
  const { data: reservedDateTimes, isLoading } = useReservedDateTimes(
    campaignId,
    date?.toString() ?? '',
  );

  // 예약된 시간 파싱 (ISO -> HH:mm)
  const reservedTimes = reservedDateTimes?.dateTimes.map((dt) => dayjs(dt).format('HH:mm')) || [];

  const handleChange = (time: string | null) => {
    onChange?.(time);
  };

  const SECTIONS = [
    { label: '오전', startTime: '09:00', endTime: '12:00' },
    { label: '오후', startTime: '12:00', endTime: '18:00' },
  ];

  const simpleGridProps = { cols: 4, spacing: 'xs', verticalSpacing: 'xs' };

  return (
    <div className={styles.TimeGrid}>
      {SECTIONS.map((section) => {
        const times = generateTimeSlots({
          startTime: section.startTime,
          endTime: section.endTime,
          intervalMinutes: intervalMinutes,
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
              simpleGridProps={simpleGridProps}
              radius={8}
              classNames={{ simpleGrid: styles.TimeGrid__SimpleGrid }}
            />
          </div>
        );
      })}
    </div>
  );
}
