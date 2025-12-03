'use client';

import { TimeGrid as MantineTimeGrid } from '@mantine/dates';
import 'dayjs/locale/ko';
import { generateTimeSlots } from './utils';
import { useReservedDateTimes } from '@features/reserve/hooks/useReserve';

interface TimeGridProps {
  value?: string | null;
  onChange?: (time: string | null) => void;
  intervalMinutes?: number;
  date: string | null;
  campaignId: string;
}

export function TimeGrid({ value, onChange, intervalMinutes, date, campaignId }: TimeGridProps) {
  const morningTimes = generateTimeSlots({
    startTime: '09:00',
    endTime: '12:00',
    intervalMinutes: intervalMinutes,
  });
  console.log(date);
  const {
    data: reservedDateTimes,
    isLoading,
    error,
  } = useReservedDateTimes(campaignId, date ?? '');
  const afternoonTimes = generateTimeSlots({
    startTime: '12:00',
    endTime: '18:00',
    intervalMinutes: intervalMinutes,
  });

  const handleChange = (time: string | null) => {
    console.log(time);
    onChange?.(time);
  };

  const isMorningTime = value && morningTimes.includes(value);
  const isAfternoonTime = value && afternoonTimes.includes(value);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">오전</h3>
        <MantineTimeGrid
          data={morningTimes}
          value={isMorningTime ? value : null}
          onChange={handleChange}
          disabled={!date}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">오후</h3>
        <MantineTimeGrid
          data={afternoonTimes}
          value={isAfternoonTime ? value : null}
          onChange={handleChange}
          disabled={!date}
        />
      </div>
    </div>
  );
}
