# Theme Entity (테마 엔티티)

## 📌 이 폴더는 무엇인가요?

앱 전체의 **테마 설정** (다크모드/라이트모드)을 관리하는 폴더입니다.

## 📁 폴더 구조

```
theme/
├── store/
│   └── themeStore.ts   # 테마 전역 상태 (Zustand)
└── README.md
```

## 🎯 주요 기능

- 다크모드/라이트모드 토글
- 테마 설정 저장 (localStorage)
- 시스템 테마 감지

## 📝 사용 예시

### 1. 현재 테마 가져오기

```typescript
import { useThemeStore } from '@entities/theme/store/themeStore';

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
      {/* ... */}
    </div>
  );
}
```

### 2. 테마 변경하기

```typescript
import { useThemeStore } from '@entities/theme/store/themeStore';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

## 💡 개발 팁

- 테마 변경 시 localStorage에 자동 저장
- CSS 변수를 활용하면 테마 전환이 쉬워집니다
- 시스템 테마를 감지하려면 `window.matchMedia('(prefers-color-scheme: dark)')` 사용
