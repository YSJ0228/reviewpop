'use client';

import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignContentsProps {
  campaign: CampaignDetail;
}

/**
 * 체험 구성 내용 컴포넌트
 * - 제공 내역 (providedItems) - 제목으로 표시
 * - 체험 설명
 */
export function CampaignContents({ campaign }: CampaignContentsProps) {
  const hasProvidedItems = campaign.providedItems.trim();
  const hasDescription = campaign.description.trim();

  // 표시할 내용이 없으면 아무것도 렌더링하지 않음
  if (!hasProvidedItems && !hasDescription) {
    return null;
  }

  return (
    <section className={styles.CampaignContents}>
      {hasProvidedItems && <h2 className={styles.Title}>{campaign.providedItems}</h2>}

      {hasDescription && (
        <div className={styles.Description}>
          <p>{campaign.description}</p>
        </div>
      )}
    </section>
  );
}
