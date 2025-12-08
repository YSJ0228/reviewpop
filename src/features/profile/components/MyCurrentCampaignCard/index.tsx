import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconChevronRight } from '@pop-ui/foundation';

import { formatDate } from '@shared/lib/date';

import { MyCampaignState } from '../MyCampaignState';

import { MyCurrentCampaignCardProps } from './types';

import styles from './style.module.scss';

export function MyCurrentCampaignCard({ userCampaign }: MyCurrentCampaignCardProps) {
  const { campaign, status, date } = userCampaign;
  const router = useRouter();
  const handleClick = () => {
    if (status === 'plan') {
      router.push(`/campaign/${campaign.id}`);
    } else if (status === 'reservation') {
      router.push(`campaign/${campaign.id}/reserve`);
    } else {
      router.push(
        `campaign/${campaign.id}/review/write?applicationId=${userCampaign.applicationId}`,
      );
    }
  };
  return (
    <div className={styles.MyCurrentCampaignCard} onClick={handleClick}>
      <div className={styles.MyCurrentCampaignCard__BrandInfo}>
        <Image
          src={campaign.thumbnail}
          width={60}
          height={60}
          alt="체험 썸네일"
          style={{ borderRadius: 8 }}
        />
        <div className={styles.MyCurrentCampaignCard__Text}>
          <span className={styles.MyCurrentCampaignCard__Brand}>{campaign.brand}</span>
          <span className={styles.MyCurrentCampaignCard__Items}>{campaign.providedItem}</span>
        </div>
      </div>
      <div className={styles.MyCurrentCampaignCard__Line}></div>
      <div className={styles.MyCurrentCampaignCard__State}>
        <MyCampaignState type={status} />
        {status === 'plan' ? (
          <span className={styles.MyCurrentCampaignCard__Date}>
            {date && formatDate(date, 'FULL_SHORT')}
          </span>
        ) : (
          <IconChevronRight color="var(--gray-400)" size={16} />
        )}
      </div>
    </div>
  );
}
