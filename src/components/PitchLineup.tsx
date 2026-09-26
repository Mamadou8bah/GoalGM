import { Link } from 'react-router-dom'
import type { LineupEntry, Team } from '../types'
import { useData } from '../context/DataContext'

function rowsByPosition(starters: LineupEntry[]) {
  const gk = starters.filter((p) => p.position === 'GK')
  const def = starters.filter((p) => p.position === 'DEF')
  const mid = starters.filter((p) => p.position === 'MID')
  const fwd = starters.filter((p) => p.position === 'FWD')
  return [gk, def, mid, fwd].filter((r) => r.length > 0)
}

function PlayerChip({ entry, color }: { entry: LineupEntry; color: string }) {
  const { getPlayer } = useData()
  const player = getPlayer(entry.playerId)
  return (
    <Link to={`/app/player/${entry.playerId}`} className="pitch-player">
      <div className="pitch-player__avatar">
        <div className="pitch-player__kit" style={{ borderColor: color }}>
          {player?.photoUrl ? (
            <img src={player.photoUrl} alt="" className="pitch-player__photo" />
          ) : (
            <span className="pitch-player__num" style={{ background: color }}>
              {entry.jerseyNumber}
            </span>
          )}
        </div>
        <span className="pitch-player__badge" style={{ background: color }}>
          {entry.jerseyNumber}
        </span>
      </div>
      <div className="pitch-player__name">{player?.shortName ?? '—'}</div>
    </Link>
  )
}

function TeamHalf({
  team,
  lineups,
  formation,
  fromTop,
}: {
  team: Team
  lineups: LineupEntry[]
  formation?: string
  /** Away sits top → GK first; home sits bottom → reverse so GK at bottom */
  fromTop: boolean
}) {
  const starters = lineups.filter((l) => l.teamId === team.id && l.isStarter)
  const rows = rowsByPosition(starters)
  const ordered = fromTop ? rows : [...rows].reverse()

  return (
    <div className={`pitch__half${fromTop ? ' pitch__half--away' : ' pitch__half--home'}`}>
      <div className="pitch__label">
        {team.shortName}
        {formation ? ` · ${formation}` : ''}
      </div>
      <div className="pitch__rows">
        {ordered.map((row, i) => (
          <div key={i} className="pitch__row">
            {row.map((entry) => (
              <PlayerChip key={entry.playerId} entry={entry} color={team.color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Single shared pitch: away (top) + home (bottom) */
export function PitchLineup({
  home,
  away,
  lineups,
  homeFormation,
  awayFormation,
}: {
  home: Team
  away: Team
  lineups: LineupEntry[]
  homeFormation?: string
  awayFormation?: string
}) {
  return (
    <div className="pitch pitch--shared">
      <div className="pitch__markings" aria-hidden>
        <div className="pitch__box pitch__box--top" />
        <div className="pitch__circle" />
        <div className="pitch__half-line" />
        <div className="pitch__box pitch__box--bottom" />
      </div>
      <TeamHalf team={away} lineups={lineups} formation={awayFormation} fromTop />
      <TeamHalf team={home} lineups={lineups} formation={homeFormation} fromTop={false} />
    </div>
  )
}

export function BenchList({ team, lineups }: { team: Team; lineups: LineupEntry[] }) {
  const { getPlayer } = useData()
  const bench = lineups.filter((l) => l.teamId === team.id && !l.isStarter)
  if (!bench.length) return null
  return (
    <div className="bench-list">
      <div className="panel__title">{team.shortName} substitutes</div>
      {bench.map((entry) => {
        const p = getPlayer(entry.playerId)
        return (
          <Link key={entry.playerId} to={`/app/player/${entry.playerId}`} className="bench-row">
            {p?.photoUrl ? (
              <img src={p.photoUrl} alt="" className="bench-row__photo" />
            ) : (
              <span className="bench-row__num">{entry.jerseyNumber}</span>
            )}
            <span className="bench-row__num">{entry.jerseyNumber}</span>
            <span>{p?.name ?? '—'}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--gm-text-muted)', fontSize: '0.7rem' }}>
              {entry.position}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
