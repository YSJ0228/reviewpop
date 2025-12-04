import dayjs from 'dayjs';
import { CalendarDatePicker as PopUiCalendarDatePicker } from '@pop-ui/core';
import { DateValue } from '@mantine/dates';
import styles from './CalendarDatePicker.module.scss';
type TDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface CalendarDatePickerProps {
  excludedDates?: string[];
  excludedDays?: TDayOfWeek[];
  onChange: (date: DateValue | null) => void;
  startDate: string;
  endDate: string;
}

export function CalendarDatePicker({
  excludedDates,
  excludedDays,
  onChange,
  startDate,
  endDate,
}: CalendarDatePickerProps) {
  return (
    <div className={styles.CalendarDatePicker}>
      <PopUiCalendarDatePicker
        onChange={onChange}
        excludedDates={excludedDates}
        excludedDays={excludedDays}
        minDate={startDate}
        maxDate={endDate}
      />
      <span>방문 가능한 기간</span>
      <span className={styles.CalendarDatePicker__DateRange}>
        {dayjs(startDate).format('M월 D일')} ~ {dayjs(endDate).format('M월 D일')}
      </span>
    </div>
  );
}
