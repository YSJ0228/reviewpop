import { STATUS_VISIT } from './constants';

/**
 * 방문 상태 타입
 * - before: 방문 전
 * - scheduled: 방문 예정
 */
export type VisitStatus = keyof typeof STATUS_VISIT;

/**
 * 바텀시트에 필요한 Campaign 데이터 타입
 */
export interface CampaignBottomSheetData {
  /** 제공 상품 */
  providedItem: string;
  /** 체험 설명 */
  description: string;
  /** 리뷰 미션 목록 */
  reviewMission: string[];
  /** 리뷰 미션 주의사항 */
  reviewMissionNotice: string;
}
