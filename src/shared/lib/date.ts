/**
 * 날짜 처리 유틸리티
 *
 * dayjs를 활용한 타입 안전한 날짜 포맷팅 및 변환 함수들을 제공합니다.
 */

import { type Dayjs } from 'dayjs';

import dayjs from './dayjs.config';
/**
 * 날짜 포맷 상수
 *
 * 용도별로 다른 포맷을 사용합니다:
 * - SHORT: 카드, 리스트 등 간결한 표시
 * - LONG: 상세 페이지, 프로필 등 명확한 표시
 * - DATETIME: 시간까지 포함된 짧은 표기
 * - FULL_DATETIME: 시간까지 포함된 긴 표기
 * - ISO: API 통신용 ISO 8601 표준 형식
 * - MMDD_SHORT: MM.DD
 * - MMDD_LONG: M월 D일
 * - MMDD_DDD_SHORT: MM.DD(월)
 * - MMDD_DDD_LONG: M월 D일 (월)
 * - MMDD_DDDD_SHORT: MM.DD 월요일
 * - MMDD_DDDD_LONG: M월 D일 월요일
 * - TIME: 시간
 * - TIME_WITH_AMPM: 시간 (오전/오후)
 */
export const DATE_FORMATS = {
  SHORT: 'YYYY.MM.DD',
  LONG: 'YYYY년 M월 D일',
  DATETIME: 'YYYY.MM.DD HH:mm',
  FULL_DATETIME: 'YYYY년 M월 D일 HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ssZ',
  MMDD_SHORT: 'MM.DD',
  MMDD_LONG: 'M월 D일',
  MMDD_DDD_SHORT: 'MM.DD(ddd)',
  MMDD_DDD_LONG: 'M월 D일 (ddd)',
  MMDD_DDDD_SHORT: 'MM.DD dddd',
  MMDD_DDDD_LONG: 'M월 D일 dddd',
  TIME: 'HH:mm',
  TIME_WITH_AMPM: 'A h:mm',
} as const;

/**
 * DateInput 타입: 날짜를 나타낼 수 있는 모든 타입
 */
export type DateInput = string | number | Date | Dayjs;

/**
 * 날짜 포맷팅
 *
 * @param date - 변환할 날짜
 * @param format - 포맷 키 (기본값: 'SHORT')
 * @returns 포맷된 날짜 문자열
 *
 * @example
 * formatDate('2024-11-04') // '2024.11.04'
 * formatDate('2024-11-04', 'LONG') // '2024년 11월 4일'
 * formatDate(new Date(), 'DATETIME') // '2024.11.04 14:30'
 */
export function formatDate(date: DateInput, format: keyof typeof DATE_FORMATS = 'SHORT'): string {
  return dayjs(date).format(DATE_FORMATS[format]);
}

/**
 * ISO 8601 형식 문자열로 변환
 *
 * @param date - 변환할 날짜 (기본값: 현재 시간)
 * @returns ISO 8601 형식 문자열
 *
 * @example
 * toISO() // '2024-11-04T14:30:00+09:00'
 * toISO('2024-11-04') // '2024-11-04T00:00:00+09:00'
 */
export function toISO(date?: DateInput): string {
  return date ? dayjs(date).toISOString() : dayjs().toISOString();
}

/**
 * Unix timestamp (밀리초)로 변환
 *
 * @param date - 변환할 날짜 (기본값: 현재 시간)
 * @returns Unix timestamp (밀리초)
 *
 * @example
 * toUnix() // 1699084800000
 * toUnix('2024-11-04') // 1699084800000
 */
export function toUnix(date?: DateInput): number {
  return date ? dayjs(date).valueOf() : dayjs().valueOf();
}

/**
 * Unix timestamp (초)에서 dayjs 객체로 변환
 *
 * @param timestamp - Unix timestamp (초 단위)
 * @returns dayjs 객체
 *
 * @example
 * fromUnix(1699084800) // dayjs 객체
 */
export function fromUnix(timestamp: number): Dayjs {
  return dayjs.unix(timestamp);
}

/**
 * 현재 시간을 dayjs 객체로 반환
 *
 * @returns 현재 시간의 dayjs 객체
 *
 * @example
 * now() // dayjs 객체
 */
export function now(): Dayjs {
  return dayjs();
}

/**
 * 상대 시간 표시 (fromNow)
 *
 * @param date - 기준 날짜
 * @returns 상대 시간 문자열 (예: "3일 전", "2시간 후")
 *
 * @example
 * fromNow('2024-11-01') // '3일 전'
 * fromNow('2024-11-10') // '6일 후'
 */
export function fromNow(date: DateInput): string {
  return dayjs(date).fromNow();
}

/**
 * 두 날짜 사이의 차이 계산
 *
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @param unit - 단위 (기본값: 'day')
 * @returns 차이값
 *
 * @example
 * diff('2024-11-04', '2024-11-01') // 3
 * diff('2024-11-04', '2024-11-01', 'hour') // 72
 */
export function diff(
  date1: DateInput,
  date2: DateInput,
  unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' = 'day',
): number {
  return dayjs(date1).diff(dayjs(date2), unit);
}

/**
 * UTC 문자열로 변환 (쿠키 만료 시간 등에 사용)
 *
 * @param date - 변환할 날짜
 * @returns UTC 문자열
 *
 * @example
 * toUTCString('2024-11-04') // 'Mon, 04 Nov 2024 00:00:00 GMT'
 */
export function toUTCString(date: DateInput): string {
  return dayjs(date).toDate().toUTCString();
}
