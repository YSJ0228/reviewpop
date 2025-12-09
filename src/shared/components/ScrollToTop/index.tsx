'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * 페이지 이동 시 스크롤을 최상단으로 이동시키는 컴포넌트
 * - 뒤로가기/앞으로가기 시에는 스크롤 위치를 복원 (브라우저 기본 동작 활용)
 * - 새로운 페이지 진입 시에만 스크롤을 최상단으로 이동
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isBack = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isBack.current = true;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // 뒤로가기/앞으로가기나 팝업 등이 아닌 실제 페이지 이동인 경우
    if (!isBack.current) {
      window.scrollTo(0, 0);
    }

    // 다음 네비게이션을 위해 상태 초기화
    isBack.current = false;
  }, [pathname]);

  return null;
}
