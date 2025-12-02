'use client';

import { usePageHeader, PageHeaderConfig } from '@shared/hooks/usePageHeader';

/**
 * Server Component에서 헤더를 설정하기 위한 유틸리티 컴포넌트입니다.
 * 이 컴포넌트를 사용하면 페이지 전체를 'use client'로 전환하지 않아도 됩니다.
 *
 * @returns null - 이 컴포넌트는 UI를 렌더링하지 않고 side effect만 실행합니다.
 */
export function HeaderConfig(config: PageHeaderConfig) {
  usePageHeader(config);
  return null;
}
