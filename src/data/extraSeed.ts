import type {
  Competition,
  Match,
  MatchEvent,
  NewsArticle,
  Player,
  StandingRow,
  Team,
} from '../types'

/** Extra competitions beyond the core five */
export const extraCompetitions: Competition[] = [
  {
    id: 'gfa-women-2',
    name: "Women's Second Division",
    shortName: "Women's Second Div",
    gender: 'women',
    division: '2nd',
    season: '2025/26',
    type: 'national',
    tieBreak: 'gd',
    zones: { promotion: 2 },
  },
  {
    id: 'zone-north',
    name: 'North Bank Zonal League',
    shortName: 'North Bank Zone',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    region: 'North Bank',
    type: 'zone',
    tieBreak: 'gd',
  },
  {
    id: 'zone-lower',
    name: 'Lower River Zonal League',
    shortName: 'Lower River Zone',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    region: 'Lower River',
    type: 'zone',
    tieBreak: 'h2h',
  },
  {
    id: 'zone-upper',
    name: 'Upper River Zonal League',
    shortName: 'Upper River Zone',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    region: 'Upper River',
    type: 'zone',
    tieBreak: 'gd',
  },
  {
    id: 'gfa-u20',
    name: 'GFA U-20 Championship',
    shortName: 'U-20 Championship',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    type: 'national',
    tieBreak: 'gd',
  },
]

type TeamDef = {
  id: string
  name: string
  shortName: string
  city: string
  stadium: string
  founded: number
  coach: string
  color: string
  competitionIds: string[]
}

