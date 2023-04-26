/* global fetch */
import useSWR from 'swr'

const fetcher = (url) => fetch(`//${process.env.NEXT_PUBLIC_HOST}/api/${url}`).then((r) => r.json())

function makeRequest (url) {
  const { data, error } = useSWR(url, fetcher)
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

export { makeRequest, toggleFullscreen }
