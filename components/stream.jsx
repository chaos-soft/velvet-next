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
  const [vc, setVc] = useState(false)
  const [vp, setVp] = useState(false)
  const [yc, setYc] = useState(false)
  const [yp, setYp] = useState(false)
  const stream = useRef(null)
  const [gcUrl, setGcUrl] = useState('')
  const [gpUrl, setGpUrl] = useState('')
  const [mcUrl, setMcUrl] = useState('')
  const [scUrl, setScUrl] = useState('')
  const [tcUrl, setTcUrl] = useState('')
  const [tpUrl, setTpUrl] = useState('')
  const [vcUrl, setVcUrl] = useState('')
  const [vpUrl, setVpUrl] = useState('')
  const [ycUrl, setYcUrl] = useState('')
  const [ypUrl, setYpUrl] = useState('')

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
    setGcUrl(`https://goodgame.ru/chat/${code.g}`)
    setGpUrl(`https://goodgame.ru/player?${code.g}`)
    setMcUrl(code.m)
    setScUrl(`https://sc2tv.ru/${code.s}/chat`)
    setTcUrl(`https://www.twitch.tv/embed/${code.t}/chat?parent=${process.env.NEXT_PUBLIC_HOST}`)
    setTpUrl(`https://player.twitch.tv/?channel=${code.t}&parent=${process.env.NEXT_PUBLIC_HOST}`)
    setVcUrl(`https://vkplay.live/${code.v}/only-chat?initialMode=0`)
    setVpUrl(`https://vkplay.live/app/embed/${code.v}`)
    setYcUrl(`https://www.youtube.com/live_chat?v=${code.y}&embed_domain=${process.env.NEXT_PUBLIC_HOST}`)
    setYpUrl(`https://www.youtube-nocookie.com/embed/${code.y}`)
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
          {gc && <iframe src={gcUrl} />}
          {mc && <iframe src={mcUrl} />}
          {yc && <iframe src={ycUrl} />}
          {sc && <iframe src={scUrl} />}
          {tc && <iframe src={tcUrl} />}
          {vc && <iframe src={vcUrl} />}
        </div>
        <div className='controls'>
          {code.g && <a href={gcUrl} className={gc ? 'active' : ''} onClick={(e) => { setGc(!gc); e.preventDefault() }}>gc</a>}
          {code.g && <a href={gpUrl} className={gp ? 'active' : ''} onClick={(e) => { setGp(!gp); e.preventDefault() }}>gp</a>}
          {code.m && <a href={mcUrl} className={mc ? 'active' : ''} onClick={(e) => { setMc(!mc); e.preventDefault() }}>mc</a>}
          {code.s && <a href={scUrl} className={sc ? 'active' : ''} onClick={(e) => { setSc(!sc); e.preventDefault() }}>sc</a>}
          {code.t && <a href={tcUrl} className={tc ? 'active' : ''} onClick={(e) => { setTc(!tc); e.preventDefault() }}>tc</a>}
          {code.t && <a href={tpUrl} className={tp ? 'active' : ''} onClick={(e) => { setTp(!tp); e.preventDefault() }}>tp</a>}
          {code.v && <a href={vcUrl} className={vc ? 'active' : ''} onClick={(e) => { setVc(!vc); e.preventDefault() }}>vc</a>}
          {code.v && <a href={vpUrl} className={vp ? 'active' : ''} onClick={(e) => { setVp(!vp); e.preventDefault() }}>vp</a>}
          {code.y && <a href={ycUrl} className={yc ? 'active' : ''} onClick={(e) => { setYc(!yc); e.preventDefault() }}>yc</a>}
          {code.y && <a href={ypUrl} className={yp ? 'active' : ''} onClick={(e) => { setYp(!yp); e.preventDefault() }}>yp</a>}
          <i className={`material-icons ${chat ? 'active' : ''}`} onClick={() => setChat(!chat)} title='Показать, скрыть панель'>chat</i>
          <i className={`material-icons ${fullscreen ? 'active' : ''}`} onClick={onClickFullscreen} title='Полноэкранный режим (f)'>fullscreen</i>
        </div>
      </div>
      {gp && <iframe src={gpUrl} />}
      {tp && <iframe src={tpUrl} />}
      {vp && <iframe src={vpUrl} />}
      {yp && <iframe src={ypUrl} />}
    </div>
  )
}