const EXTRA_TEAM_DEFS: TeamDef[] = [
  // Men 1st — fill out the table
  { id: 'bombada', name: 'Bombada FC', shortName: 'Bombada', city: 'Brikama', stadium: 'Bombada Ground', founded: 1999, coach: 'Lamin Darboe', color: '#16a085', competitionIds: ['gfa-men-1'] },
  { id: 'steve-b', name: 'Steve Biko FC', shortName: 'Biko', city: 'Bakau', stadium: 'Biko Park', founded: 1978, coach: 'Ebou Jarju', color: '#27ae60', competitionIds: ['gfa-men-1'] },
  { id: 'gpasa', name: 'GPA FC', shortName: 'GPA', city: 'Banjul', stadium: 'Ports Authority', founded: 1985, coach: 'Pa Modou Bojang', color: '#2980b9', competitionIds: ['gfa-men-1'] },
  { id: 'marimoo', name: 'Marimoo FC', shortName: 'Marimoo', city: 'Brufut', stadium: 'Marimoo Field', founded: 2001, coach: 'Omar Jallow', color: '#8e44ad', competitionIds: ['gfa-men-1'] },
  // Men 2nd
  { id: 'banjul-u', name: 'Banjul United', shortName: 'Banjul Utd', city: 'Banjul', stadium: 'Box Bar Pitch 2', founded: 1992, coach: 'Alieu Njie', color: '#c0392b', competitionIds: ['gfa-men-2'] },
  { id: 'serrekunda', name: 'Serrekunda United', shortName: 'SK United', city: 'Serrekunda', stadium: 'SK Mini Stadium', founded: 2004, coach: 'Modou Lamin Faye', color: '#d35400', competitionIds: ['gfa-men-2'] },
  { id: 'kololi', name: 'Kololi FC', shortName: 'Kololi', city: 'Kololi', stadium: 'Kololi Ground', founded: 2008, coach: 'Sainey Camara', color: '#1abc9c', competitionIds: ['gfa-men-2'] },
  { id: 'bakau', name: 'Bakau United', shortName: 'Bakau', city: 'Bakau', stadium: 'Bakau Stadium', founded: 1995, coach: 'Yankuba Ceesay', color: '#34495e', competitionIds: ['gfa-men-2'] },
  { id: 'fajara', name: 'Fajara FC', shortName: 'Fajara', city: 'Fajara', stadium: 'Fajara Oval', founded: 2010, coach: 'Bubacarr Sowe', color: '#e74c3c', competitionIds: ['gfa-men-2'] },
  { id: 'latrikunda', name: 'Latrikunda United', shortName: 'Latrikunda', city: 'Latrikunda', stadium: 'Latrikunda Field', founded: 2006, coach: 'Assan Touray', color: '#9b59b6', competitionIds: ['gfa-men-2'] },
  // Men 3rd
  { id: 'brufut', name: 'Brufut United', shortName: 'Brufut', city: 'Brufut', stadium: 'Brufut Ground', founded: 2012, coach: 'Lamin Saidy', color: '#2ecc71', competitionIds: ['gfa-men-3'] },
  { id: 'sukuta', name: 'Sukuta Tigers', shortName: 'Sukuta', city: 'Sukuta', stadium: 'Tigers Park', founded: 2014, coach: 'Ebrima Colley', color: '#f39c12', competitionIds: ['gfa-men-3'] },
  { id: 'busumbala', name: 'Busumbala FC', shortName: 'Busumbala', city: 'Busumbala', stadium: 'Busumbala Pitch', founded: 2011, coach: 'Pa Alieu Bah', color: '#3498db', competitionIds: ['gfa-men-3'] },
  { id: 'wellingara', name: 'Wellingara Stars', shortName: 'Wellingara', city: 'Wellingara', stadium: 'Stars Ground', founded: 2013, coach: 'Musa Jallow', color: '#e67e22', competitionIds: ['gfa-men-3'] },
  { id: 'talinding', name: 'Talinding FC', shortName: 'Talinding', city: 'Talinding', stadium: 'Talinding Oval', founded: 2009, coach: 'Alhagie Sanyang', color: '#1abc9c', competitionIds: ['gfa-men-3'] },
  { id: 'jabang', name: 'Jabang FC', shortName: 'Jabang', city: 'Jabang', stadium: 'Jabang Field', founded: 2015, coach: 'Omar Sanneh', color: '#c0392b', competitionIds: ['gfa-men-3'] },
  // West Coast zone
  { id: 'gunjur', name: 'Gunjur United', shortName: 'Gunjur', city: 'Gunjur', stadium: 'Gunjur Stadium', founded: 2007, coach: 'Dawda Jobe', color: '#27ae60', competitionIds: ['zone-west'] },
  { id: 'sanyang', name: 'Sanyang FC', shortName: 'Sanyang', city: 'Sanyang', stadium: 'Sanyang Ground', founded: 2010, coach: 'Lamin Kanteh', color: '#2980b9', competitionIds: ['zone-west'] },
  { id: 'kartong', name: 'Kartong Rangers', shortName: 'Kartong', city: 'Kartong', stadium: 'Rangers Park', founded: 2016, coach: 'Sainey Njie', color: '#8e44ad', competitionIds: ['zone-west'] },
  { id: 'tanji', name: 'Tanji Fishermen', shortName: 'Tanji', city: 'Tanji', stadium: 'Fishermen Field', founded: 2005, coach: 'Ebou Touray', color: '#16a085', competitionIds: ['zone-west'] },
  // North Bank
  { id: 'fass', name: 'Fass FC', shortName: 'Fass', city: 'Fass', stadium: 'Fass Ground', founded: 2008, coach: 'Alieu Camara', color: '#d35400', competitionIds: ['zone-north'] },
  { id: 'kerewan', name: 'Kerewan United', shortName: 'Kerewan', city: 'Kerewan', stadium: 'Kerewan Stadium', founded: 2003, coach: 'Modou Bah', color: '#2c3e50', competitionIds: ['zone-north'] },
  { id: 'farafenni', name: 'Farafenni FC', shortName: 'Farafenni', city: 'Farafenni', stadium: 'Farafenni Park', founded: 1998, coach: 'Pa Lamin Ceesay', color: '#c0392b', competitionIds: ['zone-north'] },
  { id: 'barra', name: 'Barra Stars', shortName: 'Barra', city: 'Barra', stadium: 'Barra Field', founded: 2011, coach: 'Yankuba Sowe', color: '#2980b9', competitionIds: ['zone-north'] },
  // Lower River
  { id: 'soma', name: 'Soma United', shortName: 'Soma', city: 'Soma', stadium: 'Soma Stadium', founded: 2002, coach: 'Assan Jallow', color: '#27ae60', competitionIds: ['zone-lower'] },
  { id: 'pakalinding', name: 'Pakalinding FC', shortName: 'Pakalinding', city: 'Pakalinding', stadium: 'Pakalinding Ground', founded: 2014, coach: 'Bubacarr Njie', color: '#e74c3c', competitionIds: ['zone-lower'] },
  { id: 'jenoi', name: 'Jenoi Rangers', shortName: 'Jenoi', city: 'Jenoi', stadium: 'Jenoi Park', founded: 2017, coach: 'Lamin Bojang', color: '#8e44ad', competitionIds: ['zone-lower'] },
  { id: 'mansakonko', name: 'Mansakonko FC', shortName: 'Mansakonko', city: 'Mansakonko', stadium: 'Mansakonko Ground', founded: 2006, coach: 'Ebou Ceesay', color: '#2c3e50', competitionIds: ['zone-lower'] },
  // Upper River
  { id: 'basse', name: 'Basse United', shortName: 'Basse', city: 'Basse', stadium: 'Basse Stadium', founded: 1996, coach: 'Omar Colley', color: '#16a085', competitionIds: ['zone-upper'] },
  { id: 'bansang', name: 'Bansang FC', shortName: 'Bansang', city: 'Bansang', stadium: 'Bansang Ground', founded: 2001, coach: 'Ebrima Jallow', color: '#f39c12', competitionIds: ['zone-upper'] },
  { id: 'fatoto', name: 'Fatoto Stars', shortName: 'Fatoto', city: 'Fatoto', stadium: 'Fatoto Field', founded: 2009, coach: 'Musa Darboe', color: '#3498db', competitionIds: ['zone-upper'] },
  { id: 'diabugu', name: 'Diabugu FC', shortName: 'Diabugu', city: 'Diabugu', stadium: 'Diabugu Park', founded: 2012, coach: 'Alieu Touray', color: '#c0392b', competitionIds: ['zone-upper'] },
  // Women's 1st extras + 2nd
  { id: 'banjul-w', name: 'Banjul Ladies', shortName: 'Banjul L', city: 'Banjul', stadium: 'Box Bar Ladies', founded: 2012, coach: 'Isatou Jallow', color: '#e91e63', competitionIds: ['gfa-women-1'] },
  { id: 'sk-ladies', name: 'Serrekunda Ladies', shortName: 'SK Ladies', city: 'Serrekunda', stadium: 'SK Women Ground', founded: 2014, coach: 'Mariama Ceesay', color: '#9c27b0', competitionIds: ['gfa-women-1'] },
  { id: 'bakau-w', name: 'Bakau Girls', shortName: 'Bakau G', city: 'Bakau', stadium: 'Bakau Girls Field', founded: 2016, coach: 'Awa Bah', color: '#00bcd4', competitionIds: ['gfa-women-2'] },
  { id: 'brikama-w', name: 'Brikama Women', shortName: 'Brikama W', city: 'Brikama', stadium: 'Brikama Women', founded: 2015, coach: 'Fatou Touray', color: '#ff5722', competitionIds: ['gfa-women-2'] },
  { id: 'faraba-w', name: 'Faraba Ladies', shortName: 'Faraba', city: 'Faraba', stadium: 'Faraba Pitch', founded: 2018, coach: 'Ndey Sowe', color: '#4caf50', competitionIds: ['gfa-women-2'] },
  { id: 'gunjur-w', name: 'Gunjur Women', shortName: 'Gunjur W', city: 'Gunjur', stadium: 'Gunjur Women', founded: 2017, coach: 'Kaddy Camara', color: '#795548', competitionIds: ['gfa-women-2'] },
  // U20
  { id: 'u20-banjul', name: 'Banjul U20', shortName: 'Banjul U20', city: 'Banjul', stadium: 'Youth Arena', founded: 2019, coach: 'Alieu Fadera', color: '#CE1126', competitionIds: ['gfa-u20'] },
  { id: 'u20-west', name: 'West Coast U20', shortName: 'WC U20', city: 'Brikama', stadium: 'Youth West', founded: 2019, coach: 'Pa Modou Jagne', color: '#0C1C8C', competitionIds: ['gfa-u20'] },
  { id: 'u20-north', name: 'North Bank U20', shortName: 'NB U20', city: 'Kerewan', stadium: 'Youth North', founded: 2020, coach: 'Assan Ceesay', color: '#3A7728', competitionIds: ['gfa-u20'] },
  { id: 'u20-upper', name: 'Upper River U20', shortName: 'UR U20', city: 'Basse', stadium: 'Youth Upper', founded: 2020, coach: 'Musa Barrow', color: '#e67e22', competitionIds: ['gfa-u20'] },
]

