import dayjs from '@shared/lib/dayjs.config';

import type { DateInput } from '@shared/lib/date.ts';

import type { ConfirmationCardType } from './type';

/**
 * 타입별 날짜 포맷팅 함수
 *
 * 예약 완료 타입(reservation)의 경우, 날짜와 시간을 포함하고,
 * 신청 완료 타입(application)의 경우, 날짜만 포함하며 선정 결과 발표 문구를 추가합니다.
 *
 * @param date - 포맷팅할 날짜 (DateInput 타입)
 * @param type - 카드 타입 ('reservation' | 'application')
 * @returns 포맷팅된 날짜 텍스트와 결과 텍스트를 포함한 객체
 */
export function formatDateForConfirmationCard(date: DateInput, type: ConfirmationCardType) {
  const dayjsDate = dayjs(date);

  if (!dayjsDate.isValid()) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Invalid date:', date);
    }
    return {
      dateText: '날짜 오류',
      resultText: type === 'application' ? '에 선정 결과가 발표돼요' : null,
    };
  }

  if (type === 'reservation') {
    const dateStr = dayjsDate.format('M월 D일');
    const weekday = dayjsDate.format('dddd');
    const timeStr = dayjsDate.format('A h:mm');

    return {
      dateText: `${dateStr} ${weekday} ${timeStr}`,
      resultText: null,
    };
  } else {
    const dateStr = dayjsDate.format('M월 D일');
    const weekday = dayjsDate.format('dddd');

    return {
      dateText: `${dateStr} ${weekday}`,
      resultText: '에 선정 결과가 발표돼요',
    };
  }
}
