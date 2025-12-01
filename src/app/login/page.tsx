/**
 * 로그인 페이지
 */

import { Suspense } from 'react';
import Image from 'next/image';

import { HeaderConfig } from '@shared/components/HeaderConfig';

import { KakaoLoginButton } from '@features/auth';
import { NaverLoginButton } from '@features/auth';

import styles from './page.module.scss';

function LoginContent() {
  return (
    <main className={styles.LoginPage}>
      <HeaderConfig showBackButton={false} showXButton />
      <div className={styles.LoginPage__Card}>
        {/* 로고/타이틀 */}
        <Image src={'/images/LogoVer.svg'} width={194} height={68} alt="데이트팝 체험단 로고" />
        <p className={styles.LoginPage__Subtitle}>
          데이트팝과는 또 다른, 체험을 위한 공간이에요.
          <br />
          간편 가입으로 시작해보세요!
        </p>

        {/* 회원가입 강조 */}
        <Image src={'/images/QuickLogin.svg'} width={194} height={68} alt="데이트팝 체험단 로고" />

        {/* 소셜 로그인 버튼들 */}
        <div className={styles.LoginPage__Actions}>
          <KakaoLoginButton />
          <NaverLoginButton />
        </div>
      </div>
      <div className={styles.LoginPage__Info}>
        가입 시 <a>개인정보 수집 이용 동의</a>, <a>개인정보 제3자 (판매자) 제공</a>에 동의하시는
        것입니다
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
