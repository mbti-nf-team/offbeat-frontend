import { ReactNode } from 'react';
import ga4 from 'react-ga4';

import Script from 'next/script';

import Layout from '@/components/common/Layout';
import Toast from '@/components/common/Toast';

import pretendardFont from './_fonts';
import Providers from './providers';

import 'src/styles/normalize.css';
import 'src/styles/bottomSheet.css';
import 'src/styles/global.scss';

ga4.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
  // testMode: process.env.NODE_ENV === 'development',
  // TODO - 정의 후 변경
  testMode: true,
});

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendardFont.className}>
      <head>
        {process.env.NODE_ENV === 'production' && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
          <Script id="google-tag-manager">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
            `}
          </Script>
        </>
        )}
        <link
          rel="apple-touch-icon"
          href="/assets/apple-touch-icon.png"
          type="image/png"
          sizes="180×180"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
        <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#131118" />
      </head>
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
          <Toast />
          <div id="portal-container" />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
