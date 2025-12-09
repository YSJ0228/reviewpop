import { useRouter } from 'next/navigation';

import { toast } from '@shared/components';
import { useDeleteReservation, getReservation } from '@entities/reservation';
import { useReservationStore } from '@features/reserve/store/reservationStore';

/**
 * 예약 관련 액션을 처리하는 훅
 * - 예약 날짜 변경
 * - 예약 취소
 */
export function useReservationActions(campaignId: string, reservationId?: string) {
  const router = useRouter();
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const { mutateAsync: deleteReservation } = useDeleteReservation(campaignId, reservationId);

  const handleChangeDate = async () => {
    if (!reservationId) return;

    try {
      const reservation = await getReservation(reservationId);
      setReservationData({
        campaignId: reservation.campaignId,
        applicationId: reservation.applicationId,
        personCount: reservation.personCount,
        date: reservation.date,
        reservationId: reservation.id,
      });
      router.push(`/campaign/${campaignId}/reserve`);
    } catch (error) {
      toast.error('예약 정보 조회 실패');
      console.error('예약 정보 조회 실패:', error);
    }
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
