import { useApp } from '../context/AppContext'
import type { NotificationPrefs } from '../types'

const labels: { key: keyof NotificationPrefs; label: string; hint: string }[] = [
  { key: 'matchStart', label: 'Match kick-off', hint: 'When your teams start' },
  { key: 'goals', label: 'Goals', hint: 'Every goal for followed teams' },
  { key: 'halfTime', label: 'Half-time', hint: 'Score at the break' },
  { key: 'fullTime', label: 'Full-time', hint: 'Final whistle results' },
  { key: 'lineups', label: 'Lineups released', hint: 'Starting XI confirmed' },
  { key: 'breakingNews', label: 'Breaking news', hint: 'Transfers & league alerts' },
]

export function NotificationsPage() {
  const { notificationPrefs, setNotificationPrefs, favouriteTeamIds } = useApp()

  const toggle = (key: keyof NotificationPrefs) => {
    setNotificationPrefs({ ...notificationPrefs, [key]: !notificationPrefs[key] })
  }

  return (
    <>
      <div className="page-title">Notifications</div>
      <div className="panel__title">
        Alerts for {favouriteTeamIds.length} favourite team{favouriteTeamIds.length === 1 ? '' : 's'}
      </div>
      <p style={{ padding: '8px 12px', fontSize: '0.8rem', color: 'var(--gm-text-muted)', margin: 0 }}>
        Prototype: toggles are saved on this device. Push delivery will use FCM in production.
      </p>
      {labels.map((row) => (
        <div key={row.key} className="settings-row">
          <div>
            <div>{row.label}</div>
            <div className="list-item__meta">{row.hint}</div>
          </div>
          <button
            type="button"
            className={`toggle${notificationPrefs[row.key] ? ' toggle--on' : ''}`}
            onClick={() => toggle(row.key)}
            aria-label={row.label}
          />
        </div>
      ))}
    </>
  )
}
