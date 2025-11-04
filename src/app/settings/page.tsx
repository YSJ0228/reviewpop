'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 설정 페이지
 * - 하단 탭: X
 * - 진입점: 프로필 페이지 > 설정 버튼
 *
 * TODO:
 * 1. [ ] Settings 컴포넌트 구현 (@features/profile/components/Settings)
 * 2. [ ] 알림 설정
 * 3. [ ] 개인정보 설정
 * 4. [ ] 로그아웃 버튼
 * 5. [ ] 회원탈퇴 버튼
 * 6. [ ] 앱 정보 (버전, 이용약관, 개인정보처리방침)
 */
export default function SettingsPage() {
  return (
    <main className={styles.SettingsPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: Settings 컴포넌트 추가 */}
          <div className={styles.Placeholder}>
            <p>설정</p>
            <p className={styles.Todo}>
              features/profile/components/Settings 컴포넌트를 구현하세요
            </p>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
