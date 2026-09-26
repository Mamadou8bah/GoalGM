import { useMemo, useState } from 'react'
import { useData } from '../context/DataContext'
import type { LineupEntry } from '../types'

export function AdminLineupsPage() {
  const { matches, players, getTeam, getPlayer, updateMatch } = useData()
  const candidates = matches.filter((m) => m.status !== 'ft' || m.lineups.length > 0)
  const [matchId, setMatchId] = useState(candidates.find((m) => m.id === 'm1')?.id ?? candidates[0]?.id ?? '')
  const match = matches.find((m) => m.id === matchId)

  const homeSquad = useMemo(
    () => (match ? players.filter((p) => p.teamId === match.homeTeamId) : []),
    [match, players],
  )
  const awaySquad = useMemo(
    () => (match ? players.filter((p) => p.teamId === match.awayTeamId) : []),
    [match, players],
  )

  const buildXi = (teamId: string, squad: typeof players) => {
    const starters = squad.slice(0, 11)
    const bench = squad.slice(11, 15)
    const entries: LineupEntry[] = [
      ...starters.map((p, i) => ({
        playerId: p.id,
        teamId,
        isStarter: true,
        position: p.position,
        jerseyNumber: p.jerseyNumber,
        formationSlot: i,
      })),
      ...bench.map((p, i) => ({
        playerId: p.id,
        teamId,
        isStarter: false,
        position: p.position,
        jerseyNumber: p.jerseyNumber,
        formationSlot: 100 + i,
      })),
    ]
    return entries
  }

  const applyLineups = () => {
    if (!match) return
    const lineups = [
      ...buildXi(match.homeTeamId, homeSquad),
      ...buildXi(match.awayTeamId, awaySquad),
    ]
    updateMatch(
      match.id,
      { lineups, homeFormation: '4-3-3', awayFormation: '4-4-2' },
      'Lineups published (snapshot)',
    )
    alert('Lineups saved as match snapshot — fan app updated.')
  }

  return (
    <div className="admin-page">
      <h1>Lineup builder</h1>
      <p className="admin-lead">
        Starting XI + substitutes are stored per match so later transfers never rewrite history.
      </p>
      <label className="admin-label">
        Match
        <select value={matchId} onChange={(e) => setMatchId(e.target.value)}>
          {candidates.map((m) => (
            <option key={m.id} value={m.id}>
              {getTeam(m.homeTeamId)?.shortName} vs {getTeam(m.awayTeamId)?.shortName} ({m.status})
            </option>
          ))}
        </select>
      </label>

      {match && (
        <>
          <div className="live-split">
            <div>
              <h3>{getTeam(match.homeTeamId)?.name} XI preview</h3>
              <ul className="admin-list">
                {homeSquad.slice(0, 11).map((p) => (
                  <li key={p.id}>
                    {p.jerseyNumber}. {p.name} ({p.position})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{getTeam(match.awayTeamId)?.name} XI preview</h3>
              <ul className="admin-list">
                {awaySquad.slice(0, 11).map((p) => (
                  <li key={p.id}>
                    {p.jerseyNumber}. {p.name} ({p.position})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button type="button" className="btn btn--primary" onClick={applyLineups}>
            Publish lineups to fan app
          </button>
          {match.lineups.length > 0 && (
            <p className="admin-muted" style={{ marginTop: 12 }}>
              Current snapshot: {match.lineups.filter((l) => l.isStarter).length} starters · Example:{' '}
              {getPlayer(match.lineups[0]?.playerId)?.name}
            </p>
          )}
        </>
      )}
    </div>
  )
}
