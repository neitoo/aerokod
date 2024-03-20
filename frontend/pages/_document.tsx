import {
  Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
  <Html lang="ru">
    <Head>
      <link rel="shortcut icon" href="/next.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
