import { formatDate, type DateInput } from '@shared/lib/date';

const DEFAULT_MIN_COUNT = 1;
/**
 * 시간 문자열을 분 단위로 변환
 * @param time "HH:mm" 형식의 시간 문자열
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * 분을 시간 문자열로 변환
 * @param minutes 분 단위 숫자
 */
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

interface TimeRangeOptions {
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  intervalMinutes?: number; // 30, 60
}

/**
 * endTime을 제외한 시간 배열 생성
 * @example
 * generateTimeSlots({ startTime: "09:00", endTime: "12:00", intervalMinutes: 30 })
 * // Returns: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
 */
export function generateTimeSlots(options: TimeRangeOptions): string[] {
  const { startTime, endTime, intervalMinutes = 30 } = options;

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const times: string[] = [];

  for (let current = startMinutes; current < endMinutes; current += intervalMinutes) {
    times.push(minutesToTime(current));
  }

  return times;
}

/**
 * DateValue와 시간 문자열을 ISO 8601 형식으로 결합
 * @param date DateInput 타입 (string, number, Date, Dayjs) 또는 null
 * @param time "HH:mm" 형식의 시간 문자열 또는 null
 * @returns ISO 8601 형식의 날짜시간 문자열 또는 null
 * @example
 * combineDateAndTime(new Date('2025-12-05'), '14:30')
 * // Returns: "2025-12-05T14:30:00"
 */
export function combineDateAndTime(date: DateInput | null, time: string | null): string | null {
  if (!date || !time) return null;

  const dateStr = formatDate(date, 'DATE_ONLY'); // YYYY-MM-DD
  return `${dateStr}T${time}:00`;
}

/**
 * 날짜 범위를 포맷팅
 * @param startDate YYYY-MM-DD 형식의 시작 날짜
 * @param endDate YYYY-MM-DD 형식의 종료 날짜
 * @returns "M월 D일 ~ M월 D일" 형식의 문자열
 * @example
 * formatDateRange('2025-12-01', '2025-12-24')
 * // Returns: "12월 1일 ~ 12월 24일"
 */
export function formatDateRange(
  startDate: string | Date | undefined,
  endDate: string | Date | undefined,
): string {
  const start = formatDate(startDate as Date, 'MMDD_LONG');
  const end = formatDate(endDate as Date, 'MMDD_LONG');
  return `${start} ~ ${end}`;
}

/**
 * 카운터 값을 증가/감소시키는 헬퍼
 */
export const counterHelpers = {
  increment: (current: number, max: number): number => Math.min(max, current + 1),
  decrement: (current: number, min: number = DEFAULT_MIN_COUNT): number =>
    Math.max(min, current - 1),
};

/**
 * 오늘이 선택되었을 때 현재 시간 이전의 시간 슬롯 필터링
 * @param allTimes 모든 시간 슬롯 배열
 * @param selectedDate 선택된 날짜
 * @returns 현재 시간 이전의 시간 슬롯 배열 (오늘이 아니면 빈 배열)
 */
export function getPastTimes(allTimes: string[], selectedDate: DateInput | null): string[] {
  if (!selectedDate) return [];

  const today = formatDate(new Date(), 'DATE_ONLY');
  const selectedDateStr = formatDate(selectedDate, 'DATE_ONLY');

  // 오늘이 아니면 빈 배열 반환
  if (selectedDateStr !== today) return [];

  // 현재 시간 이전의 시간들만 필터링
  const currentTime = formatDate(new Date(), 'TIME');
  const currentMinutes = timeToMinutes(currentTime);
  return allTimes.filter((time) => timeToMinutes(time) < currentMinutes);
}
