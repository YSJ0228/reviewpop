import type { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { ReactNode } from 'react';

/**
 * CampaignCardWrapper 컴포넌트 타입
 * @param campaign - 캠페인 정보
 * @param statusLabel - 상태 라벨
 * @param topContent - 상단 컨텐츠
 * @param bottomContent - 하단 컨텐츠
 * @param isSelected - 선택 여부
 */
export interface CampaignCardWrapperProps {
  campaign: CampaignDetail;
  statusLabel?: ReactNode;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  isSelected?: boolean;
}
