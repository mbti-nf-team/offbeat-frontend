import { ReactNode } from 'react';

import StyledComponentsRegistry from 'lib/StyledComponentsRegistry';

import Layout from 'components/common/Layout';

import GlobalStyleThemeProvider from './GlobalStyleThemeProvider';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyleThemeProvider>
            <Layout>
              {children}
            </Layout>
          </GlobalStyleThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
