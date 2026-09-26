import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { LeagueTable } from '../components/LeagueTable'
import { BenchList, PitchLineup } from '../components/PitchLineup'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'
import { useLiveMatches } from '../hooks/useLiveMatches'
import type { Match, MatchEvent } from '../types'
import { formatMatchDate, isLiveStatus, scoreText, statusLabel } from '../utils/match'

const TABS = ['Summary', 'Lineups', 'Stats', 'H2H', 'Table', 'Watch'] as const
type Tab = (typeof TABS)[number]

function eventLabel(e: MatchEvent) {
  switch (e.type) {
    case 'goal':
    case 'penalty':
    case 'own_goal':
      return 'Goal'
    case 'yellow':
      return 'YC'
    case 'red':
      return 'RC'
    case 'sub':
      return 'Sub'
    case 'assist':
      return 'Ast'
    default:
      return e.type
  }
}

function eventClass(e: MatchEvent) {
  if (e.type === 'goal' || e.type === 'penalty' || e.type === 'own_goal') return 'event-badge--goal'
  if (e.type === 'yellow') return 'event-badge--yellow'
  if (e.type === 'red') return 'event-badge--red'
  if (e.type === 'sub') return 'event-badge--sub'
  return ''
}

export function MatchDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const liveMatches = useLiveMatches()
  const { isFavourite, toggleFavourite } = useApp()
  const { getTeam, getPlayer, getCompetition, getMatch, standings, channelUrl } = useData()
  const [tab, setTab] = useState<Tab>('Summary')

  const match = liveMatches.find((m) => m.id === id) ?? getMatch(id ?? '')

  const h2h = useMemo(() => {
    if (!match) return { history: [] as Match[], homeWins: 0, awayWins: 0, draws: 0 }
    const homeId = match.homeTeamId
    const awayId = match.awayTeamId
    const history = liveMatches.filter(
      (m) =>
        m.id !== match.id &&
        m.status === 'ft' &&
        ((m.homeTeamId === homeId && m.awayTeamId === awayId) ||
          (m.homeTeamId === awayId && m.awayTeamId === homeId)),
    )
    let homeWins = 0
    let awayWins = 0
    let draws = 0
    for (const m of history) {
      if (m.homeScore == null || m.awayScore == null) continue
      const homeIsHome = m.homeTeamId === homeId
      const hs = homeIsHome ? m.homeScore : m.awayScore
      const as = homeIsHome ? m.awayScore : m.homeScore
      if (hs > as) homeWins++
      else if (hs < as) awayWins++
      else draws++
    }
    return { history, homeWins, awayWins, draws }
  }, [match, liveMatches])

  if (!match) {
    return (
      <div className="empty-state">
        Match not found.
        <br />
        <button type="button" className="btn btn--primary" style={{ marginTop: 16 }} onClick={() => navigate('/app')}>
          Back to matches
        </button>
      </div>
    )
  }

  const home = getTeam(match.homeTeamId)
  const away = getTeam(match.awayTeamId)
  const comp = getCompetition(match.competitionId)
  if (!home || !away || !comp) {
    return <div className="empty-state">Match data incomplete.</div>
  }
  const score = scoreText(match)
  const live = isLiveStatus(match.status)
  const table = standings[match.competitionId] ?? []
  const watchUrl = match.streamUrl || (match.status === 'ft' ? match.replayUrl : undefined) || undefined

  return (
    <>
      <div className="match-header">
        <div className="match-header__top">
          <button type="button" className="match-header__back" onClick={() => navigate(-1)} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="match-header__comp">
            {comp.shortName} · R{match.round}
          </span>
          <button
            type="button"
            className={`fav-btn${isFavourite(home.id) ? ' fav-btn--on' : ''}`}
            style={{ marginLeft: 'auto' }}
            onClick={() => toggleFavourite(home.id)}
            aria-label="Favourite home team"
          >
            ★
          </button>
        </div>

        <div className="match-header__scoreboard">
          <Link to={`/app/team/${home.id}`} className="match-header__team">
            <Crest team={home} size={44} />
            <span className="match-header__team-name">{home.shortName}</span>
          </Link>
          <div className="match-header__centre">
            <div className="match-header__score">{score ?? 'v'}</div>
            <div className={`match-header__status${live ? ' match-header__status--live' : ''}`}>
              {match.status === 'scheduled'
                ? `${formatMatchDate(match.kickoff)} · ${statusLabel(match)}`
                : statusLabel(match)}
            </div>
          </div>
          <Link to={`/app/team/${away.id}`} className="match-header__team">
            <Crest team={away} size={44} />
            <span className="match-header__team-name">{away.shortName}</span>
          </Link>
        </div>
      </div>

      <div className="match-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={`match-tab${tab === t ? ' match-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Summary' && (
        <div className="panel">
          <div className="panel__title">Match events</div>
          {match.events.length === 0 && (
            <div className="empty-state" style={{ padding: 24 }}>
              No events recorded yet.
            </div>
          )}
          {[...match.events]
            .sort((a, b) => a.minute - b.minute)
            .map((e) => {
              const player = getPlayer(e.playerId)
              const isHome = e.teamId === home.id
              return (
                <div key={e.id} className="timeline-item">
                  <div className="timeline-item__min">{e.minute}'</div>
                  <div
                    className={`timeline-item__event${isHome ? '' : ' timeline-item__event--away'}`}
                    style={{ gridColumn: isHome ? '2' : '2' }}
                  >
                    {isHome ? (
                      <>
                        <span className={`event-badge ${eventClass(e)}`}>{eventLabel(e)}</span>
                        <span>{player?.shortName}</span>
                      </>
                    ) : (
                      <>
                        <span>{player?.shortName}</span>
                        <span className={`event-badge ${eventClass(e)}`}>{eventLabel(e)}</span>
                      </>
                    )}
                  </div>
                  <div />
                </div>
              )
            })}
          <div className="panel__title" style={{ marginTop: 8 }}>
            Venue
          </div>
          <div style={{ padding: '12px', fontSize: '0.85rem' }}>
            {match.stadium}
            {match.referee ? ` · Ref: ${match.referee}` : ''}
          </div>
        </div>
      )}

      {tab === 'Lineups' && (
        <>
          {match.lineups.length === 0 ? (
            <div className="empty-state">Lineups not released yet.</div>
          ) : (
            <>
              <PitchLineup
                home={home}
                away={away}
                lineups={match.lineups}
                homeFormation={match.homeFormation}
                awayFormation={match.awayFormation}
              />
              <BenchList team={home} lineups={match.lineups} />
              <BenchList team={away} lineups={match.lineups} />
              <div className="panel__title">Coaches</div>
              <div style={{ padding: 12, background: 'var(--gm-surface)', fontSize: '0.85rem' }}>
                {home.shortName}: {home.coach}
                <br />
                {away.shortName}: {away.coach}
              </div>
            </>
          )}
        </>
      )}

      {tab === 'Stats' && (
        <div className="panel">
          {!match.stats ? (
            <div className="empty-state">Stats unavailable.</div>
          ) : (
            (
              [
                ['Possession %', match.stats.possession],
                ['Shots', match.stats.shots],
                ['Shots on target', match.stats.shotsOnTarget],
                ['Corners', match.stats.corners],
                ['Fouls', match.stats.fouls],
                ['Offsides', match.stats.offsides],
              ] as [string, [number, number]][]
            ).map(([label, [h, a]]) => {
              const total = h + a || 1
              return (
                <div key={label} className="stat-row">
                  <div className="stat-row__label">{label}</div>
                  <div className="stat-row__values">
                    <span>{h}</span>
                    <span>{a}</span>
                  </div>
                  <div className="stat-row__bar">
                    <div className="stat-row__bar-home" style={{ width: `${(h / total) * 100}%` }} />
                    <div className="stat-row__bar-away" style={{ width: `${(a / total) * 100}%` }} />
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {tab === 'H2H' && (
        <>
          <div className="h2h-summary">
            <div className="h2h-summary__stat">
              <div className="h2h-summary__num">{h2h.homeWins}</div>
              <div className="h2h-summary__label">{home.shortName} wins</div>
            </div>
            <div className="h2h-summary__stat">
              <div className="h2h-summary__num">{h2h.draws}</div>
              <div className="h2h-summary__label">Draws</div>
            </div>
            <div className="h2h-summary__stat">
              <div className="h2h-summary__num">{h2h.awayWins}</div>
              <div className="h2h-summary__label">{away.shortName} wins</div>
            </div>
          </div>
          <div className="panel__title">Previous meetings</div>
          {h2h.history.length === 0 && <div className="empty-state">No previous meetings in archive.</div>}
          {h2h.history.map((m) => {
            const h = getTeam(m.homeTeamId)
            const a = getTeam(m.awayTeamId)
            if (!h || !a) return null
            return (
              <Link key={m.id} to={`/app/match/${m.id}`} className="list-item">
                <div>
                  <div className="list-item__title">
                    {h.shortName} {m.homeScore}–{m.awayScore} {a.shortName}
                  </div>
                  <div className="list-item__meta">{formatMatchDate(m.kickoff)}</div>
                </div>
                <span className="list-item__chevron">›</span>
              </Link>
            )
          })}
        </>
      )}

      {tab === 'Table' && (
        <>
          <div className="panel__title">{comp.shortName}</div>
          <LeagueTable rows={table} highlightIds={[home.id, away.id]} competition={comp} />
        </>
      )}

      {tab === 'Watch' && (
        <div className="btn-wrap">
          {watchUrl || channelUrl ? (
            <>
              <p style={{ fontSize: '0.85rem', color: 'var(--gm-text-muted)', marginBottom: 12 }}>
                Opens the Goal GM YouTube channel / live stream in YouTube or your browser.
              </p>
              <a
                className="btn btn--primary"
                href={watchUrl || channelUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {match.status === 'ft' && match.replayUrl ? 'Watch replay' : 'Watch Live on YouTube'}
              </a>
            </>
          ) : (
            <div className="empty-state">No stream link for this match.</div>
          )}
        </div>
      )}
    </>
  )
}
