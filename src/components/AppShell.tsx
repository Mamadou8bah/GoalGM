import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

const hideBottomNav = /^\/app\/match\//
const hideTopBarMobile = /^\/app\/match\/|^\/app\/news\/[^/]+$/

export function AppShell() {
  const { pathname } = useLocation()
  const noBottom = hideBottomNav.test(pathname)
  const noTopMobile = hideTopBarMobile.test(pathname)

  return (
    <div className="app-viewport">
      <div className="app-shell">
        <div className={noTopMobile ? 'top-bar-slot top-bar-slot--mobile-hidden' : 'top-bar-slot'}>
          <TopBar />
        </div>
        <main className="app-main">
          <div className="app-content">
            <Outlet />
          </div>
        </main>
        {!noBottom && <BottomNav />}
      </div>
    </div>
  )
}
