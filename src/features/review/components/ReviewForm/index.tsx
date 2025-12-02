import { Button } from '@shared/components';
import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { Application } from '@entities/application/types/application.types';
import { formatDate } from '@shared/lib/date';
import { CampaignInfoList } from '@shared/components';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';
import { ReviewFormLink } from './ReviewFormLink';
import styles from './style.module.scss';

interface ReviewFormProps {
  campaign: CampaignDetail;
  application: Application;
}

export function ReviewForm({ campaign, application }: ReviewFormProps) {
  const reviewLinkInput = useInputValidate('blogUrl');

  const visitDate = application.reservationDate
    ? formatDate(application.reservationDate, 'MMDD_DDDD_LONG_WITH_TIME')
    : '';

  return (
    <div className={styles.ReviewForm}>
      <div className={styles.ReviewForm__Content}>
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

        <ReviewFormLink input={reviewLinkInput} />
      </div>
      <Button onClick={() => {}} disabled={Boolean(reviewLinkInput.errorMsg)}>
        후기 등록
      </Button>
    </div>
  );
}
