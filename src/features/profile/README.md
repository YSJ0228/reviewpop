# Profile (프로필)

## 📌 이 Feature는 무엇인가요?

사용자 프로필 및 설정 관련 기능을 담당합니다:

- 프로필 정보 조회 및 수정
- 앱 설정 (알림, 개인정보 등)
- 로그아웃 및 회원탈퇴

## 📁 폴더 구조

```
profile/
├── components/             # 프로필 관련 컴포넌트
│   ├── MyCampaignState/        # 캠페인 상태 태그
│   ├── MyCurrentCampaignCard/  # 프로필 나의 캠페인 카드
│   ├── MyCurrentCampaignList/  # 프로필 나의 캠페인
│   ├── MyProfile/              # 프로필 페이지
│   ├── ProfileInfo/            # 프로필 정보
|   ├── SettingList/            # 설정 세부 항목
│   └── Settings/               # 설정
├── hooks/                  # 프로필 관련 훅
│   ├── useProfile.ts           # 프로필 조회
│   └── useUpdateProfile.ts     # 프로필 수정
├── api/                # 프로필 API
│   └── profileApi.ts
└── README.md
```

## 🎯 주요 기능

### 1. 프로필 정보 (ProfileInfo)

- 사용자 기본 정보 표시 (이름, 이메일, 프로필 이미지)
- 가입일, 활동 통계 등
- 프로필 수정 버튼
- 설정 버튼 (설정 페이지로 이동)

### 2. 프로필 수정 (ProfileEdit)

- 프로필 이미지 변경
- 닉네임 수정
- 연락처 수정
- 저장 버튼

### 3. 설정 (Settings)

- **알림 설정**: 푸시 알림, 이메일 알림 ON/OFF
- **개인정보 설정**: 개인정보 관리
- **계정 관리**: 로그아웃, 회원탈퇴
- **앱 정보**: 버전, 이용약관, 개인정보처리방침

## 🔧 사용 예시

### 프로필 조회

```typescript
// features/profile/hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../api/profileApi';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}

// 사용
import { useProfile } from '@features/profile/hooks/useProfile';

function ProfileInfo() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <img src={profile?.profileImage} alt="프로필" />
      <h2>{profile?.name}</h2>
      <p>{profile?.email}</p>
    </div>
  );
}
```

### 프로필 수정

```typescript
// features/profile/hooks/useUpdateProfile.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '../api/profileApi';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdateData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// 사용
import { useUpdateProfile } from '@features/profile/hooks/useUpdateProfile';

function ProfileEdit() {
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleSubmit = (data: FormData) => {
    updateProfile(data);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 로그아웃

```typescript
// features/profile/components/Settings/Settings.tsx
import { useRouter } from 'next/navigation';

import { useUserStore } from '@entities/user/store';

function Settings() {
  const router = useRouter();
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout(); // 전역 상태 초기화
    router.push('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
```

## 🔒 인증 체크

프로필 페이지는 **로그인한 사용자만** 접근 가능합니다.

```typescript
// app/(main)/profile/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@entities/user/store';

function ProfilePage() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return <ProfileInfo />;
}
```

## ✅ 개발 시 체크리스트

### ProfileInfo 컴포넌트

- [ ] 프로필 정보 조회 API 연동
- [ ] 프로필 이미지 표시
- [ ] 사용자 정보 표시
- [ ] 프로필 수정 버튼
- [ ] 설정 버튼 (설정 페이지로 이동)

### ProfileEdit 컴포넌트

- [ ] 현재 프로필 정보 로드
- [ ] 이미지 업로드 기능
- [ ] 폼 입력 필드
- [ ] Validation
- [ ] 수정 API 연동

### Settings 컴포넌트

- [ ] 알림 설정 토글
- [ ] 로그아웃 버튼
- [ ] 회원탈퇴 버튼 (확인 다이얼로그 포함)
- [ ] 이용약관, 개인정보처리방침 링크
- [ ] 앱 버전 정보

## 🚫 주의사항

1. **인증 체크 필수**
   - 프로필 페이지는 로그인 필요
   - 로그인하지 않은 경우 로그인 페이지로 리다이렉트

2. **전역 상태 사용**

   ```typescript
   // ✅ 올바른 예 - entities의 user store 사용
   import { useUserStore } from '@entities/user/store';
   ```

3. **민감 정보 처리**
   - 개인정보 수정 시 재인증 고려
   - 회원탈퇴 시 확인 다이얼로그 필수

## 🔗 관련 페이지

- 프로필 (`/profile`) - 하단 탭 O
- 설정 (`/settings`) - 하단 탭 X

## 💡 Tip

- 프로필 이미지 업로드 시 이미지 크기 제한 (예: 5MB)
- 회원탈퇴 시 복구 불가능 안내 명확히
- 설정 변경 시 즉시 반영되도록 구현
