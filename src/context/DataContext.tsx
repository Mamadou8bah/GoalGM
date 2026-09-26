import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  competitions as seedCompetitions,
  initialAuditLog,
  matches as seedMatches,
  news as seedNews,
  players as seedPlayers,
  staffUsers as seedStaff,
  standingsByCompetition as seedStandings,
  teams as seedTeams,
} from '../data/seed'
import type {
  AuditLogEntry,
  Competition,
  EventType,
  Match,
  MatchEvent,
  NewsArticle,
  Player,
  StandingRow,
  StaffUser,
  Team,
} from '../types'

interface DataContextValue {
  competitions: Competition[]
  teams: Team[]
  players: Player[]
  matches: Match[]
  news: NewsArticle[]
  standings: Record<string, StandingRow[]>
  staff: StaffUser[]
  auditLog: AuditLogEntry[]
  channelUrl: string
  setChannelUrl: (url: string) => void
  adminUser: StaffUser | null
  loginAdmin: (email: string) => boolean
  logoutAdmin: () => void
  updateMatch: (id: string, patch: Partial<Match>, audit?: string) => void
  addMatchEvent: (
    matchId: string,
    event: Omit<MatchEvent, 'id'>,
    scoreDelta?: { home?: number; away?: number },
  ) => void
  undoLastEvent: (matchId: string) => void
  setMatchStatus: (matchId: string, status: Match['status'], minute?: number) => void
  setStreamUrl: (matchId: string, streamUrl: string, replayUrl?: string) => void
  upsertNews: (article: NewsArticle) => void
  upsertTeam: (team: Team) => void
  upsertPlayer: (player: Player) => void
  upsertCompetition: (comp: Competition) => void
  upsertMatch: (match: Match) => void
  upsertStaff: (user: StaffUser) => void
  logAudit: (action: string, entity: string, detail: string) => void
  getTeam: (id: string) => Team | undefined
  getPlayer: (id: string) => Player | undefined
  getCompetition: (id: string) => Competition | undefined
  getMatch: (id: string) => Match | undefined
}

const DataContext = createContext<DataContextValue | null>(null)

