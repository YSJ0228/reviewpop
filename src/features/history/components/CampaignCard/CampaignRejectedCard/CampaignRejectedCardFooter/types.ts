/**
 * 미선정 체험 카드 하단 컴포넌트 타입
 * @param recruitmentSchedule - 모집 일정
 * @param maxRecruitment - 최대 선정 인원
 */
export interface CampaignRejectedCardFooterProps {
  recruitmentSchedule?: [string, string];
  maxRecruitment?: number;
}
