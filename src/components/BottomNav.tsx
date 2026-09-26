import { NavLink } from 'react-router-dom'
import { fanNavItems } from './TopBar'

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {fanNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={'end' in item ? item.end : false}
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
