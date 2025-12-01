import type { ApplicationStatus } from '@entities/application';

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

  // 선정탭에서 활용되는 메시지
  VISITED: '방문',

  // 에러 관련 메시지
  LOAD_FAILED: '데이터를 불러오는데 실패했습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  NO_REJECTED_CAMPAIGNS: '미선정 캠페인이 없습니다.',

  // 바텀시트에서 활용되는 메시지
  VIEW_CAMPAIGN_DETAIL: '체험 상세 보기',
  CHANGE_RESERVATION_DATE: '예약 날짜 변경',
  CANCEL_RESERVATION: '예약 취소',
  CANCEL_RESERVATION_TODAY_NOT_ALLOWED:
    '예약 당일에는 날짜 변경이 불가능하며, 취소 후 예약 가능한 날짜에 다시 예약만 가능합니다.',
} as const;

/** 나의 체험에서 사용되는 매직넘버 관련 상수 */
export const HISTORY_UI = {
  /** 버튼 border radius */
  BUTTON_RADIUS_MEDIUM: 8,
  /** 바텀시트 높이 */
  BOTTOM_SHEET_HEIGHT: 560,
  /** 경고 아이콘 크기 */
  WARNING_ICON_SIZE: 12,
  /** 예약 관리 메뉴 높이 */
  RESERVATION_MENU_HEIGHT: 148,
  /** 예약 관리 메뉴 경고 메시지 높이 */
  RESERVATION_MENU_TODAY: 156,
} as const;

export const TAB_CONFIG = [
  { key: 'pending' as const, label: '신청' },
  { key: 'selected' as const, label: '선정' },
  { key: 'reviewed' as const, label: '후기' },
  { key: 'completed' as const, label: '종료' },
] as const;

export type TabKey = (typeof TAB_CONFIG)[number]['key'];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: '신청',
  selected: '선정',
  rejected: '미선정',
  reviewed: '후기',
  completed: '종료',
  cancelled: '취소',
};

export const CARD_TYPES = {
  PENDING: 'pending',
  SELECTED: 'selected',
  REJECTED: 'rejected',
  REVIEWED: 'reviewed',
  COMPLETED: 'completed',
} as const;

export type TCardType = (typeof CARD_TYPES)[keyof typeof CARD_TYPES];

export const STATUS_EMPTY_MAP: Record<
  Exclude<ApplicationStatus, 'rejected' | 'cancelled'>,
  'no-applied' | 'no-selected' | 'no-registered' | 'no-completed'
> = {
  pending: 'no-applied',
  selected: 'no-selected',
  reviewed: 'no-registered',
  completed: 'no-completed',
} as const;

export const STATUS_VISIT = {
  before: '방문 전',
  scheduled: '방문 예정',
} as const;

export type VisitStatus = keyof typeof STATUS_VISIT;

export const STATUS_REVIEW = {
  visited: '체험 후기를 남겨주세요',
  notReviewed: '체험 후기를 남겨주세요',
  reviewed: '후기 등록이 완료됐어요',
  reviewPending: '작성한 후기를 검토중이에요',
  requiredForEditing: '후기 수정 요청이 있어요',
} as const;

export const STATUS_REVIEW_TITLES = {
  visited: '체험 완료',
  notReviewed: '방문 완료',
  reviewed: '체험 종료',
  reviewPending: '후기 등록 완료',
  requiredForEditing: '후기 등록 완료',
} as const;