const FIRST_NAMES_M = [
  'Alieu', 'Lamin', 'Ebrima', 'Modou', 'Omar', 'Bubacarr', 'Assan', 'Pa', 'Yankuba', 'Musa',
  'Sainey', 'Dawda', 'Ebou', 'Alhagie', 'Sulayman', 'Abdoulie', 'Sheriff', 'Nuha', 'Bakary', 'Momodou',
]
const FIRST_NAMES_W = [
  'Fatou', 'Awa', 'Mariama', 'Isatou', 'Haddy', 'Binta', 'Aminata', 'Kaddy', 'Ndey', 'Saffie',
  'Oumie', 'Jainaba', 'Maimuna', 'Aji', 'Ramou', 'Ya', 'Satou', 'Fanta', 'Jainaba', 'Nyima',
]
const SURNAMES = [
  'Jallow', 'Ceesay', 'Njie', 'Bah', 'Camara', 'Sowe', 'Jatta', 'Colley', 'Touray', 'Jobe',
  'Sanneh', 'Darboe', 'Bojang', 'Sanyang', 'Marreh', 'Jarju', 'Baldeh', 'Gibba', 'Joof', 'Sillah',
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function makeSquad(team: TeamDef, women: boolean): Player[] {
  const firsts = women ? FIRST_NAMES_W : FIRST_NAMES_M
  const players: Player[] = []
  const positions: Player['position'][] = [
    'GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD',
    'GK', 'DEF', 'MID', 'FWD', 'DEF', 'MID',
  ]
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 10, 9, 11, 13, 14, 15, 17, 18, 19]
  for (let i = 0; i < 17; i++) {
    const h = hash(`${team.id}-${i}`)
    const fn = firsts[h % firsts.length]
    const sn = SURNAMES[(h >> 3) % SURNAMES.length]
    const name = `${fn} ${sn}`
    const id = `${team.id}_p${i + 1}`
    players.push({
      id,
      name,
      shortName: sn,
      teamId: team.id,
      position: positions[i],
      jerseyNumber: numbers[i],
      nationality: 'Gambia',
      dob: `199${(h % 9) + 1}-0${(h % 9) + 1}-${10 + (h % 18)}`,
      heightCm: women ? 158 + (h % 18) : 168 + (h % 22),
      preferredFoot: (['Left', 'Right', 'Both'] as const)[h % 3],
      photoUrl: `/images/players/${id}.svg`,
      career: [{ teamId: team.id, from: '2023', to: null, jerseyNumber: numbers[i] }],
    })
  }
  return players
}

