import React, { useState, useEffect, useRef } from 'react'

import { toggleFullscreen } from './common'

export default function Stream ({ code }) {
  const [chat, setChat] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [gc, setGc] = useState(false)
  const [gp, setGp] = useState(false)
  const [mc, setMc] = useState(false)
  const [sc, setSc] = useState(false)
  const [tc, setTc] = useState(false)
  const [tp, setTp] = useState(false)
  const [yc, setYc] = useState(false)
  const [yp, setYp] = useState(false)
  const stream = useRef(null)

  function fullscreenchange () {
    if (document.fullscreenElement) {
      setChat(true)
      setFullscreen(true)
    } else {
      setChat(false)
      setFullscreen(false)
    }
  }

  function keyup (e) {
    if (e.code === 'KeyF') {
      onClickFullscreen()
    }
  }

  function onClickFullscreen () {
    toggleFullscreen(stream.current)
  }

  useEffect(() => {
    setChat(false)
    setFullscreen(false)
    setGc(false)
    setGp(false)
    setMc(false)
    setSc(false)
    setTc(false)
    setTp(false)
    setYc(false)
    setYp(false)
  }, [code])

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenchange)
    document.addEventListener('keyup', keyup)
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchange)
      document.removeEventListener('keyup', keyup)
    }
  }, [])

  return (
    <div className='stream' style={code.i ? { backgroundImage: `url(${code.i})` } : {}} ref={stream}>
      <div className={`panel ${chat ? 'hidden' : ''}`}>
        <div className='chats'>
          {gc && <iframe src={`https://goodgame.ru/chat/${code.g}`} />}
          {mc && <iframe src={code.m} />}
          {sc && <iframe src={`https://sc2tv.ru/${code.s}/chat`} />}
          {tc && <iframe src={`https://www.twitch.tv/embed/${code.t}/chat?parent=${process.env.NEXT_PUBLIC_HOST}`} />}
          {yc && <iframe src={`https://www.youtube.com/live_chat?v=${code.y}&embed_domain=${process.env.NEXT_PUBLIC_HOST}`} />}
        </div>
        <div className='controls'>
          {code.g && <a className={gc ? 'active' : ''} onClick={() => setGc(!gc)}>gc</a>}
          {code.g && <a className={gp ? 'active' : ''} onClick={() => setGp(!gp)}>gp</a>}
          {code.m && <a className={mc ? 'active' : ''} onClick={() => setMc(!mc)}>mc</a>}
          {code.s && <a className={sc ? 'active' : ''} onClick={() => setSc(!sc)}>sc</a>}
          {code.t && <a className={tc ? 'active' : ''} onClick={() => setTc(!tc)}>tc</a>}
          {code.t && <a className={tp ? 'active' : ''} onClick={() => setTp(!tp)}>tp</a>}
          {code.y && <a className={yc ? 'active' : ''} onClick={() => setYc(!yc)}>yc</a>}
          {code.y && <a className={yp ? 'active' : ''} onClick={() => setYp(!yp)}>yp</a>}
          <i className={`material-icons ${chat ? 'active' : ''}`} onClick={() => setChat(!chat)} title='Показать, скрыть панель'>chat</i>
          <i className={`material-icons ${fullscreen ? 'active' : ''}`} onClick={onClickFullscreen} title='Полноэкранный режим (f)'>fullscreen</i>
        </div>
      </div>
      {gp && <iframe src={`https://goodgame.ru/player?${code.g}`} />}
      {tp && <iframe src={`https://player.twitch.tv/?channel=${code.t}&parent=${process.env.NEXT_PUBLIC_HOST}`} />}
      {yp && <iframe src={`https://www.youtube-nocookie.com/embed/${code.y}`} />}
    </div>
  )
}
