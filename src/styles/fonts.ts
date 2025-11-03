// 전역적으로 사용할 폰트 import
// next/font를 기본으로 사용하여, html 태그에 적용할 variable string 생성

import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  variable: '--font-pretendard',
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  fallback: ['Noto Sans KR', 'sans-serif'],
});

const notoSans = Noto_Sans_KR({
  variable: '--font-noto-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  fallback: ['system-ui'],
});

export const Fonts = {
  FONT_PRETENDARD: pretendard.variable,
  FONT_NOTO_SANS: notoSans.variable,
};

export const fontClasses = `${Fonts.FONT_PRETENDARD} ${Fonts.FONT_NOTO_SANS}`;
