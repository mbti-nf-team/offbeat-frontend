import { ReactNode } from 'react';

import Layout from 'components/common/layout';
import Toast from 'components/common/toast';

import Providers from './providers';

import 'react-spring-bottom-sheet/dist/style.css';
import 'styles/normalize.css';
import 'styles/global.scss';

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
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
        <Toast />
      </body>
    </html>
  );
}

export default RootLayout;
