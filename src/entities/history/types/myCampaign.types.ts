// import { Campaign } from '@entities/campaign/types/campaign.types';

// export type MyCampaignInfo = Pick<Campaign, 'id' | 'brand' | 'thumbnail' | 'providedItem'>;

// export type MyCampaignStatus = 'applied' | 'selected' | 'registered' | 'completed' | 'rejected'; // 신청, 선정, 후기, 종료, 미선정

// export type MyCampaignScheduleStatus = 'before' | 'scheduled'; // 방문 전, 방문 예정,

// export type MyCampaignReviewStatus =
//   | 'visited' // 체험 완료
//   | 'notReviewed' // 후기 미등록
//   | 'reviewed' // 후기 등록 완료
//   | 'reviewPending' // 후기 검토 중
//   | 'requiredForEditing'; // 후기 수정 요청

// export interface MyCampaign extends MyCampaignInfo {
//   status: MyCampaignStatus; // 체험 신청 상태
//   applicationDate?: string; // 신청일
//   announcementDate?: string; // 선정 발표일
//   deadline?: string; // 체험 예약 마감일
//   recruitmentSchedule?: [string, string]; // 모집 기간 (시작일, 종료일)
//   maxRecruitment?: number; // 선정하는 인원
//   appliedAt?: [string, string]; // 체험 예약일과 시간
//   visitStatus?: MyCampaignScheduleStatus; // 방문 상태
//   reviewStatus?: MyCampaignReviewStatus; // 후기 상태
//   visitPeriod?: [string, string]; // 방문 마감 기간
// }

// export const TAB_CONFIG = [
//   { key: 'applied' as const, label: '신청' },
//   { key: 'selected' as const, label: '선정' },
//   { key: 'registered' as const, label: '후기' },
//   { key: 'completed' as const, label: '종료' },
// ] as const;

// export type TabKey = (typeof TAB_CONFIG)[number]['key'];

// // 접근성을 위한 레이블 헬퍼
// export const STATUS_LABELS: Record<MyCampaignStatus, string> = {
//   applied: '신청',
//   selected: '선정',
//   registered: '후기',
//   completed: '종료',
//   rejected: '미선정',
// };

export const STATUS_VISIT = {
  before: '방문 전',
  scheduled: '방문 예정',
} as const;

// /**
//  * MyCampaignStatus → EmptyState variant 매핑
//  * rejected는 제외 (EmptyState 미표시)
//  */
// export const STATUS_EMPTY_MAP: Record<
//   Exclude<MyCampaignStatus, 'rejected'>,
//   'no-applied' | 'no-selected' | 'no-registered' | 'no-completed'
// > = {
//   applied: 'no-applied',
//   selected: 'no-selected',
//   registered: 'no-registered',
//   completed: 'no-completed',
// } as const;

// export const STATUS_REVIEW: Record<MyCampaignReviewStatus, string> = {
//   visited: '체험 완료',
//   notReviewed: '후기 미등록',
//   reviewed: '체험 종료',
//   reviewPending: '후기 등록 완료',
//   requiredForEditing: '후기 등록 완료',
// };

// export const STATUS_REVIEW_TITLES: Record<MyCampaignReviewStatus, string> = {
//   visited: '체험 후기를 남겨주세요',
//   notReviewed: '체험 후기를 남겨주세요',
//   reviewed: '후기 등록이 완료됐어요',
//   reviewPending: '작성한 후기를 검토중이에요',
//   requiredForEditing: '후기 수정 요청이 있어요',
// };

// export interface MyCampaignReservationInfo extends MyCampaign {
//   location: string; // 방문 장소
//   reservationDate: string; // 예약 날짜
//   reservationTime: string; // 예약 시간
//   visitors: number; // 방문 인원
//   bookerInfo: {
//     name: string; // 예약자 이름
//     contact: string; // 예약자 연락처
//   };
// }

// export interface MyCampaignReviewInfo extends MyCampaign {
//   description: string; // 캠페인 상세 설명
//   reviewMission: string[]; // 리뷰 미션 목록
// }

// export interface MyCampaignReviewModification extends MyCampaign {
//   modificationImage?: string; // 수정 관련 이미지
//   modificationRequests: string[]; // 후기 수정 사유 목록
//   precautions: string[]; // 후기 작성 유의 사항
// }

import { Application } from '@entities/application/types/application.types';

/**
 * MyCampaignList 내 체험 정보
 * date - 체험
 */
// export interface MyCampaign extends Application {
//   date?: string;
//   reservationDate?: string;
// }

export interface MyCampaignList {
  applications: Application[];
}
