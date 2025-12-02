# usePageHeader 훅 사용 가이드

`usePageHeader`는 앱의 전역 헤더(`GlobalPageHeader`)와 네비게이션(`GlobalMainNavigation`)을 페이지별로 제어하기 위한 커스텀 훅입니다.

## 📌 기본 사용법

각 페이지 컴포넌트(`page.tsx`) 내부에서 훅을 호출하여 헤더 설정을 정의합니다.

```tsx
import { usePageHeader } from '@shared/hooks/usePageHeader';

export default function MyPage() {
  usePageHeader({
    title: '페이지 제목',
    showBackButton: true,
  });

  return <main>...</main>;
}
```

## ⚙️ 설정 옵션 (`PageHeaderConfig`)

| 속성                   | 타입         | 기본값          | 설명                                                                                        |
| ---------------------- | ------------ | --------------- | ------------------------------------------------------------------------------------------- |
| `title`                | `string`     | `''`            | 헤더 중앙에 표시될 제목입니다.                                                              |
| `showBackButton`       | `boolean`    | `true`          | 좌측 뒤로가기 버튼 표시 여부입니다.                                                         |
| `showXButton`          | `boolean`    | `false`         | 좌측 닫기(X) 버튼 표시 여부입니다. (모달이나 팝업 형태일 때 사용)                           |
| `isVisible`            | `boolean`    | `true`          | 헤더 전체 표시 여부입니다. `false`로 설정하면 헤더가 숨겨집니다.                            |
| `showBottomNavigation` | `boolean`    | `true`          | **(Main 레이아웃 전용)** 하단 탭(GNB) 표시 여부입니다. `false`로 설정하면 GNB가 숨겨집니다. |
| `rightAction`          | `ReactNode`  | `null`          | 헤더 우측에 표시할 커스텀 요소(버튼, 아이콘 등)입니다.                                      |
| `onBack`               | `() => void` | `router.back()` | 뒤로가기 버튼 클릭 시 실행될 함수입니다. 기본값은 이전 페이지로 이동입니다.                 |
| `onX`                  | `() => void` | `null`          | 닫기(X) 버튼 클릭 시 실행될 함수입니다.                                                     |

## 💡 활용 예시

### 1. 기본 헤더 (뒤로가기 + 제목)

가장 일반적인 형태입니다.

```tsx
usePageHeader({
  title: '상세 정보',
  showBackButton: true,
});
```

### 2. 닫기 버튼이 있는 헤더 (모달/팝업 스타일)

뒤로가기 대신 X 버튼을 표시하고, 클릭 시 특정 동작을 수행합니다.

```tsx
usePageHeader({
  title: '예약 완료',
  showBackButton: false,
  showXButton: true,
  onX: () => router.push('/home'), // 홈으로 이동
});
```

### 3. 우측 커스텀 버튼 추가

헤더 오른쪽에 '저장', '공유' 등의 버튼을 추가할 수 있습니다.

```tsx
usePageHeader({
  title: '글쓰기',
  rightAction: (
    <button onClick={handleSave} style={{ color: 'blue' }}>
      완료
    </button>
  ),
});
```

### 4. GNB 숨기기 (전체 화면 모드)

`(main)` 레이아웃 안에 있지만, 하단 탭(GNB)을 숨기고 싶을 때 사용합니다. (예: 상세 내역 페이지)

```tsx
usePageHeader({
  title: '미선정 내역',
  showBottomNavigation: false, // GNB 숨김
});
```

### 5. 헤더 숨기기

특정 페이지에서 헤더를 아예 보여주고 싶지 않을 때 사용합니다.

```tsx
usePageHeader({
  isVisible: false,
});
```

## ⚠️ 주의사항

- 페이지가 언마운트되면 헤더 설정은 자동으로 초기화됩니다.

## 🚀 Server Component에서 사용하기 (`HeaderConfig`)

페이지 전체를 Client Component로 만들고 싶지 않다면, `HeaderConfig` 컴포넌트를 사용하세요.

```tsx
// page.tsx (Server Component)
import { HeaderConfig } from '@shared/components/HeaderConfig';

export default async function ServerPage() {
  const data = await fetchData(); // 서버 사이드 데이터 페칭

  return (
    <>
      {/* 클라이언트 로직은 이 컴포넌트 안에서만 실행됨 */}
      <HeaderConfig title={data.title} showBackButton />

      <main>
        <h1>{data.title}</h1>
        {/* ... */}
      </main>
    </>
  );
}
```
