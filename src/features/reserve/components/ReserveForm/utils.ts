import { formatDate, type DateInput } from '@shared/lib/date';

const DEFAULT_MIN_COUNT = 1;
/**
 * 시간 문자열을 분 단위로 변환
 * @param time "HH:mm" 형식의 시간 문자열
 */
function timeToMinutes(time: string): number {
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
export function formatDateRange(startDate: string, endDate: string): string {
  const start = formatDate(startDate, 'MMDD_LONG');
  const end = formatDate(endDate, 'MMDD_LONG');
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
 * campaignId 유효성 검증
 * @param paramCampaignId URL 파라미터로 받은 campaignId
 * @param storeCampaignId 스토어에 저장된 campaignId
 * @returns 유효성 여부
 *
 * 로직:
 * - paramCampaignId와 storeCampaignId가 모두 존재하고 일치해야 함
 * - 예약 버튼 클릭 시 스토어에 campaignId가 저장되므로,
 *   정상적인 접근이라면 항상 둘 다 존재하고 일치해야 함
 */
export function validateCampaignId(
  paramCampaignId: string,
  storeCampaignId: string | undefined,
): boolean {
  return !!paramCampaignId && !!storeCampaignId && paramCampaignId === storeCampaignId;
}
