import { Html, Head, Main, NextScript } from 'next/document'

const isProd = process.env.NODE_ENV === 'production'

export default function Document () {
  return (
    <Html lang='ru' data-theme='light'>
      <Head>
        <link rel='icon' href='/store/images/icon.png' type='image/png' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Lobster&display=swap' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' />
        {isProd &&
          <>
            <link rel='stylesheet' href='/store/css/xxx.css' />
            <script src='/store/js/metrika.js' />
          </>}
        {!isProd &&
          <>
            <link rel='stylesheet' href='/store/css/reset.css' />
            <link rel='stylesheet' href='/store/css/album.css' />
            <link rel='stylesheet' href='/store/css/articles.css' />
            <link rel='stylesheet' href='/store/css/rutube.css' />
            <link rel='stylesheet' href='/store/css/slideshow.css' />
            <link rel='stylesheet' href='/store/css/stream.css' />
            <link rel='stylesheet' href='/store/css/style.css' />
          </>}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
