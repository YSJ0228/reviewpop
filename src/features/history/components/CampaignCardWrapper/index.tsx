import Link from 'next/link';

import { SharedCampaignCard } from '@shared/components';
import { ROUTES } from '@shared/config/routes';

import type { CampaignCardWrapperProps } from './types';

import styles from './style.module.scss';

/**
 * CampaignCard의 공통 래퍼 컴포넌트
 * Link + SharedCampaignCard를 래핑하는 공통 로직을 제공합니다.
 * @param campaign - 캠페인 정보
 * @param statusLabel - 상태 라벨 컴포넌트
 * @param topContent - 상단 컨텐츠
 * @param bottomContent - 하단 컨텐츠
 * @param isSelected - 선택 여부
 */
export function CampaignCardWrapper({
  campaign,
  statusLabel,
  topContent,
  bottomContent,
  isSelected = false,
}: CampaignCardWrapperProps) {
  return (
    <Link
      href={ROUTES.CAMPAIGN_DETAIL(campaign.id)}
      className={`${styles.CampaignCardWrapper__Link} ${isSelected ? styles['CampaignCardWrapper__Link--NoBorder'] : ''}`}
    >
      <SharedCampaignCard
        thumbnail={campaign.thumbnail}
        brand={campaign.brand}
        title={campaign.providedItem}
        className={styles.CampaignCardWrapper}
        statusLabel={statusLabel}
        topContent={topContent}
        bottomContent={bottomContent}
      />
    </Link>
  );
}
