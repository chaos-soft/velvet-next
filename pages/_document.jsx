import { Html, Head, Main, NextScript } from 'next/document'

const isProd = process.env.NODE_ENV === 'production'

export default function Document () {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='icon' href='/store/images/icon.png' type='image/png' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Lobster&display=swap' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        {isProd &&
          <>
            <link rel='stylesheet' href='/store/css/xxx.css' />
            <script src='/store/js/metrika.js' />
          </>}
        {!isProd &&
          <>
            <link rel='stylesheet' href='/store/css/reset.css' />
            <link rel='stylesheet' href='/store/css/slideshow.css' />
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
