/**
 * User 관련 타입 정의
 */

import { Campaign } from '@features/campaign';
import type { OAuthProvider } from '@shared/types/auth.types';

type UserCampaignStatus = 'reservation' | 'review' | 'plan';

/**
 * 사용자 정보
 */
export interface User {
  /** 사용자 ID */
  id: string;
  /** 연락처 */
  phoneNumber?: string;
  /** 이름 */
  name: string;
  /** 블로그 주소 */
  blogAddress?: string;
  /** 이메일 */
  email: string;
  /** 가입일 */
  createdAt: string;
  /** OAuth Provider(naver, kakao) */
  provider: OAuthProvider;
}
export interface UserCampaign {
  campaign: Campaign;
  status: UserCampaignStatus;
  date?: string;
}

export interface UserCampaigns {
  name: string;
  participatedCampaigns: number;
  enrolledReviews: number;
  campaigns: UserCampaign[];
}

/**
 * 로그인 요청 데이터
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 데이터
 */
export interface LoginResponse {
  user: User;
  token: string;
}
