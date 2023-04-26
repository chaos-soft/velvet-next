import Head from 'next/head'
import Link from 'next/link'

function Error ({ message }) {
  return (
    <main className='error wrapper'>
      <h1>Ошибочка</h1>
      <p>{message}</p>
      <p><img src='/store/images/20080915-182019.png' alt='' /></p>
    </main>
  )
}

export default function Base ({ title, description, keywords, error, ...props }) {
  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='yandex-verification' content='73539a8de7bb199e' />
        <title>{title || '57 Street — статьи, стримы и всякое'}</title>
      </Head>
      <header className='header wrapper'>
        <h1><Link href='/'><span>5</span><span>7</span> Street</Link></h1>
        <nav>
          <Link href='/articles/57'>Мой маленький стрим</Link>
        </nav>
      </header>
      <div className='line mb40' />
      {props.children}
      {error && <Error message='Не получилось загрузить страницу. Может, позже?' />}
      <noscript>
        <Error message='Похоже, что в браузере отключен JavaScript, а без него ничего работать не будет.' />
      </noscript>
      <div className='line mb20' />
      <footer>
        <p>© 2008–2057 <Link href='/'>57 Street</Link></p>
        <p><Link href='/articles/79'>О сайте</Link></p>
      </footer>
    </>
  )
}
