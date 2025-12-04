import UserPageClient from './UserPageClient';

// 빌드 시 prerendering 방지 (API 호출이 필요한 페이지)
export const dynamic = 'force-dynamic';

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
export default function UserPage() {
  return <UserPageClient />;
}
