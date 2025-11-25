/**
 * 미선정 체험 카드 컴포넌트 타입
 * @param recruitmentSchedule - 모집 일정
 * @param maxRecruitment - 최대 선정 인원
 */
export interface CampaignRejectedCardProps {
  recruitmentSchedule?: [string, string];
  maxRecruitment?: number;
}
