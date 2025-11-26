export const HISTORY_MESSAGES = {
  // 신청탭에서 활용되는 메시지
  CANCEL_APPLICATION: '신청취소',
  REJECTED_HISTORY: '미선정 체험 내역',

  // 미선정탭에서 활용되는 메시지
  RECRUITMENT: '모집',
  SELECTED_COUNT: '명 선정',

  // 선정탭에서 활용되는 메시지
  SELECTED: '체험단에 선정되었어요🎉',
  SET_VISIT_DATE: '체험 방문할 날짜를 설정해주세요.',
  RESERVATION_WARNING: '방문 가능 기간 내 예약을 안하면 선정이 취소돼요',
  REVIEW_MISSION: '체험 정보 및 후기 미션',

  // 에러 관련 메시지
  LOAD_FAILED: '데이터를 불러오는데 실패했습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  NO_REJECTED_CAMPAIGNS: '미선정 캠페인이 없습니다.',
} as const;

/** 나의 체험에서 사용되는 매직넘버 관련 상수 */
export const HISTORY_UI = {
  /** 버튼 border radius */
  BUTTON_RADIUS_MEDIUM: 8,
  /** 바텀시트 높이 */
  BOTTOM_SHEET_HEIGHT: 560,
  /** 경고 아이콘 크기 */
  WARNING_ICON_SIZE: 12,
} as const;
