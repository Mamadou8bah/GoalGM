import { NavLink } from 'react-router-dom'

const items = [
  {
    to: '/app',
    label: 'Matches',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18M5.5 5.5c2.5 2 5 3 6.5 3s4-1 6.5-3M5.5 18.5c2.5-2 5-3 6.5-3s4 1 6.5 3" />
      </svg>
    ),
  },
  {
    to: '/app/my-matches',
    label: 'Favourites',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 17.3l-5.4 3 1.4-6.1L3.5 9.9l6.2-.5L12 3.5l2.3 5.9 6.2.5-4.5 4.3 1.4 6.1z" />
      </svg>
    ),
  },
  {
    to: '/app/competitions',
    label: 'Leagues',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    ),
  },
  {
    to: '/app/news',
    label: 'News',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5h12v14H4zM16 9h4v10H8" />
      </svg>
    ),
  },
  {
    to: '/app/more',
    label: 'More',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
