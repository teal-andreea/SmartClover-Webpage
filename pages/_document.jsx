import { Html, Head, Main, NextScript } from 'next/document';

const Document = ({ __NEXT_DATA__ }) => (
  <Html lang={__NEXT_DATA__?.props?.pageProps?.post?.language === 'ro' ? 'ro' : 'en'}>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
