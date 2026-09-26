import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { useData } from '../context/DataContext'

export function SearchPage() {
  const [q, setQ] = useState('')
  const { teams, players, competitions, news } = useData()
  const query = q.trim().toLowerCase()

  const results = useMemo(() => {
    if (!query) return { teams: [], players: [], competitions: [], news: [] }
    return {
      teams: teams.filter(
        (t) =>
          t.name.toLowerCase().includes(query) || t.shortName.toLowerCase().includes(query),
      ),
      players: players.filter((p) => p.name.toLowerCase().includes(query)).slice(0, 12),
      competitions: competitions.filter((c) => c.name.toLowerCase().includes(query)),
      news: news.filter(
        (n) =>
          n.title.toLowerCase().includes(query) || n.category.toLowerCase().includes(query),
      ),
    }
  }, [query, teams, players, competitions, news])

  return (
    <>
      <div className="page-title">Search</div>
      <div className="search-box">
        <input
          type="search"
          placeholder="Teams, players, leagues, news…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
        />
      </div>

      {!query && <div className="empty-state">Start typing to search Goal GM.</div>}

      {query && (
        <>
          {results.teams.length > 0 && <div className="panel__title">Teams</div>}
          {results.teams.map((t) => (
            <Link key={t.id} to={`/app/team/${t.id}`} className="list-item">
              <Crest team={t} />
              <div>
                <div className="list-item__title">{t.name}</div>
                <div className="list-item__meta">{t.city}</div>
              </div>
              <span className="list-item__chevron">›</span>
            </Link>
          ))}

          {results.competitions.length > 0 && <div className="panel__title">Leagues</div>}
          {results.competitions.map((c) => (
            <Link key={c.id} to={`/app/competitions/${c.id}`} className="list-item">
              <div>
                <div className="list-item__title">{c.name}</div>
                <div className="list-item__meta">{c.season}</div>
              </div>
              <span className="list-item__chevron">›</span>
            </Link>
          ))}

          {results.players.length > 0 && <div className="panel__title">Players</div>}
          {results.players.map((p) => {
            const team = teams.find((t) => t.id === p.teamId)!
            return (
              <Link key={p.id} to={`/app/player/${p.id}`} className="list-item">
                <div>
                  <div className="list-item__title">{p.name}</div>
                  <div className="list-item__meta">
                    {team.shortName} · {p.position} · #{p.jerseyNumber}
                  </div>
                </div>
                <span className="list-item__chevron">›</span>
              </Link>
            )
          })}

          {results.news.length > 0 && <div className="panel__title">News</div>}
          {results.news.map((n) => (
            <Link key={n.id} to={`/app/news/${n.id}`} className="list-item">
              <div>
                <div className="list-item__title">{n.title}</div>
                <div className="list-item__meta">{n.category}</div>
              </div>
              <span className="list-item__chevron">›</span>
            </Link>
          ))}

          {results.teams.length === 0 &&
            results.players.length === 0 &&
            results.competitions.length === 0 &&
            results.news.length === 0 && (
              <div className="empty-state">No results for “{q}”.</div>
            )}
        </>
      )}
    </>
  )
}
