import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Base from '../../components/base'
import Stream from '../../components/stream'
import { makeRequest } from '../../components/common'

export default function Article () {
  const [title, setTitle] = useState('')
  const router = useRouter()
  const { data, error } = makeRequest(router.isReady ? `articles/${router.query.id}` : null)

  useEffect(() => {
    if (!data) {
      return
    }
    if (data.article_type === 4) {
      setTitle(`${data.title} (${data.images_list.length})`)
    } else {
      setTitle(data.title)
    }
  }, [data])

  if (error) {
    return <Base error />
  } else if (!data) {
    return <Base title='Загрузка' />
  }

  return (
    <Base title={title} description={data.get_intro}>
      {data.article_type === 5 && <Stream code={data.get_code} />}
      <main className='article wrapper'>
        <h1>{title}</h1>
        {data.article_type === 2 &&
          <div className='iframe'>
            <iframe
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              src={`https://www.youtube.com/embed/?playlist=${data.get_code}&loop=1`}
            />
          </div>}
        <div dangerouslySetInnerHTML={{ __html: data.get_content }} />
        {data.article_type === 4 &&
          <div className='album'>
            {data.images_list.map((image) => (
              <a href={`/store/${image}`} key={image}>
                <img src={`/store/thumbnails/${image}`} alt={image} title={image} />
              </a>
            ))}
          </div>}
        <footer className='tac'>
          {data.is_published && data.date}
          {' '}
          {data.article_type === 4 && <Link href={`/slideshow/${data.id}?text=Любой текст`}>Заставочка</Link>}
        </footer>
      </main>
    </Base>
  )
}
