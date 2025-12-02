import { Button } from '@shared/components';
import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { Application } from '@entities/application/types/application.types';
import { formatDate } from '@shared/lib/date';
import { CampaignInfoList } from '@shared/components';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';
import { ReviewFormLink } from './ReviewFormLink';
import styles from './style.module.scss';
import { useCreateReview } from '@features/review/hooks/useReview';

interface ReviewFormProps {
  campaign: CampaignDetail;
  application: Application;
}

export function ReviewForm({ campaign, application }: ReviewFormProps) {
  const { mutate: createReview, isPending } = useCreateReview(campaign.id, application.userId);
  const reviewLinkInput = useInputValidate('blogUrl');

  const visitDate = application.reservationDate
    ? formatDate(application.reservationDate, 'MMDD_DDDD_LONG_WITH_TIME')
    : '';

  const handleSubmit = () => {
    if (!reviewLinkInput.value || reviewLinkInput.errorMsg) return;

    createReview({
      campaignId: campaign.id,
      userId: application.userId,
      reviewUrl: reviewLinkInput.value,
    });
  };

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
      <Button
        onClick={handleSubmit}
        disabled={Boolean(reviewLinkInput.errorMsg) || !reviewLinkInput.value || isPending}
      >
        {isPending ? '등록 중...' : '후기 등록'}
      </Button>
    </div>
  );
}
