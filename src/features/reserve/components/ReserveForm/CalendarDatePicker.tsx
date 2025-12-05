import { CalendarDatePicker as PopUiCalendarDatePicker } from '@pop-ui/core';
import { DateValue } from '@mantine/dates';
import { formatDateRange } from './utils';
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
  const dateRangeText = formatDateRange(startDate, endDate);

  return (
    <div className={styles.CalendarDatePicker}>
      <PopUiCalendarDatePicker
        onChange={onChange}
        excludedDates={excludedDates}
        excludedDays={excludedDays}
        minDate={startDate}
        maxDate={endDate}
      />
      <div className={styles.CalendarDatePicker__Footer}>
        <span className={styles.CalendarDatePicker__Label}>
          방문 가능한 기간
          <span className={styles.CalendarDatePicker__DateRange}>{dateRangeText}</span>
        </span>
      </div>
    </div>
  );
}
