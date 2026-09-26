import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export function CompetitionsPage() {
  const { competitions } = useData()

  return (
    <>
      <div className="page-title">Competitions</div>
      {competitions.map((c) => (
        <Link key={c.id} to={`/app/competitions/${c.id}`} className="list-item">
          <div>
            <div className="list-item__title">{c.name}</div>
            <div className="list-item__meta">
              {c.gender === 'men' ? 'Men' : 'Women'} · {c.division} Division · {c.type}
              {c.region ? ` · ${c.region}` : ''} · {c.season}
            </div>
          </div>
          <span className="list-item__chevron">›</span>
        </Link>
      ))}
    </>
  )
}
