import { GlobalPageHeader } from '@shared/components';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { fontClasses } from '@shared/styles/fonts';
import '@shared/lib/dayjs.config';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@pop-ui/core/styles.css';
import '@shared/styles/globals.scss';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { Providers } from './providers/Providers';

import type { Metadata, Viewport } from 'next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${fontClasses}`}>
        <div className="AppContainer">
          <GlobalPageHeader />
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
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
