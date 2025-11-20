import { CampaignStatus } from '@entities/campaign/types/campaign.types';
import { IconArrowRight } from '@pop-ui/foundation';

import styles from './style.module.scss';

export function CampaignTab({ status }: { status: CampaignStatus }) {
  return (
    <button className={styles.CampaignTab} data-status={status}>
      <IconArrowRight />
      <span>지금 모집중인 체험</span>
    </button>
  );
}
