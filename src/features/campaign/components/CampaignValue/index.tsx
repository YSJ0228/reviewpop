'use client';

import Image from 'next/image';

import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignValueProps {
  campaign: CampaignDetail;
}

/**
 * 체험 상품 가치 표시 컴포넌트
 * - 예상 가치(estimatedValue)를 표시
 * - 금색 돈가방 아이콘과 함께 표시
 */
export function CampaignValue({ campaign }: CampaignValueProps) {
  if (!campaign.estimatedValue) return null;

  const formattedValue = campaign.estimatedValue.toLocaleString('ko-KR');

  return (
    <div className={styles.CampaignValue}>
      <div className={styles.Icon}>
        <Image src="/images/icons/sack-dollar.svg" alt="돈가방 아이콘" width={24} height={24} />
      </div>
      <span className={styles.Text}>약 {formattedValue}원 상당의 가치</span>
    </div>
  );
}
