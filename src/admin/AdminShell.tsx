import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const nav = [
  { to: '/admin', end: true, label: 'Dashboard' },
  { to: '/admin/live', label: 'Live control' },
  { to: '/admin/fixtures', label: 'Fixtures' },
  { to: '/admin/lineups', label: 'Lineups' },
  { to: '/admin/competitions', label: 'Competitions' },
  { to: '/admin/teams', label: 'Teams' },
  { to: '/admin/players', label: 'Players' },
  { to: '/admin/news', label: 'News' },
  { to: '/admin/streams', label: 'Streams' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/audit', label: 'Audit log' },
]

export function AdminShell() {
  const { adminUser, logoutAdmin } = useData()

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <span className="top-bar__mark">GM</span>
          <div>
            <strong>Goal GM Admin</strong>
            <div className="admin__role">{adminUser.name}</div>
          </div>
        </div>
        <nav className="admin__nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin__link${isActive ? ' admin__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin__footer">
          <a href="/app" className="admin__link">
            ← Fan app
          </a>
          <button type="button" className="admin__link" onClick={logoutAdmin}>
            Sign out
          </button>
        </div>
      </aside>
      <div className="admin__main">
        <Outlet />
      </div>
    </div>
  )
}
