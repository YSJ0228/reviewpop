'use client';

import type { CampaignDetail } from '@entities/campaign/types/campaign.types';

import styles from './style.module.scss';

export interface CampaignRequirementsSectionProps {
  campaign: CampaignDetail;
}

/**
 * 체험 당첨 조건 섹션 컴포넌트
 * - 당첨 조건 목록을 불릿 포인트로 표시
 */
export function CampaignRequirementsSection({ campaign }: CampaignRequirementsSectionProps) {
  const { requirements } = campaign;

  // requirements가 없거나 빈 배열인 경우 렌더링하지 않음
  if (!requirements || requirements.length === 0) {
    return null;
  }

  return (
    <div className={styles.CampaignRequirementsSection}>
      <h2 className={styles.Title}>당첨 조건</h2>
      <ul className={styles.RequirementsList}>
        {requirements.map((requirement, index) => (
          <li key={index} className={styles.RequirementItem}>
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
}
