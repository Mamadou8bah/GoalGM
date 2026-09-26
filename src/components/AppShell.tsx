import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

const hideBottomNav = /^\/app\/match\//
const hideTopBar = /^\/app\/match\/|^\/app\/news\/[^/]+$/

export function AppShell() {
  const { pathname } = useLocation()
  const noBottom = hideBottomNav.test(pathname)
  const noTop = hideTopBar.test(pathname)

  return (
    <div className="app-viewport">
      <div className="phone-shell">
        {!noTop && <TopBar />}
        <main className="app-main">
          <Outlet />
        </main>
        {!noBottom && <BottomNav />}
      </div>
    </div>
  )
}
