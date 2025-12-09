# Apply (캠페인 신청)

## 📌 이 Feature는 무엇인가요?

캠페인 신청 관련 기능을 담당합니다:

- 프로필 정보 조회 및 수정
- 앱 설정 (알림, 개인정보 등)
- 로그아웃 및 회원탈퇴

## 📁 폴더 구조

```
apply/
├── components/         # 신청 관련 컴포넌트
│   ├── ApplyForm/          # 입력 폼 컴포넌트
│   ├── BlogBottomSheet/    # 블로그 입력 바텀시트
│   ├── ButtonBar/          # 하단 버튼
│   ├── CampaignApplyCard/  # 캠페인 정보
│   ├── CautionBottomSheet/ # 주의사항 바텀시트
│   └── TextArea/           # 전하고 싶은 말
└── README.md
```

## 🎯 주요 기능

### 1. 신청 정보 입력 (ApplyForm)

- 사용자의 저장된 기본 정보 불러오기 (이름, 블로그 주소, 전화번호)
- 유효성 검사

### 2. 블로그 입력 (BlogBottomSheet)

- 블로그 유효성 검사 통과 시 확인 메세지 출력
- 버튼 클릭 시 블로그 저장

### 3. 주의사항 확인 (CautionBottomSheet)

- 체크 시 신청 가능
- 버튼 클릭 시 신청 완료 페이지로 이동

## 🔒 인증 체크

신청 페이지는 **로그인한 사용자만** 접근 가능합니다.

```typescript
// app/(main)/campaign/campaignId/apply/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@entities/user/store';

function ApplyPage() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return <ApplyForm />;
}
```
