import Link from 'next/link'

export default function Pagination ({ page, count }) {
  const range = Array.from({ length: Math.ceil(count / 10) }, (_, i) => i + 1)
  page = +page

  return (
    <nav>
      <ul>
        {range.map((p) => {
          if (p === page) {
            return <li key={p}>{p}</li>
          } else {
            return <li key={p}><Link href={`?page=${p}`}>{p}</Link></li>
          }
        })}
      </ul>
    </nav>
  )
}
