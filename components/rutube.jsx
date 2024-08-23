export default function Rutube ({ code }) {
  return (
    <div className='rutube'>
      {code.map((id) => (
        <iframe
          allow='clipboard-write; autoplay'
          allowFullScreen
          key={id}
          src={`https://rutube.ru/play/embed/${id}`}
        />
      ))}
    </div>
  )
}
