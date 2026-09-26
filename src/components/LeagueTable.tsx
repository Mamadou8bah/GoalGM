import { Link } from 'react-router-dom'
import type { Competition, StandingRow } from '../types'
import { Crest } from './Crest'
import { useData } from '../context/DataContext'

interface LeagueTableProps {
  rows: StandingRow[]
  highlightIds?: string[]
  competition?: Competition
}

export function LeagueTable({ rows, highlightIds = [], competition }: LeagueTableProps) {
  const { getTeam } = useData()
  const zones = competition?.zones
  const n = rows.length

  const zoneClass = (index: number) => {
    if (!zones) return ''
    if (zones.champions && index < zones.champions) return 'zone-champ'
    if (zones.promotion && index < (zones.champions ?? 0) + zones.promotion) return 'zone-promo'
    if (zones.relegation && index >= n - zones.relegation) return 'zone-rel'
    return ''
  }

  return (
    <>
      {zones && (
        <div className="zone-legend">
          {zones.champions != null && <span className="zone-pill zone-pill--champ">Champions</span>}
          {zones.promotion != null && <span className="zone-pill zone-pill--promo">Promotion</span>}
          {zones.relegation != null && <span className="zone-pill zone-pill--rel">Relegation</span>}
        </div>
      )}
      <div className="table-wrap">
        <table className="league-table">
          <thead>
            <tr>
              <th className="num">#</th>
              <th>Club</th>
              <th className="num">P</th>
              <th className="num">W</th>
              <th className="num">D</th>
              <th className="num">L</th>
              <th className="num">GD</th>
              <th className="num">Pts</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const team = getTeam(row.teamId)
              if (!team) return null
              const hl = highlightIds.includes(row.teamId)
              return (
                <tr
                  key={row.teamId}
                  className={`${hl ? 'highlight' : ''} ${zoneClass(i)}`.trim()}
                >
                  <td className="num">{i + 1}</td>
                  <td>
                    <Link to={`/app/team/${team.id}`} className="league-table__team">
                      <Crest team={team} size={18} />
                      {team.shortName}
                    </Link>
                  </td>
                  <td className="num">{row.played}</td>
                  <td className="num">{row.won}</td>
                  <td className="num">{row.drawn}</td>
                  <td className="num">{row.lost}</td>
                  <td className="num">{row.gd}</td>
                  <td className="num">
                    <strong>{row.pts}</strong>
                  </td>
                  <td>
                    <div className="form-dots">
                      {row.form.slice(-5).map((f, idx) => (
                        <span key={idx} className={`form-dot form-dot--${f}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
