/**
 * MSW 핸들러 통합
 *
 * 모든 도메인별 핸들러를 하나로 통합합니다.
 */

import { authHandlers } from '@shared/api/mock/handlers/auth';
import { reviewHandlers } from '@entities/review/api/mock/handlers';
import { kakaoOAuthHandlers } from '@shared/api/mock/handlers/oauth/kakao';
import { myCampaignHandlers } from '@entities/history/api/myMock';
import { campaignHandlers } from '@entities/campaign/api/mock/handlers';
import { applicationHandlers } from '@shared/api/mock/handlers/applications';
import { notificationHandlers } from '@entities/notification/api/mock/handlers';
import { reservationHandlers } from '@shared/api/mock/handlers/reservations';

/**
 * 모든 MSW 핸들러
 *
 * 새로운 도메인 핸들러를 추가할 때는 여기에 추가하세요.
 */
export const handlers = [
  ...kakaoOAuthHandlers, // OAuth 핸들러 (외부 도메인)
  ...reviewHandlers,
  ...authHandlers,
  ...campaignHandlers,
  ...myCampaignHandlers,
  ...applicationHandlers,
  ...reservationHandlers,
  ...notificationHandlers,
];
