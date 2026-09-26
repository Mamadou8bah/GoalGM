import { useNavigate } from 'react-router-dom'
import type { Match } from '../types'
import { Crest } from './Crest'
import { useData } from '../context/DataContext'
import { goalScorers, isLiveStatus, scoreText, statusLabel } from '../utils/match'

export function MatchRow({ match }: { match: Match }) {
  const navigate = useNavigate()
  const { getTeam } = useData()
  const home = getTeam(match.homeTeamId)
  const away = getTeam(match.awayTeamId)
  if (!home || !away) return null
  const score = scoreText(match)
  const live = isLiveStatus(match.status)
  const homeScorers = goalScorers(match.events, match.homeTeamId)
  const awayScorers = goalScorers(match.events, match.awayTeamId)

  return (
    <button
      type="button"
      className="match-row"
      onClick={() => navigate(`/app/match/${match.id}`)}
    >
      <div className="match-row__side match-row__side--home">
        <div style={{ minWidth: 0 }}>
          <div className="match-row__name">{home.shortName}</div>
          {homeScorers && <div className="match-row__scorers">{homeScorers}</div>}
        </div>
        <Crest team={home} />
      </div>

      <div className="match-row__centre">
        {score ? (
          <span className="match-row__score">{score}</span>
        ) : (
          <span className="match-row__kickoff">{statusLabel(match)}</span>
        )}
        {score && (
          <span className={`match-row__status${live ? ' match-row__status--live' : ''}`}>
            {match.status === 'live' ? 'LIVE' : statusLabel(match)}
            {match.status === 'live' && match.minute != null ? ` ${match.minute}'` : ''}
          </span>
        )}
        {match.streamUrl && live && <span className="match-row__watch">Watch</span>}
      </div>

      <div className="match-row__side match-row__side--away">
        <Crest team={away} />
        <div style={{ minWidth: 0 }}>
          <div className="match-row__name">{away.shortName}</div>
          {awayScorers && <div className="match-row__scorers">{awayScorers}</div>}
        </div>
      </div>
    </button>
  )
}
