import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export function NewsPage() {
  const { news } = useData()
  const sorted = [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const featured = sorted.find((n) => n.featured) ?? sorted[0]
  const rest = sorted.filter((n) => n.id !== featured?.id)

  return (
    <>
      <div className="page-title">News</div>
      {featured && (
        <Link
          to={`/app/news/${featured.id}`}
          className="news-featured"
          style={
            featured.imageUrl
              ? {
                  backgroundImage: `linear-gradient(to top, rgba(8,20,95,0.92), rgba(8,20,95,0.35)), url(${featured.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          <div className="news-featured__label">Breaking / Featured</div>
          <h2>{featured.title}</h2>
          <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
            {featured.category} · {featured.author}
          </div>
        </Link>
      )}
      {rest.map((article) => (
        <Link key={article.id} to={`/app/news/${article.id}`} className="news-card">
          <div
            className="news-card__img"
            style={
              article.imageUrl
                ? {
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.45), transparent), url(${article.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: article.imageColor,
                  }
                : { background: article.imageColor }
            }
          >
            <span className="news-card__cat">{article.category}</span>
          </div>
          <div className="news-card__body">
            <h2 className="news-card__title">{article.title}</h2>
            <div className="news-card__meta">
              {article.author} ·{' '}
              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
