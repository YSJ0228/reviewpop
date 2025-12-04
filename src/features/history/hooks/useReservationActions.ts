import { useDeleteReservation } from '@entities/reservation';

/**
 * 예약 관련 액션을 처리하는 훅
 * - 예약 날짜 변경
 * - 예약 취소
 */
export function useReservationActions(campaignId: string, reservationId?: string) {
  //   const router = useRouter();
  const { mutateAsync: deleteReservation } = useDeleteReservation(campaignId, reservationId);

  const handleChangeDate = () => {
    // TODO: 예약 날짜 변경 페이지로 리다이렉트 기능 구현
    // router.push(`/campaign/${campaignId}/reserve`);
    console.log('예약 날짜 변경', campaignId);
  };

  const handleCancelReservation = async () => {
    try {
      await deleteReservation();
    } catch (error) {
      // useDeleteReservation의 onError에서 이미 토스트를 표시하므로
      // 여기서는 추가 로깅만 수행하여 Unhandled Promise Rejection 방지
      console.error('예약 취소 실패 (컴포넌트 내부):', error);
    }
  };

  return {
    handleChangeDate,
    handleCancelReservation,
  };
}
