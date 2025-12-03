/**
 * 방문 전 상태 카드 컴포넌트 타입
 * @param onReservationClick - 예약 설정 버튼 클릭 핸들러
 */
export interface ReservationBeforeCardProps {
  onReservationClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
