import { Button } from '@pop-ui/core';
import { IconWarningCircle } from '@pop-ui/foundation';

import { Colors } from '@shared/styles/colors';
import { HISTORY_MESSAGES } from '@features/history/constants';
import type { CampaignSelectedCardProps } from './types';

import styles from './style.module.scss';
import { BottomSheet } from '@shared/components/BottomSheet';

import { useDisclosure } from '@mantine/hooks';
import { useCampaignBottomSheetData } from '@features/history/hooks/useCampaignBottomSheetData';

/**
 * 선정된 체험 카드의 액션 영역 컴포넌트
 * @param visitStatus - 방문 상태 (before: 방문 전, scheduled: 방문 예정)
 */
export function CampaignSelectedCard({ campaign, visitStatus }: CampaignSelectedCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const bottomSheetData = useCampaignBottomSheetData(campaign.id);

  // TODO: 방문 날짜 설정 버튼 클릭 핸들러
  const handleReservationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  // TODO: 리뷰 미션 버튼 클릭 핸들러
  const handleReviewMissionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  // 방문 전 상태: 예약 날짜 설정 버튼 + 경고 메시지
  if (visitStatus === 'before') {
    return (
      <footer className={styles.CampaignSelectedCard__ContentWrapper}>
        <Button variant="primary" fullWidth radius={8} onClick={handleReservationClick}>
          <span className={styles.CampaignSelectedCard__PrimaryText}>
            {HISTORY_MESSAGES.SET_VISIT_DATE}
          </span>
        </Button>
        <div className={styles.CampaignSelectedCard__WarningWrapper}>
          <IconWarningCircle color={Colors.COLOR_GRAY_400} size={12} />
          <span className={styles.CampaignSelectedCard__WarningText}>
            {HISTORY_MESSAGES.RESERVATION_WARNING}
          </span>
        </div>
      </footer>
    );
  }

  // 방문 예정 상태: 리뷰 미션 버튼
  if (visitStatus === 'scheduled') {
    return (
      <>
        <Button variant="basic" fullWidth radius={8} onClick={handleReviewMissionClick}>
          <span className={styles.CampaignSelectedCard__BasicText}>
            {HISTORY_MESSAGES.REVIEW_MISSION}
          </span>
        </Button>
        <BottomSheet opened={opened} onClose={close} height={512}>
          <div className={styles.CampaignSelectedCard__BottomSheetContent}>
            <section
              aria-label="제공 혜택 내용"
              className={styles['CampaignSelectedCard__BottomSheetContent--Section']}
            >
              <h3>제공 혜택</h3>
              <p className={styles.CampaignSelectedCard__SectionItem}>
                {bottomSheetData?.providedItems}
              </p>
              <p className={styles.CampaignSelectedCard__Description}>
                {bottomSheetData?.description}
              </p>
            </section>
            <section
              aria-label="후기 미션 내용"
              className={styles.CampaignSelectedCard__BottomSheetContent__Section}
            >
              <h3>후기 미션</h3>
              <ul>
                {bottomSheetData?.reviewMission.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>
              <p>{bottomSheetData?.reviewMissionNotice}</p>
            </section>
          </div>
        </BottomSheet>
      </>
    );
  }

  return null;
}
