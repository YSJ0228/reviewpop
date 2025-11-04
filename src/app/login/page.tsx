/**
 * 로그인 페이지
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { KakaoLoginButton } from '@features/auth';
import styles from './page.module.scss';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');

  // 에러 메시지 매핑
  const errorMessages: Record<string, string> = {
    oauth_failed: '소셜 로그인에 실패했습니다.',
    invalid_code: '잘못된 인증 코드입니다.',
    invalid_state: '유효하지 않은 요청입니다.',
    auth_failed: '인증에 실패했습니다.',
    server_error: '서버 오류가 발생했습니다.',
  };

  return (
    <main className={styles.LoginPage}>
      <div className={styles.LoginPage__Card}>
        {/* 로고/타이틀 */}
        <h1 className={styles.LoginPage__Title}>리뷰팝</h1>

        <p className={styles.LoginPage__Subtitle}>소셜 로그인으로 간편하게 시작하세요</p>

        {/* 에러 메시지 */}
        {error && (
          <div className={`${styles.LoginPage__Alert} ${styles['LoginPage__Alert--Error']}`}>
            {errorMessages[error] || '로그인 중 오류가 발생했습니다.'}
          </div>
        )}

        {/* 리다이렉트 안내 */}
        {redirect && !error && (
          <div className={`${styles.LoginPage__Alert} ${styles['LoginPage__Alert--Info']}`}>
            로그인 후 이전 페이지로 돌아갑니다
          </div>
        )}

        {/* 소셜 로그인 버튼들 */}
        <div className={styles.LoginPage__Actions}>
          <KakaoLoginButton />

          {/* 네이버 로그인 버튼 (추후 추가) */}
          <button disabled className={styles.LoginPage__NaverButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0Z"
                fill="white"
              />
            </svg>
            네이버 로그인 (준비중)
          </button>
        </div>

        {/* 개발 환경 안내 */}
        {process.env.NODE_ENV === 'development' && (
          <div className={styles.LoginPage__DevInfo}>
            🔧 개발 환경: Mock OAuth를 사용합니다
            <br />
            버튼 클릭 시 자동으로 로그인됩니다
          </div>
        )}
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.LoginPage__Fallback}>로딩중...</div>}>
      <LoginContent />
    </Suspense>
  );
}
