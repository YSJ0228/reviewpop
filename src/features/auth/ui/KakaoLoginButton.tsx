/**
 * 카카오 로그인 버튼 컴포넌트
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CONSTANTS } from '@shared/config/constants';
import { ROUTES } from '@shared/config/routes';

interface KakaoLoginButtonProps {
  className?: string;
}

/**
 * 랜덤 state 문자열 생성 (CSRF 방지)
 */
function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

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
      timestamp: Date.now(),
    };

    // 쿠키에 저장 (10분 유효)
    const expires = new Date(Date.now() + 10 * 60 * 1000).toUTCString();
    document.cookie = `${CONSTANTS.STORAGE_KEYS.OAUTH_STATE}=${encodeURIComponent(JSON.stringify(stateData))}; path=/; expires=${expires}; SameSite=Lax`;

    // 개발 환경: Mock OAuth (바로 콜백 호출)
    if (process.env.NODE_ENV === 'development') {
      // Mock authorization code 생성
      const mockCode = `mock-kakao-code-${Date.now()}`;

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

  return (
    <button
      onClick={handleKakaoLogin}
      className={className}
      style={{
        backgroundColor: '#FEE500',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.477 0 0 3.58 0 8C0 10.9 2.175 13.432 5.309 14.648L4.286 18.428C4.198 18.744 4.528 19.002 4.813 18.832L9.467 15.988C9.642 15.996 9.82 16 10 16C15.523 16 20 12.42 20 8C20 3.58 15.523 0 10 0Z"
          fill="currentColor"
        />
      </svg>
      카카오 로그인
    </button>
  );
}
