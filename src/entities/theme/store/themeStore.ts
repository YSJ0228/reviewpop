/**
 * Theme Store (Zustand)
 *
 * 앱의 테마 설정을 관리하는 전역 store입니다.
 * 다크모드/라이트모드 전환 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * import { useThemeStore } from '@entities/theme/store/themeStore';
 *
 * function ThemeToggle() {
 *   const theme = useThemeStore((state) => state.theme);
 *   const toggleTheme = useThemeStore((state) => state.toggleTheme);
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {theme === 'dark' ? '🌙' : '☀️'}
 *     </button>
 *   );
 * }
 * ```
 */

import { create } from 'zustand';
import { storage } from '@shared/lib/storage';
import { CONSTANTS } from '@shared/config/constants';

export type Theme = 'light' | 'dark';

interface ThemeState {
  /** 현재 테마 */
  theme: Theme;
}

interface ThemeActions {
  /** 테마 설정 */
  setTheme: (theme: Theme) => void;
  /** 테마 토글 (라이트 ↔ 다크) */
  toggleTheme: () => void;
  /** 시스템 테마 감지 */
  detectSystemTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

/**
 * 시스템 다크모드 여부 확인
 */
function isSystemDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * DOM에 테마 적용
 */
function applyThemeToDOM(theme: Theme) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Theme Store
 */
export const useThemeStore = create<ThemeStore>((set, get) => ({
  // 초기 상태
  theme: 'light',

  // Actions
  setTheme: (theme) => {
    set({ theme });
    storage.set(CONSTANTS.STORAGE_KEYS.THEME, theme);
    applyThemeToDOM(theme);
  },

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  detectSystemTheme: () => {
    // localStorage에 저장된 테마가 있으면 사용
    const savedTheme = storage.get<Theme>(CONSTANTS.STORAGE_KEYS.THEME);

    if (savedTheme) {
      get().setTheme(savedTheme);
      return;
    }

    // 시스템 테마 감지
    const systemTheme: Theme = isSystemDarkMode() ? 'dark' : 'light';
    get().setTheme(systemTheme);

    // 시스템 테마 변경 감지
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        get().setTheme(newTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
    }
  },
}));
