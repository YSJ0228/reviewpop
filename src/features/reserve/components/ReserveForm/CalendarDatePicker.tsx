import { CalendarDatePicker as PopUiCalendarDatePicker } from '@pop-ui/core';

export function CalendarDatePicker({ excludedDates, excludedDays, onChange }) {
  return (
    <PopUiCalendarDatePicker
      onChange={onChange}
      excludedDates={excludedDates}
      excludedDays={excludedDays}
      allowDeselect
    />
  );
}
