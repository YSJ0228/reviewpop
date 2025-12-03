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
 * 예: startTime="09:00", endTime="12:00", intervalMinutes=30
 * 결과: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
 * (12:00은 포함되지 않음)
 */
export function generateTimeSlots(options: TimeRangeOptions): string[] {
  const { startTime, endTime, intervalMinutes } = options;

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const times: string[] = [];

  // endTime은 제외 (< 사용)
  for (let current = startMinutes; current < endMinutes; current += intervalMinutes || 30) {
    times.push(minutesToTime(current));
  }

  return times;
}
