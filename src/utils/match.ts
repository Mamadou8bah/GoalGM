import type { Match, MatchEvent, MatchStatus } from '../types'
import { getPlayer } from '../data/seed'

export function formatKickoff(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Banjul',
  })
}

export function formatMatchDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Africa/Banjul',
  })
}

export function statusLabel(match: Match): string {
  switch (match.status) {
    case 'live':
      return match.minute != null ? `${match.minute}'` : 'LIVE'
    case 'ht':
      return 'HT'
    case 'ft':
      return 'FT'
    case 'postponed':
      return 'PP'
    case 'cancelled':
      return 'CANC'
    default:
      return formatKickoff(match.kickoff)
  }
}

export function isLiveStatus(status: MatchStatus) {
  return status === 'live' || status === 'ht'
}

export function scoreText(match: Match) {
  if (match.homeScore == null || match.awayScore == null) return null
  return `${match.homeScore} – ${match.awayScore}`
}

export function goalScorers(events: MatchEvent[], teamId: string) {
  return events
    .filter(
      (e) =>
        e.teamId === teamId && (e.type === 'goal' || e.type === 'penalty' || e.type === 'own_goal'),
    )
    .map((e) => {
      const p = getPlayer(e.playerId)
      const name = p?.shortName ?? 'Unknown'
      const suffix = e.type === 'own_goal' ? ' (OG)' : e.type === 'penalty' ? ' (P)' : ''
      return `${name}${suffix} ${e.minute}'`
    })
    .join(', ')
}

export function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function buildDateRange(center: string, before = 3, after = 3) {
  const dates: string[] = []
  for (let i = -before; i <= after; i++) {
    dates.push(addDays(center, i))
  }
  return dates
}

export function weekdayShort(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' })
}

export function dayNum(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').getDate()
}
