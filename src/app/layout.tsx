import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import '@styles/globals.scss';
import { fontClasses } from '@styles/fonts';

import { Providers } from './providers/Providers';

import type { Metadata, Viewport } from 'next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${fontClasses}`}>
        <div className="app-container">
          <Providers>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Providers>
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: '리뷰팝',
  description: '체험단 리뷰 플랫폼',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
