import { Link } from 'react-router-dom'

export function TopBar({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <header className="top-bar">
      <Link to="/app" className="top-bar__brand">
        <span className="top-bar__mark">GM</span>
        <span className="top-bar__name">Goal GM</span>
      </Link>
      <div className="top-bar__actions">
        {showSearch && (
          <Link to="/app/search" className="icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  )
}
