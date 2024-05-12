import Link from 'next/link'
import { useRouter } from 'next/router'

import Base from '../../components/base'
import Pagination from '../../components/pagination'
import { makeRequest } from '../../components/common'

export default function Articles () {
  const router = useRouter()
  const { page } = router.query
  const { data, error } = makeRequest(router.isReady ? `articles?page=${page || '1'}` : null)

  function getCover (object) {
    if (object.cover) {
      return object.cover
    } else if (object.images_list.length) {
      return `/store/thumbnails/${object.images_list.slice(-1)}`
    }
    return null
  }

  if (error) {
    return <Base error />
  } else if (!data) {
    return <Base title='Загрузка' />
  }

  return (
    <Base>
      <main className='articles wrapper'>
        {data.results.map((object) => (
          <article key={object.id}>
            <h2><Link href={`/articles/${object.id}`}>{object.title}</Link></h2>
            <p>{object.get_intro}</p>
            {getCover(object) &&
              <p>
                <Link href={`/articles/${object.id}`}>
                  <img src={getCover(object)} alt={object.title} />
                </Link>
              </p>}
          </article>
        ))}
        <Pagination page={page || '1'} count={data.count} />
      </main>
    </Base>
  )
}
