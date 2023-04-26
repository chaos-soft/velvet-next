import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Base from '../../components/base'
import Stream from '../../components/stream'
import { makeRequest } from '../../components/common'

export default function Article () {
  const [object, setObject] = useState({})
  const router = useRouter()
  const { id } = router.query
  const { data, error } = makeRequest(`articles/${id}`)

  useEffect(() => {
    if (data) {
      // TODO: Почему data не работает напрямую, а только через setObject()?
      setObject(data)
    }
  }, [data])

  return (
    <Base title={object.title} description={object.get_intro} error={error && !data}>
      {object.type === 5 && <Stream code={object.get_code} />}
      <main className='article wrapper'>
        <h1>{object.title}</h1>
        {object.type === 2 &&
          <div className='iframe'>
            <iframe
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              src={`https://www.youtube.com/embed/?playlist=${object.get_code}&loop=1`}
            />
          </div>}
        <div dangerouslySetInnerHTML={{ __html: object.get_content }} />
        {object.type === 4 &&
          <div className='album'>
            {object.images.map((image) => (
              <a href={`/store/${image}`} key={image}>
                <img src={`/store/thumbnails/${image}`} alt={image} title={image} />
              </a>
            ))}
          </div>}
        {object.is_published && <footer>{object.date.replace('T', ' ').split('.')[0]}</footer>}
      </main>
    </Base>
  )
}
