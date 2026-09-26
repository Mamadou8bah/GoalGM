import type { Team } from '../types'

export function Crest({ team, size }: { team: Team; size?: number }) {
  const dim = size ?? 22
  if (team.logoUrl) {
    return (
      <img
        className="crest crest--img"
        src={team.logoUrl}
        alt=""
        width={dim}
        height={dim}
        style={{ width: dim, height: dim }}
      />
    )
  }
  const style = {
    width: dim,
    height: dim,
    fontSize: dim * 0.28,
    background: team.color,
  }
  return (
    <span className="crest" style={style} aria-hidden>
      {team.shortName.slice(0, 3)}
    </span>
  )
}
