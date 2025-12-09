import {
  CalendarDatePicker as PopUiCalendarDatePicker,
  ICalendarDatePickerProps,
} from '@pop-ui/core';
import { formatDateRange } from './utils';
import styles from './CalendarDatePicker.module.scss';

export function CalendarDatePicker({
  excludedDates,
  excludedDays,
  onChange,
  minDate,
  maxDate,
  ...props
}: ICalendarDatePickerProps) {
  const dateRangeText = formatDateRange(minDate, maxDate);

  return (
    <div className={styles.CalendarDatePicker}>
      <PopUiCalendarDatePicker
        classNames={{
          day: styles.CalendarDatePicker__Day,
          calendarHeaderLevel: styles.CalendarDatePicker__HeaderLevel,
        }}
        onChange={onChange}
        excludedDates={excludedDates}
        excludedDays={excludedDays}
        minDate={minDate}
        maxDate={maxDate}
        {...props}
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
