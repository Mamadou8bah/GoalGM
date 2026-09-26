import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function MorePage() {
  const { darkMode, toggleDarkMode, fanUser, language, setLanguage } = useApp()

  return (
    <>
      <div className="page-title">More</div>

      <Link to="/app/login" className="list-item">
        <div>
          <div className="list-item__title">{fanUser ? fanUser.name : 'Sign in'}</div>
          <div className="list-item__meta">
            {fanUser ? `${fanUser.provider} · sync favourites` : 'Phone, Google or Apple (optional)'}
          </div>
        </div>
      </Link>

      <Link to="/app/search" className="list-item">
        <div className="list-item__title">Search</div>
      </Link>

      <Link to="/app/archive" className="list-item">
        <div className="list-item__title">Match archive</div>
      </Link>

      <Link to="/app/notifications" className="list-item">
        <div className="list-item__title">Notification preferences</div>
      </Link>

      <div className="settings-row">
        <span>Dark mode</span>
        <button
          type="button"
          className={`toggle${darkMode ? ' toggle--on' : ''}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        />
      </div>

      <div className="settings-row">
        <span>Language</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'wo')}
          style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
        >
          <option value="en">English</option>
          <option value="wo">Wolof (demo)</option>
        </select>
      </div>

      <div className="panel__title">About Goal GM</div>
      <div style={{ padding: 12, background: 'var(--gm-surface)', fontSize: '0.85rem', lineHeight: 1.5 }}>
        Complete local football data for The Gambia — men & women, 1st–3rd divisions and zonal
        leagues. Permanent match archive, YouTube Watch Live, and staff tools for live reporting.
        <br />
        <br />
        Authority demo prototype v1.0 · Africa/Banjul timezone
      </div>

      <div className="settings-row">
        <span>Privacy policy</span>
        <span style={{ color: 'var(--gm-text-muted)', fontSize: '0.8rem' }}>Published for stores</span>
      </div>
      <div className="settings-row">
        <span>Contact</span>
        <span style={{ color: 'var(--gm-text-muted)', fontSize: '0.8rem' }}>hello@goalgm.gm</span>
      </div>
    </>
  )
}
