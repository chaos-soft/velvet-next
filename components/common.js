/* global fetch */
import useSWR from 'swr'

async function fetcher (url) {
  const r = await fetch(`//${process.env.NEXT_PUBLIC_HOST}/api/${url}`)
  if (!r.ok) {
    const error = new Error(r.statusText)
    error.status = r.status
    throw error
  }
  return r.json()
}

function Error ({ message }) {
  return (
    <main className='error wrapper'>
      <h1>Ошибочка</h1>
      <p>{message}</p>
      <p><img src='/store/images/20080915-182019.png' alt='' /></p>
    </main>
  )
}

function makeRequest (url) {
  const options = { revalidateOnFocus: false }
  const { data, error } = useSWR(url, fetcher, options)
  return { data, error }
}

function toggleFullscreen (element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

export { makeRequest, toggleFullscreen, Error }
