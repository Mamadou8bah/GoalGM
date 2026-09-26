import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { LeagueTable } from '../components/LeagueTable'
import { MatchRow } from '../components/MatchRow'
import { useData } from '../context/DataContext'
import { cardLeaders, topAssists, topScorers } from '../data/seed'
import { useLiveMatches } from '../hooks/useLiveMatches'

const TABS = ['Fixtures', 'Table', 'Scorers', 'Assists', 'Cards'] as const

export function CompetitionDetailPage() {
  const { id } = useParams()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Fixtures')
  const allMatches = useLiveMatches()
  const { getCompetition, getTeam, getPlayer, standings } = useData()
  const comp = id ? getCompetition(id) : undefined

  const fixtures = useMemo(() => {
    if (!id) return []
    return allMatches
      .filter((m) => m.competitionId === id)
      .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
  }, [allMatches, id])

  if (!comp) {
    return <div className="empty-state">Competition not found.</div>
  }

  const table = standings[comp.id] ?? []
  const scorers = topScorers(comp.id, allMatches)
  const assists = topAssists(comp.id, allMatches)
  const yellows = cardLeaders(comp.id, 'yellow', allMatches)
  const reds = cardLeaders(comp.id, 'red', allMatches)

  return (
    <>
      <div className="page-title">{comp.name}</div>
      <div className="list-item__meta" style={{ padding: '0 12px 8px', background: 'var(--gm-surface)' }}>
        {comp.gender === 'men' ? 'Men' : 'Women'} · {comp.division} Division · {comp.type}
        {comp.region ? ` · ${comp.region}` : ''} · {comp.season} · Tie-break: {comp.tieBreak}
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

      {tab === 'Fixtures' && (
        <div className="league-group__list">
          {fixtures.map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      )}

      {tab === 'Table' && <LeagueTable rows={table} competition={comp} />}

      {tab === 'Scorers' && (
        <>
          {scorers.length === 0 && <div className="empty-state">No goals recorded yet.</div>}
          {scorers.map((s, i) => {
            const player = getPlayer(s.playerId)
            const team = getTeam(s.teamId)
            if (!player || !team) return null
            return (
              <Link key={s.playerId} to={`/app/player/${s.playerId}`} className="scorer-row">
                <span className="scorer-row__rank">{i + 1}</span>
                <Crest team={team} size={22} />
                <div>
                  <div style={{ fontWeight: 600 }}>{player.name}</div>
                  <div className="list-item__meta">{team.shortName}</div>
                </div>
                <span className="scorer-row__goals">{s.goals}</span>
              </Link>
            )
          })}
        </>
      )}

      {tab === 'Assists' && (
        <>
          {assists.length === 0 && <div className="empty-state">No assists recorded yet.</div>}
          {assists.map((s, i) => {
            const player = getPlayer(s.playerId)
            const team = getTeam(s.teamId)
            if (!player || !team) return null
            return (
              <Link key={s.playerId} to={`/app/player/${s.playerId}`} className="scorer-row">
                <span className="scorer-row__rank">{i + 1}</span>
                <Crest team={team} size={22} />
                <div>
                  <div style={{ fontWeight: 600 }}>{player.name}</div>
                  <div className="list-item__meta">{team.shortName}</div>
                </div>
                <span className="scorer-row__goals">{s.assists}</span>
              </Link>
            )
          })}
        </>
      )}

      {tab === 'Cards' && (
        <>
          <div className="panel__title">Yellow cards</div>
          {yellows.map((s, i) => (
            <div key={s.playerId} className="scorer-row">
              <span className="scorer-row__rank">{i + 1}</span>
              <div style={{ fontWeight: 600 }}>{getPlayer(s.playerId)?.name}</div>
              <span className="scorer-row__goals">{s.count}</span>
            </div>
          ))}
          <div className="panel__title">Red cards</div>
          {reds.length === 0 && <div className="empty-state">No red cards.</div>}
          {reds.map((s, i) => (
            <div key={s.playerId} className="scorer-row">
              <span className="scorer-row__rank">{i + 1}</span>
              <div style={{ fontWeight: 600 }}>{getPlayer(s.playerId)?.name}</div>
              <span className="scorer-row__goals">{s.count}</span>
            </div>
          ))}
        </>
      )}

      <div style={{ padding: 12 }}>
        <Link to="/app/competitions" style={{ fontSize: '0.8rem', color: 'var(--gm-blue)', fontWeight: 600 }}>
          ← All competitions
        </Link>
      </div>
    </>
  )
}
