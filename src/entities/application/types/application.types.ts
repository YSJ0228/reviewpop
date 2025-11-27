/**
 * Application (체험 신청) 엔티티 타입 정의
 */

/**
 * 신청 상태
 * - pending: 대기 중 (선정 결과 발표 전)
 * - selected: 선정됨
 * - rejected: 거절됨
 * - completed: 체험 완료
 * - cancelled: 체험이 사라짐
 */
export type ApplicationStatus = 'pending' | 'selected' | 'rejected' | 'completed' | 'cancelled';

/**
 * 리뷰 상태
 * before  후기 작성 전
 * pending  후기 검토 중
 * requested  수정 요청
 */
export type ReviewStatus =
  | 'before' // 후기 작성 전
  | 'pending' // 후기 검토 중
  | 'requested'; // 수정 요청

/**
 * 체험 신청 데이터
 */

// TODO: 이건 post인지 get인지?
export interface Application {
  campaignId: string;
  userId: string;
  blogAddress: string;
  name: string;
  phoneNumber: string;
  message?: string;
  status: ApplicationStatus;
  reviewStatus: ReviewStatus;
  isReservated: boolean;
  createdAt: string;
  updatedAt: string;
}

/** 유저가 한 예약 */
export interface Reservation {
  campaignId: string;
  date: string;
  personCount: number;
  isVisited: boolean;
}
