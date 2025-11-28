'use client';

import Image from 'next/image';

import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignInfoSectionProps {
  campaign: CampaignDetail;
}

/**
 * 체험 상세 정보 섹션 컴포넌트
 * - 위치 정보 (장소명, 주소)
 * - 체험 유형 (방문 체험)
 * - 후기 유형 (네이버 블로그)
 */
export function CampaignInfoSection({ campaign }: CampaignInfoSectionProps) {
  return (
    <div className={styles.CampaignInfoSection}>
      {/* 위치 정보 */}
      {campaign.address && (
        <div className={styles.InfoItem}>
          <div className={`${styles.Icon} ${styles.IconLocation}`}>
            <Image src="/images/icons/Location.svg" alt="위치 아이콘" width={24} height={24} />
          </div>
          <div className={styles.Content}>
            <div className={styles.Title}>{campaign.brand || '위치 정보'}</div>
            <div className={styles.Description}>{campaign.address}</div>
          </div>
        </div>
      )}

      {/* 체험 유형 */}
      <div className={styles.InfoItem}>
        <div className={`${styles.Icon} ${styles.IconShop}`}>
          <Image src="/images/icons/Shop.svg" alt="방문 체험 아이콘" width={24} height={24} />
        </div>
        <div className={styles.Content}>
          <div className={styles.Title}>방문 체험</div>
          <div className={styles.Description}>매장에 직접 방문하는 체험이에요</div>
        </div>
      </div>

      {/* 후기 유형 */}
      <div className={styles.InfoItem}>
        <div className={`${styles.Icon} ${styles.IconBlog}`}>
          <Image src="/images/BlogLogo.svg" alt="네이버 블로그 아이콘" width={24} height={24} />
        </div>
        <div className={styles.Content}>
          <div className={styles.Title}>후기 유형</div>
          <div className={styles.Description}>네이버 블로그</div>
        </div>
      </div>
    </div>
  );
}
