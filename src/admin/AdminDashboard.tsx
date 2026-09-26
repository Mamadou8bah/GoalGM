import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export function AdminDashboard() {
  const { matches, auditLog, news, getTeam, adminUser } = useData()
  const live = matches.filter((m) => m.status === 'live' || m.status === 'ht')
  const today = matches.filter((m) => m.kickoff.startsWith('2026-09-26'))

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <p className="admin-lead">
        Welcome, {adminUser?.name}. Live score entry is phone-friendly — open Live control on match
        day.
      </p>
      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{live.length}</strong>
          <span>Live now</span>
        </div>
        <div className="admin-stat">
          <strong>{today.length}</strong>
          <span>Today&apos;s fixtures</span>
        </div>
        <div className="admin-stat">
          <strong>{news.length}</strong>
          <span>News articles</span>
        </div>
      </div>

      <h2>Live matches</h2>
      {live.length === 0 && <p className="admin-muted">No live matches.</p>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Score</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {live.map((m) => (
              <tr key={m.id}>
                <td>
                  {getTeam(m.homeTeamId)?.shortName} vs {getTeam(m.awayTeamId)?.shortName}
                </td>
                <td>
                  {m.homeScore}–{m.awayScore}
                </td>
                <td>
                  {m.status.toUpperCase()}
                  {m.minute != null ? ` ${m.minute}'` : ''}
                </td>
                <td>
                  <Link to={`/admin/live/${m.id}`} className="admin-action">
                    Control
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Recent audit activity</h2>
      <ul className="admin-audit">
        {auditLog.slice(0, 6).map((a) => (
          <li key={a.id}>
            <strong>{a.action}</strong> · {a.detail}
            <span>
              {a.staffName} · {new Date(a.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
