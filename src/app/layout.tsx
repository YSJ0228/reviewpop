import '@pop-ui/core/styles.css';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import '@shared/styles/globals.scss';
import { fontClasses } from '@shared/styles/fonts';
import '@shared/lib/dayjs.config';

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
        <div className="AppContainer">
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
