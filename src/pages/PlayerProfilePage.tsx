import { Link, useParams } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { useData } from '../context/DataContext'

function ageFromDob(dob: string) {
  const birth = new Date(dob)
  const now = new Date('2026-09-26')
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return age
}

export function PlayerProfilePage() {
  const { id } = useParams()
  const { getPlayer, getTeam, matches, news } = useData()
  const player = id ? getPlayer(id) : undefined

  if (!player) {
    return <div className="empty-state">Player not found.</div>
  }

  const team = getTeam(player.teamId)!
  let goals = 0
  let assists = 0
  let yellow = 0
  let red = 0
  let apps = 0

  for (const m of matches) {
    const inLineup = m.lineups.some((l) => l.playerId === player.id)
    if (inLineup || m.events.some((e) => e.playerId === player.id)) apps += 1
    for (const e of m.events) {
      if (e.playerId === player.id) {
        if (e.type === 'goal' || e.type === 'penalty') goals++
        if (e.type === 'yellow') yellow++
        if (e.type === 'red') red++
      }
      if (e.assistPlayerId === player.id) assists++
    }
  }

  const relatedNews = news.filter((n) => n.playerIds?.includes(player.id) || n.teamIds?.includes(team.id))

  return (
    <>
      <div className="team-hero">
        {player.photoUrl ? (
          <img src={player.photoUrl} alt="" className="player-avatar" />
        ) : (
          <div
            className="crest"
            style={{
              width: 64,
              height: 64,
              fontSize: '1.2rem',
              background: team.color,
              borderRadius: '50%',
            }}
          >
            {player.jerseyNumber}
          </div>
        )}
        <div>
          <h1 className="team-hero__name">{player.name}</h1>
          <div className="team-hero__meta">
            {player.position} · #{player.jerseyNumber} · {team.name}
            <br />
            {player.nationality} · Age {ageFromDob(player.dob)} · {player.heightCm} cm ·{' '}
            {player.preferredFoot} foot
          </div>
        </div>
      </div>

      <div className="h2h-summary">
        <div className="h2h-summary__stat">
          <div className="h2h-summary__num">{apps}</div>
          <div className="h2h-summary__label">Apps</div>
        </div>
        <div className="h2h-summary__stat">
          <div className="h2h-summary__num">{goals}</div>
          <div className="h2h-summary__label">Goals</div>
        </div>
        <div className="h2h-summary__stat">
          <div className="h2h-summary__num">{assists}</div>
          <div className="h2h-summary__label">Assists</div>
        </div>
        <div className="h2h-summary__stat">
          <div className="h2h-summary__num">
            {yellow}/{red}
          </div>
          <div className="h2h-summary__label">Y/R</div>
        </div>
      </div>

      <div className="panel__title">Current club</div>
      <Link to={`/app/team/${team.id}`} className="list-item">
        <Crest team={team} />
        <div>
          <div className="list-item__title">{team.name}</div>
          <div className="list-item__meta">{team.city}</div>
        </div>
      </Link>

      <div className="panel__title">Career</div>
      {player.career.map((c, i) => {
        const t = getTeam(c.teamId)
        return (
          <div key={i} className="list-item">
            {t && <Crest team={t} />}
            <div>
              <div className="list-item__title">{t?.name ?? c.teamId}</div>
              <div className="list-item__meta">
                {c.from} – {c.to ?? 'Present'} · #{c.jerseyNumber}
              </div>
            </div>
          </div>
        )
      })}

      {relatedNews.length > 0 && (
        <>
          <div className="panel__title">News</div>
          {relatedNews.map((n) => (
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
