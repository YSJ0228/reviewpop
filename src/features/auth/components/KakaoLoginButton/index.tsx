/**
 * 카카오 로그인 버튼 컴포넌트
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { CONSTANTS } from '@shared/config/constants';
import { env } from '@shared/config/env';
import { ROUTES } from '@shared/config/routes';
import { Button } from '@shared/components';
import { toUnix, toUTCString, now } from '@shared/lib/date';

import { generateState } from './utils';

import type { KakaoLoginButtonProps } from './types';

import styles from './style.module.scss';

export function KakaoLoginButton({ className }: KakaoLoginButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const handleKakaoLogin = () => {
    // State 생성 (CSRF 방지)
    const state = generateState();

    // State를 쿠키에 저장 (서버에서 검증하기 위해)
    const stateData = {
      state,
      redirectUrl: redirectUrl || ROUTES.HOME,
      timestamp: toUnix(),
    };

    // 쿠키에 저장 (10분 유효)
    const expires = toUTCString(now().add(10, 'minute'));
    document.cookie = `${CONSTANTS.STORAGE_KEYS.OAUTH_STATE}=${encodeURIComponent(JSON.stringify(stateData))}; path=/; expires=${expires}; SameSite=Lax`;

    // Mock 모드이거나 개발 환경일 때: Mock OAuth (바로 콜백 호출)
    if (env.useMock) {
      // Mock authorization code 생성
      const mockCode = `mock-kakao-code-${toUnix()}`;

      // 콜백 URL로 이동 (실제 카카오 OAuth 리다이렉트 시뮬레이션)
      const callbackUrl = new URL(ROUTES.AUTH_CALLBACK.KAKAO, window.location.origin);
      callbackUrl.searchParams.set('code', mockCode);
      callbackUrl.searchParams.set('state', state);

      router.push(callbackUrl.toString());
      return;
    }

    // 프로덕션: 실제 카카오 OAuth
    const kakaoAuthUrl = new URL(CONSTANTS.OAUTH.KAKAO.AUTHORIZE_URL);
    kakaoAuthUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '');
    kakaoAuthUrl.searchParams.set(
      'redirect_uri',
      `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH_CALLBACK.KAKAO}`,
    );
    kakaoAuthUrl.searchParams.set('response_type', 'code');
    kakaoAuthUrl.searchParams.set('state', state);

    window.location.href = kakaoAuthUrl.toString();
  };

  const buttonClassName = [styles.KakaoLoginButton, className].filter(Boolean).join(' ');

  return (
    <Button onClick={handleKakaoLogin} className={buttonClassName}>
      <Image src={'/images/icons/IcoKakao.svg'} width={18} height={18} alt="카카오 로고" />
      <span>카카오로 계속하기</span>
    </Button>
  );
}