export function buildExtraTeams(): Team[] {
  return EXTRA_TEAM_DEFS.map((t) => ({
    ...t,
    logoUrl: `/images/teams/${t.id}.svg`,
  }))
}

export function buildExtraPlayers(): Player[] {
  return EXTRA_TEAM_DEFS.flatMap((t) =>
    makeSquad(t, t.competitionIds.some((c) => c.includes('women'))),
  )
}

function dayOffset(base: string, days: number) {
  const d = new Date(base + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function kickoffAt(date: string, hour: number) {
  return `${date}T${String(hour).padStart(2, '0')}:00:00+00:00`
}

function pairMatches(
  competitionId: string,
  teamIds: string[],
  date: string,
  round: number,
  startId: number,
  statuses: Array<Match['status']>,
): Match[] {
  const out: Match[] = []
  let idn = startId
  for (let i = 0; i + 1 < teamIds.length; i += 2) {
    const status = statuses[out.length % statuses.length]
    const liveish = status === 'live' || status === 'ht'
    const played = status === 'ft' || liveish
    const hs = played ? (hash(`${teamIds[i]}${date}`) % 4) : null
    const as = played ? (hash(`${teamIds[i + 1]}${date}`) % 3) : null
    const events: MatchEvent[] = []
    if (played && hs != null && as != null) {
      let m = 8
      for (let g = 0; g < hs; g++) {
        events.push({
          id: `ex_e_${idn}_${g}h`,
          type: 'goal',
          minute: m,
          teamId: teamIds[i],
          playerId: `${teamIds[i]}_p${9 + (g % 3)}`,
        })
        m += 12
      }
      m = 15
      for (let g = 0; g < as; g++) {
        events.push({
          id: `ex_e_${idn}_${g}a`,
          type: 'goal',
          minute: m,
          teamId: teamIds[i + 1],
          playerId: `${teamIds[i + 1]}_p${9 + (g % 3)}`,
        })
        m += 14
      }
      if (hash(String(idn)) % 2 === 0) {
        events.push({
          id: `ex_e_${idn}_y`,
          type: 'yellow',
          minute: 33,
          teamId: teamIds[i],
          playerId: `${teamIds[i]}_p4`,
        })
      }
    }
    out.push({
      id: `ex_m${idn}`,
      competitionId,
      round,
      homeTeamId: teamIds[i],
      awayTeamId: teamIds[i + 1],
      kickoff: kickoffAt(date, 14 + (out.length % 5)),
      status,
      minute: status === 'live' ? 20 + (idn % 50) : status === 'ht' ? 45 : undefined,
      homeScore: hs,
      awayScore: as,
      stadium: EXTRA_TEAM_DEFS.find((t) => t.id === teamIds[i])?.stadium ?? 'Municipal Ground',
      streamUrl: liveish && idn % 3 === 0 ? 'https://www.youtube.com/@GoalGM' : undefined,
      events,
      lineups: [],
      stats:
        played
          ? {
              possession: [45 + (idn % 10), 55 - (idn % 10)] as [number, number],
              shots: [5 + (idn % 8), 4 + (idn % 6)] as [number, number],
              shotsOnTarget: [2 + (idn % 4), 1 + (idn % 3)] as [number, number],
              corners: [3 + (idn % 4), 2 + (idn % 3)] as [number, number],
              fouls: [8 + (idn % 5), 7 + (idn % 4)] as [number, number],
              offsides: [idn % 3, (idn + 1) % 3] as [number, number],
            }
          : undefined,
    })
    idn++
  }
  return out
}

export function buildExtraMatches(today: string): Match[] {
  const groups: { comp: string; teams: string[] }[] = [
    {
      comp: 'gfa-men-1',
      teams: ['bombada', 'steve-b', 'gpasa', 'marimoo', 'rdb', 'hawks'],
    },
    {
      comp: 'gfa-men-2',
      teams: ['banjul-u', 'serrekunda', 'kololi', 'bakau', 'fajara', 'latrikunda', 'team-bj', 'armed'],
    },
    {
      comp: 'gfa-men-3',
      teams: ['brufut', 'sukuta', 'busumbala', 'wellingara', 'talinding', 'jabang'],
    },
    {
      comp: 'zone-west',
      teams: ['gunjur', 'sanyang', 'kartong', 'tanji'],
    },
    {
      comp: 'zone-north',
      teams: ['fass', 'kerewan', 'farafenni', 'barra'],
    },
    {
      comp: 'zone-lower',
      teams: ['soma', 'pakalinding', 'jenoi', 'mansakonko'],
    },
    {
      comp: 'zone-upper',
      teams: ['basse', 'bansang', 'fatoto', 'diabugu'],
    },
    {
      comp: 'gfa-women-1',
      teams: ['banjul-w', 'sk-ladies', 'queen-c', 'red-sab'],
    },
    {
      comp: 'gfa-women-2',
      teams: ['bakau-w', 'brikama-w', 'faraba-w', 'gunjur-w'],
    },
    {
      comp: 'gfa-u20',
      teams: ['u20-banjul', 'u20-west', 'u20-north', 'u20-upper'],
    },
  ]

  const all: Match[] = []
  let nextId = 100
  const days = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
  for (const day of days) {
    const date = dayOffset(today, day)
    for (const g of groups) {
      const statuses: Match['status'][] =
        day < 0
          ? ['ft', 'ft', 'ft']
          : day === 0
            ? ['live', 'ht', 'scheduled', 'ft']
            : ['scheduled', 'scheduled', 'scheduled']
      // rotate team order by day so fixtures vary
      const rotated = [...g.teams]
      const rot = ((day % rotated.length) + rotated.length) % rotated.length
      const ordered = rotated.slice(rot).concat(rotated.slice(0, rot))
      const batch = pairMatches(g.comp, ordered, date, 5 + day + 5, nextId, statuses)
      nextId += batch.length + 1
      all.push(...batch)
    }
  }
  return all
}

function tableFromTeamIds(ids: string[]): StandingRow[] {
  return ids.map((teamId) => {
    const h = hash(teamId)
    const played = 6 + (h % 4)
    const won = 1 + (h % Math.max(1, played - 1))
    const drawn = h % 3
    const lost = Math.max(0, played - won - drawn)
    const gf = won * 2 + drawn + (h % 4)
    const ga = lost * 2 + (h % 3)
    const form = (['W', 'D', 'L', 'W', 'D'] as const).map((_, j) => {
      const v = (h + j) % 3
      return v === 0 ? 'W' : v === 1 ? 'D' : 'L'
    })
    return {
      teamId,
      played,
      won,
      drawn,
      lost,
      gf,
      ga,
      gd: gf - ga,
      pts: won * 3 + drawn,
      form: form as ('W' | 'D' | 'L')[],
    }
  }).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
}

export function buildExtraStandings(): Record<string, StandingRow[]> {
  const byComp = new Map<string, string[]>()
  for (const t of EXTRA_TEAM_DEFS) {
    for (const c of t.competitionIds) {
      const list = byComp.get(c) ?? []
      list.push(t.id)
      byComp.set(c, list)
    }
  }
  // also include some core teams that appear in expanded match lists
  const coreAdds: Record<string, string[]> = {
    'gfa-men-1': ['rdb', 'hawks', 'fortune', 'brikama', 'wallidan', 'gamtel'],
    'gfa-men-2': ['team-bj', 'armed'],
    'gfa-women-1': ['queen-c', 'red-sab', 'police-w', 'gambia-p'],
  }
  for (const [c, ids] of Object.entries(coreAdds)) {
    const list = byComp.get(c) ?? []
    for (const id of ids) if (!list.includes(id)) list.push(id)
    byComp.set(c, list)
  }

  const out: Record<string, StandingRow[]> = {}
  for (const [c, ids] of byComp) {
    out[c] = tableFromTeamIds([...new Set(ids)])
  }
  return out
}

const NEWS_IMAGES = [
  '/images/news/gambia-v-guinea.jpg',
  '/images/news/independence-stadium.jpg',
  '/images/news/independence-stadium-2.jpg',
  '/images/news/banjul-boxbar.jpg',
  '/images/news/banjul-street.jpg',
  '/images/news/independence-day.jpg',
  '/images/news/road-banjul.jpg',
  '/images/news/banjul-2.jpg',
]

export function buildExtraNews(today: string): NewsArticle[] {
  const stories: Omit<NewsArticle, 'id' | 'publishedAt' | 'imageUrl' | 'imageColor'>[] = [
    {
      title: 'West Coast Zone: Gunjur United top after derby win',
      body: 'Gunjur United edged Sanyang FC in a packed coastal derby to go clear at the top of the West Coast Zonal League. Goal GM covered every kick from Gunjur Stadium.',
      category: 'League News',
      author: 'Lamin Sowe',
      teamIds: ['gunjur', 'sanyang'],
      competitionIds: ['zone-west'],
    },
    {
      title: 'North Bank clubs push for promotion pathway clarity',
      body: 'Chairmen from Kerewan, Farafenni and Fass met GFA officials in Banjul to discuss how zonal champions feed into the national third division.',
      category: 'League News',
      author: 'Goal GM Desk',
      competitionIds: ['zone-north', 'gfa-men-3'],
    },
    {
      title: 'Basse United light up Upper River night fixture',
      body: 'Floodlights at Basse Stadium hosted a 3-1 win for Basse United over Bansang FC, with Omar Colley’s side now favourites in the Upper River Zone.',
      category: 'Match Reports',
      author: 'Ebou Jallow',
      teamIds: ['basse', 'bansang'],
      competitionIds: ['zone-upper'],
    },
    {
      title: "Women's Second Division: Faraba Ladies make early statement",
      body: 'Faraba Ladies remain unbeaten after four rounds, defeating Gunjur Women 2-0. Scouts from the First Division were in attendance.',
      category: "Women's Football",
      author: 'Awa Njie',
      teamIds: ['faraba-w', 'gunjur-w'],
      competitionIds: ['gfa-women-2'],
    },
    {
      title: 'U-20 Championship: Banjul youth edge West Coast',
      body: 'Banjul U20 beat West Coast U20 1-0 at the Youth Arena. The GFA says the tournament is key to Scorpions pathway planning.',
      category: 'League News',
      author: 'Fatou Jallow',
      teamIds: ['u20-banjul', 'u20-west'],
      competitionIds: ['gfa-u20'],
    },
    {
      title: 'Steve Biko return to First Division contention',
      body: 'Steve Biko FC climbed into the top half after a late winner against Marimoo. Bakau fans filled Biko Park for the Friday night kick-off.',
      category: 'Match Reports',
      author: 'Omar Bah',
      teamIds: ['steve-b', 'marimoo'],
      competitionIds: ['gfa-men-1'],
    },
    {
      title: 'Transfer round-up: Second Division midfielders on the move',
      body: 'Serrekunda United and Kololi FC confirmed three domestic transfers ahead of the mid-season window. Full tagged profiles are live on Goal GM.',
      category: 'Transfers',
      author: 'Lamin Ceesay',
      competitionIds: ['gfa-men-2'],
      teamIds: ['serrekunda', 'kololi'],
    },
    {
      title: 'Independence Stadium set for women’s double-header',
      body: 'The GFA announced a women’s double-header at Independence Stadium featuring Queens College and Banjul Ladies — Watch Live links will appear in Goal GM.',
      category: "Women's Football",
      author: 'Goal GM Desk',
      competitionIds: ['gfa-women-1'],
      teamIds: ['queen-c', 'banjul-w'],
      featured: true,
    },
    {
      title: 'Lower River Zone: Soma United keep clean sheets',
      body: 'Soma United have not conceded in three straight zonal matches. Goalkeeper Assan Jallow’s form is the talk of the Lower River Region.',
      category: 'League News',
      author: 'Pa Lamin Jallow',
      teamIds: ['soma'],
      competitionIds: ['zone-lower'],
    },
    {
      title: 'GPA FC and Bombada share spoils in Serrekunda',
      body: 'A 1-1 draw kept both GPA and Bombada in the First Division mid-table scramble. Full stats and H2H history are archived permanently in Goal GM.',
      category: 'Match Reports',
      author: 'Mariama Bah',
      teamIds: ['gpasa', 'bombada'],
      competitionIds: ['gfa-men-1'],
    },
  ]

  return stories.map((s, i) => ({
    ...s,
    id: `ex_n${i + 1}`,
    publishedAt: `${dayOffset(today, -i)}T10:00:00+00:00`,
    imageColor: ['#CE1126', '#0C1C8C', '#3A7728', '#2c3e50'][i % 4],
    imageUrl: NEWS_IMAGES[i % NEWS_IMAGES.length],
  }))
}