function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState(seedCompetitions)
  const [teams, setTeams] = useState(seedTeams)
  const [players, setPlayers] = useState(seedPlayers)
  const [matches, setMatches] = useState(() =>
    structuredClone(seedMatches) as Match[],
  )
  const [news, setNews] = useState(seedNews)
  const [standings] = useState(seedStandings)
  const [staff, setStaff] = useState(seedStaff)
  const [auditLog, setAuditLog] = useState(initialAuditLog)
  const [channelUrl, setChannelUrl] = useState('https://www.youtube.com/@GoalGM')
  const [adminUser, setAdminUser] = useState<StaffUser | null>(() => {
    try {
      const raw = sessionStorage.getItem('goal-gm-admin')
      return raw ? (JSON.parse(raw) as StaffUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    const id = window.setInterval(() => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.status !== 'live' || m.minute == null) return m
          return { ...m, minute: Math.min(m.minute + 1, 90) }
        }),
      )
    }, 45000)
    return () => window.clearInterval(id)
  }, [])

  const logAudit = useCallback(
    (action: string, entity: string, detail: string) => {
      const entry: AuditLogEntry = {
        id: newId('a'),
        staffId: adminUser?.id ?? 'system',
        staffName: adminUser?.name ?? 'System',
        action,
        entity,
        detail,
        timestamp: new Date().toISOString(),
      }
      setAuditLog((prev) => [entry, ...prev])
    },
    [adminUser],
  )

  const loginAdmin = useCallback(
    (email: string) => {
      const user = staff.find((s) => s.email.toLowerCase() === email.toLowerCase() && s.active)
      if (!user) return false
      setAdminUser(user)
      sessionStorage.setItem('goal-gm-admin', JSON.stringify(user))
      return true
    },
    [staff],
  )

  const logoutAdmin = useCallback(() => {
    setAdminUser(null)
    sessionStorage.removeItem('goal-gm-admin')
  }, [])

  const updateMatch = useCallback(
    (id: string, patch: Partial<Match>, audit?: string) => {
      setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
      if (audit) logAudit('UPDATE', `Match ${id}`, audit)
    },
    [logAudit],
  )

  const addMatchEvent = useCallback(
    (
      matchId: string,
      event: Omit<MatchEvent, 'id'>,
      scoreDelta?: { home?: number; away?: number },
    ) => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.id !== matchId) return m
          const full: MatchEvent = { ...event, id: newId('e') }
          let homeScore = m.homeScore ?? 0
          let awayScore = m.awayScore ?? 0
          if (scoreDelta?.home) homeScore += scoreDelta.home
          if (scoreDelta?.away) awayScore += scoreDelta.away
          const isGoal =
            event.type === 'goal' || event.type === 'penalty' || event.type === 'own_goal'
          if (isGoal && !scoreDelta) {
            if (event.teamId === m.homeTeamId) homeScore += 1
            else awayScore += 1
          }
          return {
            ...m,
            events: [...m.events, full],
            homeScore,
            awayScore,
          }
        }),
      )
      logAudit(event.type.toUpperCase(), `Match ${matchId}`, `${event.type} ${event.minute}'`)
    },
    [logAudit],
  )

  const undoLastEvent = useCallback(
    (matchId: string) => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.id !== matchId || m.events.length === 0) return m
          const events = [...m.events]
          const last = events.pop()!
          let homeScore = m.homeScore ?? 0
          let awayScore = m.awayScore ?? 0
          const isGoal =
            last.type === 'goal' || last.type === 'penalty' || last.type === 'own_goal'
          if (isGoal) {
            if (last.teamId === m.homeTeamId) homeScore = Math.max(0, homeScore - 1)
            else awayScore = Math.max(0, awayScore - 1)
          }
          return { ...m, events, homeScore, awayScore }
        }),
      )
      logAudit('UNDO', `Match ${matchId}`, 'Undid last event')
    },
    [logAudit],
  )

  const setMatchStatus = useCallback(
    (matchId: string, status: Match['status'], minute?: number) => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.id !== matchId) return m
          const patch: Partial<Match> = { status }
          if (minute != null) patch.minute = minute
          if (status === 'live' && m.homeScore == null) {
            patch.homeScore = 0
            patch.awayScore = 0
            patch.minute = minute ?? 1
          }
          if (status === 'ht') patch.minute = 45
          if (status === 'ft') patch.minute = 90
          return { ...m, ...patch }
        }),
      )
      logAudit('STATUS', `Match ${matchId}`, `Status → ${status}`)
    },
    [logAudit],
  )

  const setStreamUrl = useCallback(
    (matchId: string, streamUrl: string, replayUrl?: string) => {
      updateMatch(matchId, { streamUrl, replayUrl }, `Stream link set`)
    },
    [updateMatch],
  )

  const upsertNews = useCallback(
    (article: NewsArticle) => {
      setNews((prev) => {
        const i = prev.findIndex((n) => n.id === article.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = article
          return next
        }
        return [article, ...prev]
      })
      logAudit('NEWS', `News ${article.id}`, article.title)
    },
    [logAudit],
  )

  const upsertTeam = useCallback(
    (team: Team) => {
      setTeams((prev) => {
        const i = prev.findIndex((t) => t.id === team.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = team
          return next
        }
        return [...prev, team]
      })
      logAudit('TEAM', `Team ${team.id}`, team.name)
    },
    [logAudit],
  )

  const upsertPlayer = useCallback(
    (player: Player) => {
      setPlayers((prev) => {
        const i = prev.findIndex((p) => p.id === player.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = player
          return next
        }
        return [...prev, player]
      })
      logAudit('PLAYER', `Player ${player.id}`, player.name)
    },
    [logAudit],
  )

  const upsertCompetition = useCallback(
    (comp: Competition) => {
      setCompetitions((prev) => {
        const i = prev.findIndex((c) => c.id === comp.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = comp
          return next
        }
        return [...prev, comp]
      })
      logAudit('COMP', `Competition ${comp.id}`, comp.name)
    },
    [logAudit],
  )

  const upsertMatch = useCallback(
    (match: Match) => {
      setMatches((prev) => {
        const i = prev.findIndex((m) => m.id === match.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = match
          return next
        }
        return [...prev, match]
      })
      logAudit('FIXTURE', `Match ${match.id}`, `${match.homeTeamId} vs ${match.awayTeamId}`)
    },
    [logAudit],
  )

  const upsertStaff = useCallback(
    (user: StaffUser) => {
      setStaff((prev) => {
        const i = prev.findIndex((s) => s.id === user.id)
        if (i >= 0) {
          const next = [...prev]
          next[i] = user
          return next
        }
        return [...prev, user]
      })
      logAudit('STAFF', `Staff ${user.id}`, `${user.name} (${user.role})`)
    },
    [logAudit],
  )

  const value = useMemo<DataContextValue>(
    () => ({
      competitions,
      teams,
      players,
      matches,
      news,
      standings,
      staff,
      auditLog,
      channelUrl,
      setChannelUrl,
      adminUser,
      loginAdmin,
      logoutAdmin,
      updateMatch,
      addMatchEvent,
      undoLastEvent,
      setMatchStatus,
      setStreamUrl,
      upsertNews,
      upsertTeam,
      upsertPlayer,
      upsertCompetition,
      upsertMatch,
      upsertStaff,
      logAudit,
      getTeam: (id) => teams.find((t) => t.id === id),
      getPlayer: (id) => players.find((p) => p.id === id),
      getCompetition: (id) => competitions.find((c) => c.id === id),
      getMatch: (id) => matches.find((m) => m.id === id),
    }),
    [
      competitions,
      teams,
      players,
      matches,
      news,
      standings,
      staff,
      auditLog,
      channelUrl,
      adminUser,
      loginAdmin,
      logoutAdmin,
      updateMatch,
      addMatchEvent,
      undoLastEvent,
      setMatchStatus,
      setStreamUrl,
      upsertNews,
      upsertTeam,
      upsertPlayer,
      upsertCompetition,
      upsertMatch,
      upsertStaff,
      logAudit,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}

export function eventNeedsScore(type: EventType) {
  return type === 'goal' || type === 'penalty' || type === 'own_goal'
}
