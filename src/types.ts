export type Gender = 'men' | 'women'
export type Division = '1st' | '2nd' | '3rd'
export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'ht'
  | 'ft'
  | 'postponed'
  | 'cancelled'

export type EventType =
  | 'goal'
  | 'own_goal'
  | 'penalty'
  | 'assist'
  | 'yellow'
  | 'red'
  | 'sub'

export type StaffRole = 'super_admin' | 'score_reporter' | 'data_editor' | 'news_editor'

export interface Competition {
  id: string
  name: string
  shortName: string
  gender: Gender
  division: Division
  season: string
  region?: string
  type: 'national' | 'zone'
  tieBreak: 'gd' | 'h2h'
  zones?: { champions?: number; promotion?: number; relegation?: number }
}

export interface Team {
  id: string
  name: string
  shortName: string
  city: string
  stadium: string
  founded: number
  coach: string
  color: string
  competitionIds: string[]
  logoUrl?: string
}

export interface PlayerCareerStop {
  teamId: string
  from: string
  to: string | null
  jerseyNumber: number
}

export interface Player {
  id: string
  name: string
  shortName: string
  teamId: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  jerseyNumber: number
  nationality: string
  dob: string
  heightCm: number
  preferredFoot: 'Left' | 'Right' | 'Both'
  career: PlayerCareerStop[]
  photoUrl?: string
}

export interface MatchEvent {
  id: string
  type: EventType
  minute: number
  teamId: string
  playerId: string
  assistPlayerId?: string
  playerOutId?: string
}

export interface LineupEntry {
  playerId: string
  teamId: string
  isStarter: boolean
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  jerseyNumber: number
  formationSlot: number
}

export interface MatchStats {
  possession: [number, number]
  shots: [number, number]
  shotsOnTarget: [number, number]
  corners: [number, number]
  fouls: [number, number]
  offsides: [number, number]
}

export interface Match {
  id: string
  competitionId: string
  round: number
  homeTeamId: string
  awayTeamId: string
  kickoff: string
  status: MatchStatus
  minute?: number
  homeScore: number | null
  awayScore: number | null
  stadium: string
  referee?: string
  streamUrl?: string
  replayUrl?: string
  events: MatchEvent[]
  lineups: LineupEntry[]
  stats?: MatchStats
  homeFormation?: string
  awayFormation?: string
}

export interface StandingRow {
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  pts: number
  form: ('W' | 'D' | 'L')[]
}

export interface NewsArticle {
  id: string
  title: string
  body: string
  category: 'Transfers' | 'Match Reports' | 'League News' | "Women's Football" | 'General'
  author: string
  publishedAt: string
  imageColor: string
  imageUrl?: string
  featured?: boolean
  teamIds?: string[]
  playerIds?: string[]
  competitionIds?: string[]
}

export interface StaffUser {
  id: string
  name: string
  email: string
  role: StaffRole
  active: boolean
}

export interface AuditLogEntry {
  id: string
  staffId: string
  staffName: string
  action: string
  entity: string
  detail: string
  timestamp: string
}

export interface NotificationPrefs {
  matchStart: boolean
  goals: boolean
  halfTime: boolean
  fullTime: boolean
  lineups: boolean
  breakingNews: boolean
}

export type FanUser = {
  name: string
  provider: 'phone' | 'google' | 'apple' | 'guest'
  phone?: string
} | null
