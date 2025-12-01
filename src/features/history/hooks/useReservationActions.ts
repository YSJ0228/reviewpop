/**
 * 예약 관련 액션을 처리하는 훅
 * - 예약 날짜 변경
 * - 예약 취소
 */
export function useReservationActions(campaignId: string) {
  //   const router = useRouter();

  const handleChangeDate = () => {
    // TODO: 예약 날짜 변경 페이지로 리다이렉트 기능 구현
    // router.push(`/campaign/${campaignId}/reserve`);
    console.log('예약 날짜 변경', campaignId);
  };

  const handleCancelReservation = async () => {
    // TODO: 예약 취소 기능 구현
    // - 확인 모달 표시
    // - API 호출
    // - 성공 시 토스트 메시지 및 상태 업데이트
    console.log('예약 취소', campaignId);
  };

  return {
    handleChangeDate,
    handleCancelReservation,
  };
}
