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
  return (
    <section className={styles.CampaignContents}>
      {campaign.providedItems && <h2 className={styles.Title}>{campaign.providedItems}</h2>}

      {campaign.description && (
        <div className={styles.Description}>
          <p>{campaign.description}</p>
        </div>
      )}
    </section>
  );
}
