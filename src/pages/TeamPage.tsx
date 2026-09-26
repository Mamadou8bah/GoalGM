import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { LeagueTable } from '../components/LeagueTable'
import { MatchRow } from '../components/MatchRow'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'
import { useLiveMatches } from '../hooks/useLiveMatches'

const TABS = ['Overview', 'Fixtures', 'Squad', 'Table', 'News'] as const

export function TeamPage() {
  const { id } = useParams()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const { isFavourite, toggleFavourite } = useApp()
  const allMatches = useLiveMatches()
  const { getTeam, players, standings, news, getCompetition } = useData()
  const team = id ? getTeam(id) : undefined

  const teamMatches = useMemo(() => {
    if (!id) return []
    return allMatches
      .filter((m) => m.homeTeamId === id || m.awayTeamId === id)
      .sort((a, b) => b.kickoff.localeCompare(a.kickoff))
  }, [allMatches, id])

  if (!team) {
    return <div className="empty-state">Team not found.</div>
  }

  const squad = players.filter((p) => p.teamId === team.id)
  const compId = team.competitionIds[0]
  const table = standings[compId] ?? []
  const comp = getCompetition(compId)
  const teamNews = news.filter((n) => n.teamIds?.includes(team.id))

  return (
    <>
      <div className="team-hero">
        <Crest team={team} size={56} />
        <div style={{ flex: 1 }}>
          <h1 className="team-hero__name">{team.name}</h1>
          <div className="team-hero__meta">
            {team.city} · {team.stadium}
            <br />
            Founded {team.founded} · Coach {team.coach}
          </div>
        </div>
        <button
          type="button"
          className={`fav-btn${isFavourite(team.id) ? ' fav-btn--on' : ''}`}
          onClick={() => toggleFavourite(team.id)}
          aria-label="Toggle favourite"
        >
          ★
        </button>
      </div>

      <div className="sub-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={`sub-tab${tab === t ? ' sub-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="panel">
          <div className="panel__title">Recent results</div>
          {teamMatches.slice(0, 5).map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      )}

      {tab === 'Fixtures' && (
        <div className="league-group__list">
          {teamMatches.map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      )}

      {tab === 'Squad' && (
        <>
          {squad.map((p) => (
            <Link key={p.id} to={`/app/player/${p.id}`} className="bench-row">
              {p.photoUrl ? (
                <img src={p.photoUrl} alt="" className="bench-row__photo" />
              ) : (
                <span className="bench-row__num">{p.jerseyNumber}</span>
              )}
              <span className="bench-row__num">{p.jerseyNumber}</span>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--gm-text-muted)', fontSize: '0.7rem' }}>
                {p.position}
              </span>
            </Link>
          ))}
        </>
      )}

      {tab === 'Table' && <LeagueTable rows={table} highlightIds={[team.id]} competition={comp} />}

      {tab === 'News' && (
        <>
          {teamNews.length === 0 && <div className="empty-state">No tagged news yet.</div>}
          {teamNews.map((n) => (
            <Link key={n.id} to={`/app/news/${n.id}`} className="list-item">
              <div>
                <div className="list-item__title">{n.title}</div>
                <div className="list-item__meta">{n.category}</div>
              </div>
            </Link>
          ))}
        </>
      )}
    </>
  )
}
