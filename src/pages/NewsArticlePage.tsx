import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'

export function NewsArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { news } = useData()
  const article = news.find((n) => n.id === id)

  if (!article) {
    return <div className="empty-state">Article not found.</div>
  }

  return (
    <>
      <div className="match-header" style={{ paddingBottom: 0 }}>
        <div className="match-header__top">
          <button type="button" className="match-header__back" onClick={() => navigate(-1)} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="match-header__comp">{article.category}</span>
        </div>
      </div>
      <div
        className="article-hero"
        style={
          article.imageUrl
            ? {
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), transparent), url(${article.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: article.imageColor,
              }
            : { background: article.imageColor }
        }
      >
        <span className="news-card__cat">{article.category}</span>
      </div>
      <article className="article-content">
        <h1>{article.title}</h1>
        <div className="meta">
          {article.author} ·{' '}
          {new Date(article.publishedAt).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        {article.body.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (navigator.share) {
              void navigator.share({ title: article.title, text: article.title, url: window.location.href })
            } else {
              void navigator.clipboard.writeText(window.location.href)
              alert('Link copied')
            }
          }}
        >
          Share article
        </button>
      </article>
    </>
  )
}
