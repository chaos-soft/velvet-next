import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Base from '../../components/base'
import { makeRequest, Error } from '../../components/common'

export default function Slideshow () {
  const [animate, setAnimate] = useState(0)
  const image = useRef(null)
  const router = useRouter()
  const title = 'Заставочка'
  const { data, error } = makeRequest(router.isReady ? `articles/${router.query.id}` : null)

  function getRandomImage () {
    const i = getRandomNumber(0, data.images.length - 1)
    return `/store/${data.images[i]}`
  }

  function getRandomNumber (min, max) {
    return parseInt(Math.random() * ((max + 1) - min) + min)
  }

  function getRotate () {
    const x = getRandomNumber(-10, 10)
    const y = getRandomNumber(-10, 10)
    return `rotateX(${x}deg) rotateY(${y}deg)`
  }

  useEffect(() => {
    if (!data || !data.images.length) {
      return
    }
    image.current.style.transform = getRotate()
    let changeInterval = setInterval(() => {
      const src = getRandomImage()
      if (image.current.src === src) {
        image.current.src = getRandomImage()
      } else {
        image.current.src = src
      }
    }, 30 * 1000)
    let rotateInterval = setInterval(() => {
      image.current.style.transform = getRotate()
    }, 5 * 1000)
    setAnimate(1)
    return () => {
      clearInterval(changeInterval)
      clearInterval(rotateInterval)
      changeInterval = null
      rotateInterval = null
    }
  }, [data])

  if (error) {
    return <Base error />
  } else if (!data) {
    return null
    // return <Base title='Загрузка' />
  } else if (!data.images.length) {
    return (
      <Base title={title}>
        <Error message='Нет картинок для показа.' />
      </Base>
    )
  }

  return (
    <Base title={title} isEmpty>
      <div className='slideshow'>
        <div className='image' animate={animate}>
          <img alt='' ref={image} src={getRandomImage()} />
        </div>
        <div className='text'>{router.query.text}</div>
      </div>
    </Base>
  )
}
