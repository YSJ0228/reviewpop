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
export interface ApplicationReservation {
  campaignId: string;
  date: string;
  personCount: number;
  isVisited: boolean;
}
/**
 * 신청 생성 요청 데이터
 */
// export interface CreateApplicationRequest {
//   /** 체험 ID */
//   campaignId: string;
//   /** 신청 메시지 */
//   message?: string;
//   /** SNS 계정 */
//   snsAccount?: string;
//   /** 신청 동기 */
//   motivation?: string;
// }

/**
 * 신청 상태별 레이블
 */
// export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
//   pending: '대기 중',
//   selected: '선정됨',
//   rejected: '거절됨',
//   completed: '체험 완료',
//   cancelled: '취소됨',
// };

// /**
//  * 신청 상태별 설명
//  */
// export const APPLICATION_STATUS_DESCRIPTIONS: Record<ApplicationStatus, string> = {
//   pending: '선정 결과를 기다리고 있습니다',
//   selected: '축하합니다! 체험단으로 선정되었습니다',
//   rejected: '아쉽게도 이번에는 선정되지 못했습니다',
//   completed: '체험 완료',
//   cancelled: '신청이 취소되었습니다',
// };
