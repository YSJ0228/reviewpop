import { requireAuth } from '@shared/lib/auth.server';
import { ROUTES } from '@shared/config/routes';
export default async function ProfilePage() {
  // 인증 필수 - 미인증 시 로그인 페이지로 리다이렉트
  const user = await requireAuth(ROUTES.PROFILE);

  return (
    <main style={{ padding: '20px' }}>
      <h1>프로필</h1>

      <div style={{ marginTop: '20px' }}>
        <h2>사용자 정보</h2>
        <div style={{ marginTop: '12px' }}>
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>로그인 방식:</strong> {user.provider === 'kakao' ? '카카오' : user.provider}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        </form>
      </div>
    </main>
  );
}
