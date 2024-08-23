import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import { Error } from './common'

export default function Base ({ title, description, keywords, error, isEmpty, ...props }) {
  const [theme, setTheme] = useState('light')

  function switchTheme (theme) {
    document.cookie = `theme=${theme};max-age=31536000`
    document.documentElement.dataset.theme = theme
    setTheme(theme)
  }

  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title || '57 Street — статьи, стримы, Linux, лас плагас'}</title>
      </Head>
      {!isEmpty &&
        <>
          <header className='header wrapper'>
            <h1><Link href='/'><span>5</span><span>7</span> Street</Link></h1>
            <nav>
              <Link href='/articles/57'>Мой маленький стрим</Link>
              <span
                className={`material-symbols-outlined ${theme === 'dark' ? 'dn' : ''}`}
                onClick={() => switchTheme('dark')}
                title='Тёмная тема'
              >
                dark_mode
              </span>
              <span
                className={`material-symbols-outlined ${theme === 'light' ? 'dn' : ''}`}
                onClick={() => switchTheme('light')}
                title='Светлая тема'
              >
                light_mode
              </span>
            </nav>
          </header>
          <div className='line mb40' />
        </>}
      {props.children}
      {error && <Error message='Не получилось загрузить страницу. Может, позже?' />}
      <noscript>
        <Error message='Похоже, что в браузере отключен JavaScript, а без него ничего работать не будет.' />
      </noscript>
      {!isEmpty &&
        <>
          <div className='line mb20' />
          <footer>
            <p>© 2008–2024 57st.net, 2024–2057 <Link href='/'>57st.su</Link></p>
            <p><Link href='/articles/79'>О сайте</Link></p>
          </footer>
        </>}
    </>
  )
}
