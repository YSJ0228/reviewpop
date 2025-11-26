import { IconWarningCircle } from '@pop-ui/foundation';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

import { Colors } from '@shared/styles/colors';
import { BottomSheet } from '@shared/components/BottomSheet';
import { Button } from '@shared/components';
import { HISTORY_MESSAGES, HISTORY_UI } from '@features/history/constants';
import { getCampaignBottomSheetData } from '@features/history/hooks/useCampaignBottomSheetData';

import type { CampaignSelectedCardProps } from './types';

import styles from './style.module.scss';

/**
 * 선정된 체험 카드의 액션 영역 컴포넌트
 * @param visitStatus - 방문 상태 (before: 방문 전, scheduled: 방문 예정)
 */
export function CampaignSelectedCard({ campaign, visitStatus }: CampaignSelectedCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const bottomSheetData = getCampaignBottomSheetData(campaign.id, visitStatus === 'scheduled');

  const router = useRouter();

  const handleCampaignDetailClick = () => {
    router.push(`/campaign/${campaign.id}`);
  };

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
        <Button
          variant="primary"
          fullWidth
          radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
          onClick={handleReservationClick}
        >
          <span className={styles.CampaignSelectedCard__PrimaryText}>
            {HISTORY_MESSAGES.SET_VISIT_DATE}
          </span>
        </Button>
        <div className={styles.CampaignSelectedCard__WarningWrapper}>
          <IconWarningCircle color={Colors.COLOR_GRAY_400} size={HISTORY_UI.WARNING_ICON_SIZE} />
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
        <Button
          variant="secondary"
          fullWidth
          radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
          onClick={handleReviewMissionClick}
        >
          <span className={styles.CampaignSelectedCard__BasicText}>
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
                <span>체험 상세보기</span>
              </Button>
            }
          >
            <div className={styles.CampaignSelectedCard__BottomSheetContent}>
              <section
                aria-label="제공 혜택 내용"
                className={styles['CampaignSelectedCard__BottomSheetContent--Section']}
              >
                <div className={styles.CampaignSelectedCard__SectionContent}>
                  <h3>제공 혜택</h3>
                  <p className={styles.CampaignSelectedCard__SectionItem}>
                    {bottomSheetData?.providedItems || '제공 혜택 정보가 없습니다.'}
                  </p>
                </div>
                <p className={styles.CampaignSelectedCard__Description}>
                  {bottomSheetData?.description}
                </p>
              </section>
              <section
                aria-label="후기 미션 내용"
                className={styles['CampaignSelectedCard__BottomSheetContent--Section']}
              >
                <div className={styles.CampaignSelectedCard__SectionContent}>
                  <h3>후기 미션</h3>
                  <ul className={styles.CampaignSelectedCard__MissionList}>
                    {bottomSheetData?.reviewMission.map((mission, index) => (
                      <li
                        key={`mission-${index}`}
                        className={styles.CampaignSelectedCard__MissionItem}
                      >
                        {mission}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </BottomSheet>
        )}
      </>
    );
  }

  return null;
}
