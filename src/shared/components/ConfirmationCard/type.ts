import type { DateInput } from '@shared/lib/date';

/**
 * ConfirmationCard 컴포넌트의 타입 정의
 *
 * 'reservation' (예약 완료) 또는 'application' (신청 완료) 중 하나를 선택할 수 있습니다.
 */
export type TConfirmationCardType = 'reservation' | 'application';

/**
 * TConfirmationCardProps 컴포넌트의 Props 타입 정의
 *
 * @param date - 포맷팅할 날짜 (DateInput 타입)
 * @param type - 카드 타입 ('reservation' | 'application')
 */
export interface ConfirmationCardProps {
  date: DateInput;
  type: TConfirmationCardType;
}
