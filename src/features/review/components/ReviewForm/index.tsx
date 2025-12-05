import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { Application } from '@entities/application/types/application.types';
import { formatDate } from '@shared/lib/date';
import { CampaignInfoList } from '@shared/components';

import { ReviewFormLink } from './ReviewFormLink';

import styles from './style.module.scss';

interface ReviewFormProps {
  campaign: CampaignDetail;
  application: Application;
  reviewLinkInput: {
    value: string;
    setValue: (value: string) => void;
    errorMsg: string;
  };
  onValidationChange?: (isValid: boolean) => void;
}

export function ReviewForm({
  campaign,
  application,
  reviewLinkInput,
  onValidationChange,
}: ReviewFormProps) {
  const visitDate = application.reservationDate
    ? formatDate(application.reservationDate, 'MMDD_DDDD_LONG_WITH_TIME')
    : '';

  return (
    <div className={styles.ReviewForm}>
      <CampaignInfoList.Main>
        <CampaignInfoList.Header
          thumbnail={campaign.thumbnail}
          brand={campaign.brand}
          title={campaign.providedItem}
        />
        <CampaignInfoList.Item label="방문일" isLast>
          <p>{visitDate}</p>
        </CampaignInfoList.Item>
      </CampaignInfoList.Main>
      <ReviewFormLink input={reviewLinkInput} onValidationChange={onValidationChange} />
    </div>
  );
}
