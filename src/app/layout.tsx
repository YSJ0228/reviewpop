import '@styles/globals.scss';
import { fontClasses } from '@styles/fonts';

import type { Metadata } from 'next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${fontClasses}`}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: '리뷰팝',
  description: '체험단 리뷰 플랫폼',
};
