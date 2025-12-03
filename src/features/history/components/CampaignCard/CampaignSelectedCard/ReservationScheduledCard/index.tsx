import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

import { BottomSheet } from '@shared/components/BottomSheet';
import { Button } from '@shared/components';
import { HISTORY_MESSAGES, HISTORY_UI } from '@features/history/constants';
import { getCampaignBottomSheetData } from '@features/history/hooks/useCampaignBottomSheetData';

import { ProviderBenefitSection } from './ProviderBenefitSection';
import { ReviewMissionSection } from './ReviewMissionSection';

import styles from './style.module.scss';
import { ReservationScheduledCardProps } from './types';

/**
 * 방문 예정 상태 카드 컴포넌트 (scheduled 상태일 때 버튼 표시)
 * @param campaign - 캠페인 정보
 */
export function ReservationScheduledCard({ campaign }: ReservationScheduledCardProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const bottomSheetData = getCampaignBottomSheetData(campaign.id, true);
  const router = useRouter();

  const handleCampaignDetailClick = () => {
    router.push(`/campaign/${campaign.id}`);
  };

  // TODO: 리뷰 미션 버튼 클릭 핸들러
  const handleReviewMissionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  return (
    <>
      <Button
        variant="secondary"
        fullWidth
        radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
        onClick={handleReviewMissionClick}
      >
        <span className={styles.ReservationScheduledCard__BasicText}>
          {HISTORY_MESSAGES.REVIEW_MISSION}
        </span>
      </Button>
      {opened && (
        <BottomSheet
          opened={opened}
          onClose={close}
          height={HISTORY_UI.BOTTOM_SHEET_HEIGHT}
          footer={
            <Button variant="secondary" fullWidth onClick={handleCampaignDetailClick}>
              <span>{HISTORY_MESSAGES.VIEW_CAMPAIGN_DETAIL}</span>
            </Button>
          }
        >
          <div className={styles.ReservationScheduledCard__BottomSheetContent}>
            <ProviderBenefitSection
              providedItem={bottomSheetData?.providedItem}
              description={bottomSheetData?.description}
            />
            <ReviewMissionSection
              missions={bottomSheetData?.reviewMission || []}
              campaignId={campaign.id}
            />
          </div>
        </BottomSheet>
      )}
    </>
  );
}
