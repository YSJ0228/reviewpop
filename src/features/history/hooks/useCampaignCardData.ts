import dayjs from '@shared/lib/dayjs.config';
import { DATE_FORMATS } from '@shared/lib/date';

import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';

import type { Application } from '@entities/application';
import type { VisitStatus } from '@features/history/types';

/**
 * CampaignCard에서 사용하는 공통 데이터를 준비하는 훅
 * @param application - 체험 신청 정보
 * @returns 공통 데이터 객체
 */
export function useCampaignCardData(application: Application) {
  const { campaign } = application;
  const { schedule } = campaign;

  const announcementDate = schedule.winnerAnnouncement.start;
  const announcementStatus = calculateAnnouncementDate(announcementDate);

  const visitStatus: VisitStatus = application.isReservated ? 'scheduled' : 'before';

  const appliedAt = application.reservationDate
    ? ([
        dayjs(application.reservationDate).format(DATE_FORMATS.DATE_ONLY),
        dayjs(application.reservationDate).format(DATE_FORMATS.TIME),
      ] as [string, string])
    : undefined;

  const recruitmentSchedule = [schedule.application.start, schedule.application.end] as [
    string,
    string,
  ];

  return {
    campaign,
    announcementDate,
    announcementStatus,
    visitStatus,
    appliedAt,
    recruitmentSchedule,
  };
}
