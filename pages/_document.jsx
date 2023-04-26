import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='icon' href='/store/images/icon.png' type='image/png' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='/store/css/base.css' />
        <link rel='stylesheet' href='/store/css/style.css' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Lobster&display=swap' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
