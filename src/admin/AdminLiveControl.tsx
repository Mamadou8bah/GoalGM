import { Link, useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import type { EventType } from '../types'

export function AdminLiveList() {
  const { matches, getTeam } = useData()
  const actionable = matches.filter(
    (m) =>
      m.status === 'live' ||
      m.status === 'ht' ||
      m.status === 'scheduled' ||
      m.kickoff.startsWith('2026-09-26'),
  )

  return (
    <div className="admin-page">
      <h1>Live match control</h1>
      <p className="admin-lead">One-tap scoring for phone reporters. Changes appear instantly in the fan app.</p>
      <div className="admin-card-list">
        {actionable.map((m) => (
          <Link key={m.id} to={`/admin/live/${m.id}`} className="admin-match-card">
            <div>
              <strong>
                {getTeam(m.homeTeamId)?.shortName} vs {getTeam(m.awayTeamId)?.shortName}
              </strong>
              <div className="admin-muted">
                {m.status.toUpperCase()}
                {m.homeScore != null ? ` · ${m.homeScore}–${m.awayScore}` : ''}
                {m.minute != null ? ` · ${m.minute}'` : ''}
              </div>
            </div>
            <span>Open</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AdminLiveControl() {
  const { id } = useParams()
  const {
    getMatch,
    getTeam,
    getPlayer,
    players,
    setMatchStatus,
    addMatchEvent,
    undoLastEvent,
    updateMatch,
    logAudit,
  } = useData()
  const match = id ? getMatch(id) : undefined

  if (!match) {
    return (
      <div className="admin-page">
        <p>Match not found.</p>
        <Link to="/admin/live">Back</Link>
      </div>
    )
  }

  const home = getTeam(match.homeTeamId)!
  const away = getTeam(match.awayTeamId)!
  const homePlayers = players.filter((p) => p.teamId === home.id)
  const awayPlayers = players.filter((p) => p.teamId === away.id)

  const addEvent = (teamId: string, type: EventType) => {
    const squad = teamId === home.id ? homePlayers : awayPlayers
    const player = squad[0]
    if (!player) return
    const minute = match.minute ?? (match.status === 'ht' ? 45 : 1)
    addMatchEvent(match.id, {
      type,
      minute,
      teamId,
      playerId: player.id,
      assistPlayerId: type === 'goal' ? squad[1]?.id : undefined,
    })
  }

  const correctScore = () => {
    const reason = window.prompt('Reason for post-FT score change (required & logged):')
    if (!reason) return
    const hs = Number(window.prompt('Home score', String(match.homeScore ?? 0)))
    const as = Number(window.prompt('Away score', String(match.awayScore ?? 0)))
    if (Number.isNaN(hs) || Number.isNaN(as)) return
    updateMatch(match.id, { homeScore: hs, awayScore: as }, `Score correction: ${reason}`)
    logAudit('SCORE_CORRECTION', `Match ${match.id}`, reason)
  }

  return (
    <div className="admin-page admin-live">
      <Link to="/admin/live" className="admin-back-inline">
        ← All live matches
      </Link>
      <h1>
        {home.shortName} {match.homeScore ?? 0}–{match.awayScore ?? 0} {away.shortName}
      </h1>
      <p className="admin-lead">
        Status: <strong>{match.status.toUpperCase()}</strong>
        {match.minute != null ? ` · ${match.minute}'` : ''} · {match.stadium}
      </p>

      <div className="live-actions">
        <button type="button" className="live-btn" onClick={() => setMatchStatus(match.id, 'live', 1)}>
          Start
        </button>
        <button type="button" className="live-btn" onClick={() => setMatchStatus(match.id, 'ht')}>
          Half-time
        </button>
        <button type="button" className="live-btn" onClick={() => setMatchStatus(match.id, 'live', 46)}>
          2nd half
        </button>
        <button type="button" className="live-btn live-btn--ft" onClick={() => setMatchStatus(match.id, 'ft')}>
          Full-time
        </button>
      </div>

      <div className="live-split">
        <div>
          <h3>{home.shortName}</h3>
          <div className="live-grid">
            <button type="button" className="live-btn live-btn--goal" onClick={() => addEvent(home.id, 'goal')}>
              Goal
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(home.id, 'yellow')}>
              Yellow
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(home.id, 'red')}>
              Red
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(home.id, 'sub')}>
              Sub
            </button>
          </div>
        </div>
        <div>
          <h3>{away.shortName}</h3>
          <div className="live-grid">
            <button type="button" className="live-btn live-btn--goal" onClick={() => addEvent(away.id, 'goal')}>
              Goal
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(away.id, 'yellow')}>
              Yellow
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(away.id, 'red')}>
              Red
            </button>
            <button type="button" className="live-btn" onClick={() => addEvent(away.id, 'sub')}>
              Sub
            </button>
          </div>
        </div>
      </div>

      <div className="live-actions">
        <button type="button" className="live-btn" onClick={() => undoLastEvent(match.id)}>
          Undo last event
        </button>
        {match.status === 'ft' && (
          <button type="button" className="live-btn live-btn--warn" onClick={correctScore}>
            Correct score (logged)
          </button>
        )}
        <a className="live-btn" href={`/app/match/${match.id}`} target="_blank" rel="noreferrer">
          Preview fan view
        </a>
      </div>

      <h2>Event timeline</h2>
      <ul className="admin-audit">
        {[...match.events].reverse().map((e) => (
          <li key={e.id}>
            <strong>
              {e.minute}&apos; {e.type}
            </strong>{' '}
            · {getPlayer(e.playerId)?.shortName} ({getTeam(e.teamId)?.shortName})
          </li>
        ))}
      </ul>
    </div>
  )
}
