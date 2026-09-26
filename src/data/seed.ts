import type {
  AuditLogEntry,
  Competition,
  Match,
  NewsArticle,
  Player,
  StandingRow,
  StaffRole,
  StaffUser,
  Team,
} from '../types'
import {
  buildExtraMatches,
  buildExtraNews,
  buildExtraPlayers,
  buildExtraStandings,
  buildExtraTeams,
  extraCompetitions,
} from './extraSeed'

const coreCompetitions: Competition[] = [
  {
    id: 'gfa-men-1',
    name: 'GFA League First Division',
    shortName: 'GFA First Division',
    gender: 'men',
    division: '1st',
    season: '2025/26',
    type: 'national',
    tieBreak: 'gd',
    zones: { champions: 1, relegation: 2 },
  },
  {
    id: 'gfa-men-2',
    name: 'GFA League Second Division',
    shortName: 'GFA Second Division',
    gender: 'men',
    division: '2nd',
    season: '2025/26',
    type: 'national',
    tieBreak: 'h2h',
    zones: { promotion: 2, relegation: 2 },
  },
  {
    id: 'gfa-women-1',
    name: "Women's First Division",
    shortName: "Women's First Div",
    gender: 'women',
    division: '1st',
    season: '2025/26',
    type: 'national',
    tieBreak: 'gd',
    zones: { champions: 1 },
  },
  {
    id: 'gfa-men-3',
    name: 'GFA League Third Division',
    shortName: 'GFA Third Division',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    type: 'national',
    tieBreak: 'gd',
    zones: { promotion: 2 },
  },
  {
    id: 'zone-west',
    name: 'West Coast Zonal League',
    shortName: 'West Coast Zone',
    gender: 'men',
    division: '3rd',
    season: '2025/26',
    region: 'West Coast',
    type: 'zone',
    tieBreak: 'gd',
  },
]

export const competitions: Competition[] = [...coreCompetitions, ...extraCompetitions]

function teamLogo(id: string) {
  return `/images/teams/${id}.svg`
}

const coreTeams: Team[] = [
  {
    id: 'rdb',
    name: 'Real de Banjul',
    shortName: 'Real',
    city: 'Banjul',
    stadium: 'Box Bar Stadium',
    founded: 1966,
    coach: 'Alhagie Sowe',
    color: '#CE1126',
    logoUrl: teamLogo('rdb'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'hawks',
    name: 'Hawks FC',
    shortName: 'Hawks',
    city: 'Banjul',
    stadium: 'Serrekunda East',
    founded: 1974,
    coach: 'Modou Lamin Colley',
    color: '#0C1C8C',
    logoUrl: teamLogo('hawks'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'fortune',
    name: 'Fortune FC',
    shortName: 'Fortune',
    city: 'Farato',
    stadium: 'Fortune Park',
    founded: 2012,
    coach: 'Sang Ndong',
    color: '#3A7728',
    logoUrl: teamLogo('fortune'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'brikama',
    name: 'Brikama United',
    shortName: 'Brikama',
    city: 'Brikama',
    stadium: 'Brikama Stadium',
    founded: 2003,
    coach: 'Omar Colley',
    color: '#e67e22',
    logoUrl: teamLogo('brikama'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'wallidan',
    name: 'Wallidan FC',
    shortName: 'Wallidan',
    city: 'Banjul',
    stadium: 'Independence Stadium',
    founded: 1969,
    coach: 'Mustapha Kebbeh',
    color: '#1abc9c',
    logoUrl: teamLogo('wallidan'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'gamtel',
    name: 'GAMTEL FC',
    shortName: 'GAMTEL',
    city: 'Banjul',
    stadium: 'Serrekunda West',
    founded: 1998,
    coach: 'Ebou Faye',
    color: '#8e44ad',
    logoUrl: teamLogo('gamtel'),
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'team-bj',
    name: 'Team BJ',
    shortName: 'Team BJ',
    city: 'Bakau',
    stadium: 'Bakau Mini',
    founded: 2015,
    coach: 'Lamin Jallow',
    color: '#2980b9',
    logoUrl: teamLogo('team-bj'),
    competitionIds: ['gfa-men-2'],
  },
  {
    id: 'armed',
    name: 'Armed Forces',
    shortName: 'Armed',
    city: 'Banjul',
    stadium: 'Independence Stadium',
    founded: 1980,
    coach: 'Pa Alieu Ndow',
    color: '#2c3e50',
    logoUrl: teamLogo('armed'),
    competitionIds: ['gfa-men-2'],
  },
  {
    id: 'queen-c',
    name: 'Queens College',
    shortName: 'Queens',
    city: 'Banjul',
    stadium: 'Q.C. Ground',
    founded: 2008,
    coach: 'Fatou Ceesay',
    color: '#CE1126',
    logoUrl: teamLogo('queen-c'),
    competitionIds: ['gfa-women-1'],
  },
  {
    id: 'red-sab',
    name: 'Red Scorpions',
    shortName: 'Scorpions',
    city: 'Serrekunda',
    stadium: 'Scorpion Park',
    founded: 2011,
    coach: 'Awa Njie',
    color: '#c0392b',
    logoUrl: teamLogo('red-sab'),
    competitionIds: ['gfa-women-1'],
  },
  {
    id: 'police-w',
    name: 'Police Women',
    shortName: 'Police',
    city: 'Banjul',
    stadium: 'Police Ground',
    founded: 2005,
    coach: 'Mariama Barrow',
    color: '#0C1C8C',
    logoUrl: teamLogo('police-w'),
    competitionIds: ['gfa-women-1'],
  },
  {
    id: 'gambia-p',
    name: 'Gambia Ports',
    shortName: 'Ports',
    city: 'Banjul',
    stadium: 'Ports Ground',
    founded: 2010,
    coach: 'Isatou Camara',
    color: '#3A7728',
    logoUrl: teamLogo('gambia-p'),
    competitionIds: ['gfa-women-1'],
  },
]

export const teams: Team[] = [...coreTeams, ...buildExtraTeams()]

const mkPlayers = (
  teamId: string,
  prefix: string,
  names: [string, string, 'GK' | 'DEF' | 'MID' | 'FWD', number][],
): Player[] =>
  names.map(([name, short, position, num], i) => ({
    id: `${prefix}${i + 1}`,
    name,
    shortName: short,
    teamId,
    position,
    jerseyNumber: num,
    nationality: 'Gambia',
    dob: `199${(i % 9) + 1}-0${(i % 9) + 1}-15`,
    heightCm: 168 + (i % 20),
    preferredFoot: (i % 3 === 0 ? 'Left' : i % 3 === 1 ? 'Right' : 'Both') as
      | 'Left'
      | 'Right'
      | 'Both',
    photoUrl: `/images/players/${prefix}${i + 1}.svg`,
    career: [
      {
        teamId,
        from: '2023',
        to: null,
        jerseyNumber: num,
      },
    ],
  }))

const corePlayers: Player[] = [
  ...mkPlayers('rdb', 'rdb', [
    ['Alieu Jallow', 'Jallow', 'GK', 1],
    ['Ousman Darboe', 'Darboe', 'DEF', 2],
    ['Ebrima Sohna', 'Sohna', 'DEF', 4],
    ['Pa Modou Jagne', 'Jagne', 'DEF', 5],
    ['Bubacarr Sanneh', 'Sanneh', 'DEF', 3],
    ['Assan Ceesay', 'Ceesay', 'MID', 8],
    ['Musa Barrow', 'Barrow', 'MID', 10],
    ['Yankuba Minteh', 'Minteh', 'MID', 7],
    ['Ebrima Colley', 'Colley', 'FWD', 9],
    ['Alieu Fadera', 'Fadera', 'FWD', 11],
    ['Ablie Jallow', 'A.Jallow', 'MID', 6],
    ['Lamin Saidy', 'Saidy', 'GK', 13],
    ['Modou Touray', 'Touray', 'DEF', 14],
    ['Sulayman Marreh', 'Marreh', 'MID', 15],
    ['Ali Sowe', 'Sowe', 'FWD', 17],
  ]),
  ...mkPlayers('hawks', 'hwk', [
    ['Omar Colley', 'Colley', 'GK', 1],
    ['Ibou Touray', 'Touray', 'DEF', 2],
    ['James Gomez', 'Gomez', 'DEF', 5],
    ['Dawda Camara', 'Camara', 'DEF', 4],
    ['Saidy Janko', 'Janko', 'DEF', 3],
    ['Ebou Adams', 'Adams', 'MID', 8],
    ['Noah Sonko', 'Sonko', 'MID', 6],
    ['Alasana Manneh', 'Manneh', 'MID', 10],
    ['Kekuta Manneh', 'K.Manneh', 'FWD', 9],
    ['Momodou Bojang', 'Bojang', 'FWD', 11],
    ['Lamin Jatta', 'Jatta', 'MID', 7],
    ['Bakary Jarju', 'Jarju', 'GK', 12],
    ['Sainey Njie', 'Njie', 'DEF', 14],
    ['Muhammed Badjie', 'Badjie', 'MID', 16],
    ['Buba Bojang', 'B.Bojang', 'FWD', 18],
  ]),
  ...mkPlayers('fortune', 'for', [
    ['Baboucarr Gaye', 'Gaye', 'GK', 1],
    ['Sheriff Sinyan', 'Sinyan', 'DEF', 2],
    ['Omar Sowe', 'Sowe', 'DEF', 5],
    ['Abdoulie Ceesay', 'Ceesay', 'DEF', 4],
    ['Ebrima Baldeh', 'Baldeh', 'DEF', 3],
    ['Nuha Marong', 'Marong', 'MID', 8],
    ['Sulayman Bojang', 'Bojang', 'MID', 6],
    ['Pa Ousman Gai', 'Gai', 'MID', 10],
    ['Adama Jarju', 'Jarju', 'FWD', 9],
    ['Lamin Kanteh', 'Kanteh', 'FWD', 11],
    ['Modou Jobe', 'Jobe', 'MID', 7],
    ['Ebou Jallow', 'Jallow', 'GK', 13],
    ['Alhagie Sowe', 'A.Sowe', 'DEF', 15],
    ['Buba Sanneh', 'Sanneh', 'MID', 16],
    ['Yusupha Njie', 'Njie', 'FWD', 19],
  ]),
  ...mkPlayers('brikama', 'brk', [
    ['Landing Badjie', 'Badjie', 'GK', 1],
    ['Alieu Jatta', 'Jatta', 'DEF', 2],
    ['Pa Alieu Jallow', 'Jallow', 'DEF', 5],
    ['Modou Lamin Darboe', 'Darboe', 'DEF', 4],
    ['Ebrima Jome', 'Jome', 'DEF', 3],
    ['Musa Juwara', 'Juwara', 'MID', 8],
    ['Abdoulie Sanyang', 'Sanyang', 'MID', 10],
    ['Bubacarr Jobe', 'Jobe', 'MID', 6],
    ['Assan Badjie', 'A.Badjie', 'FWD', 9],
    ['Lamin Samateh', 'Samateh', 'FWD', 11],
    ['Yankuba Ceesay', 'Ceesay', 'MID', 7],
    ['Omar Jatta', 'O.Jatta', 'GK', 12],
    ['Sainey Ceesay', 'S.Ceesay', 'DEF', 14],
    ['Ebou Touray', 'Touray', 'MID', 15],
    ['Alieu Njie', 'Njie', 'FWD', 17],
  ]),
  ...mkPlayers('wallidan', 'wal', [
    ['Modou Jobe', 'Jobe', 'GK', 1],
    ['Pa Modou Faye', 'Faye', 'DEF', 2],
    ['Ebrima Camara', 'Camara', 'DEF', 5],
    ['Alhagie Jallow', 'Jallow', 'DEF', 4],
    ['Bubacarr Bah', 'Bah', 'DEF', 3],
    ['Lamin Gibba', 'Gibba', 'MID', 8],
    ['Assan Joof', 'Joof', 'MID', 6],
    ['Musa Jallow', 'M.Jallow', 'MID', 10],
    ['Ebou Sillah', 'Sillah', 'FWD', 9],
    ['Alieu Ceesay', 'Ceesay', 'FWD', 11],
    ['Omar Bah', 'Bah', 'MID', 7],
    ['Sainey Jallow', 'S.Jallow', 'GK', 13],
    ['Dawda Jobe', 'D.Jobe', 'DEF', 14],
    ['Buba Faye', 'Faye', 'MID', 16],
    ['Momodou Ceesay', 'Ceesay', 'FWD', 18],
  ]),
  ...mkPlayers('gamtel', 'gmt', [
    ['Alieu Jobe', 'Jobe', 'GK', 1],
    ['Pa Ebou Jatta', 'Jatta', 'DEF', 2],
    ['Modou Sowe', 'Sowe', 'DEF', 5],
    ['Lamin Ceesay', 'Ceesay', 'DEF', 4],
    ['Ebrima Njie', 'Njie', 'DEF', 3],
    ['Assan Touray', 'Touray', 'MID', 8],
    ['Bubacarr Camara', 'Camara', 'MID', 6],
    ['Alhagie Bojang', 'Bojang', 'MID', 10],
    ['Musa Darboe', 'Darboe', 'FWD', 9],
    ['Omar Sanneh', 'Sanneh', 'FWD', 11],
    ['Yankuba Bah', 'Bah', 'MID', 7],
    ['Ebou Colley', 'Colley', 'GK', 12],
    ['Sainey Sowe', 'Sowe', 'DEF', 14],
    ['Pa Lamin Jallow', 'Jallow', 'MID', 15],
    ['Ablie Touray', 'Touray', 'FWD', 17],
  ]),
  ...mkPlayers('queen-c', 'qnc', [
    ['Fatou Jallow', 'Jallow', 'GK', 1],
    ['Awa Ceesay', 'Ceesay', 'DEF', 2],
    ['Mariama Njie', 'Njie', 'DEF', 5],
    ['Isatou Bah', 'Bah', 'DEF', 4],
    ['Saffie Camara', 'Camara', 'DEF', 3],
    ['Haddy Sowe', 'Sowe', 'MID', 8],
    ['Aminata Jatta', 'Jatta', 'MID', 6],
    ['Binta Colley', 'Colley', 'MID', 10],
    ['Kaddy Jallow', 'K.Jallow', 'FWD', 9],
    ['Ndey Touray', 'Touray', 'FWD', 11],
    ['Fatoumata Bah', 'F.Bah', 'MID', 7],
    ['Aji Sarr', 'Sarr', 'GK', 13],
    ['Oumie Ceesay', 'O.Ceesay', 'DEF', 14],
    ['Jainaba Njie', 'J.Njie', 'MID', 15],
    ['Maimuna Jobe', 'Jobe', 'FWD', 17],
  ]),
  ...mkPlayers('red-sab', 'rsb', [
    ['Mariama Jallow', 'Jallow', 'GK', 1],
    ['Fatou Bah', 'Bah', 'DEF', 2],
    ['Awa Njie', 'Njie', 'DEF', 5],
    ['Isatou Ceesay', 'Ceesay', 'DEF', 4],
    ['Haddy Camara', 'Camara', 'DEF', 3],
    ['Binta Sowe', 'Sowe', 'MID', 8],
    ['Aminata Bah', 'Bah', 'MID', 6],
    ['Kaddy Touray', 'Touray', 'MID', 10],
    ['Ndey Jallow', 'Jallow', 'FWD', 9],
    ['Saffie Colley', 'Colley', 'FWD', 11],
    ['Fatoumata Jatta', 'Jatta', 'MID', 7],
    ['Aji Ceesay', 'Ceesay', 'GK', 12],
    ['Oumie Bah', 'Bah', 'DEF', 14],
    ['Jainaba Sowe', 'Sowe', 'MID', 15],
    ['Maimuna Touray', 'Touray', 'FWD', 18],
  ]),
]

export const players: Player[] = [...corePlayers, ...buildExtraPlayers()]

function starters(
  teamId: string,
  ids: string[],
  formationSlots: number[],
): Match['lineups'] {
  return ids.map((playerId, i) => {
    const p = players.find((x) => x.id === playerId)!
    return {
      playerId,
      teamId,
      isStarter: true,
      position: p.position,
      jerseyNumber: p.jerseyNumber,
      formationSlot: formationSlots[i] ?? i,
    }
  })
}

function bench(teamId: string, ids: string[]): Match['lineups'] {
  return ids.map((playerId, i) => {
    const p = players.find((x) => x.id === playerId)!
    return {
      playerId,
      teamId,
      isStarter: false,
      position: p.position,
      jerseyNumber: p.jerseyNumber,
      formationSlot: 100 + i,
    }
  })
}

/** Prototype “today” — aligns with seeded fixture dates */
export const PROTOTYPE_TODAY = '2026-09-26'

const coreMatches: Match[] = [
  {
    id: 'm1',
    competitionId: 'gfa-men-1',
    round: 8,
    homeTeamId: 'rdb',
    awayTeamId: 'hawks',
    kickoff: '2026-09-26T16:00:00+00:00',
    status: 'live',
    minute: 67,
    homeScore: 2,
    awayScore: 1,
    stadium: 'Box Bar Stadium',
    referee: 'Lamin Sanyang',
    streamUrl: 'https://www.youtube.com/@GoalGM',
    homeFormation: '4-3-3',
    awayFormation: '4-4-2',
    events: [
      { id: 'e1', type: 'goal', minute: 12, teamId: 'rdb', playerId: 'rdb9', assistPlayerId: 'rdb7' },
      { id: 'e2', type: 'yellow', minute: 28, teamId: 'hawks', playerId: 'hwk5' },
      { id: 'e3', type: 'goal', minute: 41, teamId: 'hawks', playerId: 'hwk9' },
      { id: 'e4', type: 'goal', minute: 55, teamId: 'rdb', playerId: 'rdb10' },
      { id: 'e5', type: 'sub', minute: 62, teamId: 'hawks', playerId: 'hwk15', playerOutId: 'hwk11' },
      { id: 'e6', type: 'yellow', minute: 64, teamId: 'rdb', playerId: 'rdb4' },
    ],
    lineups: [
      ...starters(
        'rdb',
        ['rdb1', 'rdb2', 'rdb3', 'rdb4', 'rdb5', 'rdb11', 'rdb6', 'rdb7', 'rdb8', 'rdb9', 'rdb10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('rdb', ['rdb12', 'rdb13', 'rdb14', 'rdb15']),
      ...starters(
        'hawks',
        ['hwk1', 'hwk2', 'hwk3', 'hwk4', 'hwk5', 'hwk11', 'hwk6', 'hwk7', 'hwk8', 'hwk9', 'hwk10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('hawks', ['hwk12', 'hwk13', 'hwk14', 'hwk15']),
    ],
    stats: {
      possession: [54, 46],
      shots: [12, 8],
      shotsOnTarget: [5, 3],
      corners: [6, 3],
      fouls: [9, 11],
      offsides: [2, 1],
    },
  },
  {
    id: 'm2',
    competitionId: 'gfa-men-1',
    round: 8,
    homeTeamId: 'fortune',
    awayTeamId: 'brikama',
    kickoff: '2026-09-26T18:30:00+00:00',
    status: 'scheduled',
    homeScore: null,
    awayScore: null,
    stadium: 'Fortune Park',
    events: [],
    lineups: [],
  },
  {
    id: 'm3',
    competitionId: 'gfa-men-1',
    round: 8,
    homeTeamId: 'wallidan',
    awayTeamId: 'gamtel',
    kickoff: '2026-09-26T14:00:00+00:00',
    status: 'ht',
    minute: 45,
    homeScore: 0,
    awayScore: 0,
    stadium: 'Independence Stadium',
    events: [
      { id: 'e7', type: 'yellow', minute: 22, teamId: 'wallidan', playerId: 'wal5' },
      { id: 'e8', type: 'yellow', minute: 38, teamId: 'gamtel', playerId: 'gmt8' },
    ],
    lineups: [
      ...starters(
        'wallidan',
        ['wal1', 'wal2', 'wal3', 'wal4', 'wal5', 'wal11', 'wal6', 'wal7', 'wal8', 'wal9', 'wal10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('wallidan', ['wal12', 'wal13', 'wal14', 'wal15']),
      ...starters(
        'gamtel',
        ['gmt1', 'gmt2', 'gmt3', 'gmt4', 'gmt5', 'gmt11', 'gmt6', 'gmt7', 'gmt8', 'gmt9', 'gmt10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('gamtel', ['gmt12', 'gmt13', 'gmt14', 'gmt15']),
    ],
    stats: {
      possession: [48, 52],
      shots: [4, 5],
      shotsOnTarget: [1, 2],
      corners: [2, 3],
      fouls: [7, 6],
      offsides: [1, 0],
    },
    homeFormation: '4-3-3',
    awayFormation: '4-2-3-1',
  },
  {
    id: 'm4',
    competitionId: 'gfa-women-1',
    round: 5,
    homeTeamId: 'queen-c',
    awayTeamId: 'red-sab',
    kickoff: '2026-09-26T15:00:00+00:00',
    status: 'live',
    minute: 34,
    homeScore: 1,
    awayScore: 0,
    stadium: 'Q.C. Ground',
    streamUrl: 'https://www.youtube.com/@GoalGM',
    events: [
      { id: 'e9', type: 'goal', minute: 19, teamId: 'queen-c', playerId: 'qnc9', assistPlayerId: 'qnc10' },
    ],
    lineups: [
      ...starters(
        'queen-c',
        ['qnc1', 'qnc2', 'qnc3', 'qnc4', 'qnc5', 'qnc11', 'qnc6', 'qnc7', 'qnc8', 'qnc9', 'qnc10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('queen-c', ['qnc12', 'qnc13', 'qnc14', 'qnc15']),
      ...starters(
        'red-sab',
        ['rsb1', 'rsb2', 'rsb3', 'rsb4', 'rsb5', 'rsb11', 'rsb6', 'rsb7', 'rsb8', 'rsb9', 'rsb10'],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ),
      ...bench('red-sab', ['rsb12', 'rsb13', 'rsb14', 'rsb15']),
    ],
    stats: {
      possession: [58, 42],
      shots: [7, 3],
      shotsOnTarget: [3, 1],
      corners: [4, 1],
      fouls: [5, 8],
      offsides: [1, 2],
    },
    homeFormation: '4-3-3',
    awayFormation: '4-4-2',
  },
  {
    id: 'm5',
    competitionId: 'gfa-men-2',
    round: 6,
    homeTeamId: 'team-bj',
    awayTeamId: 'armed',
    kickoff: '2026-09-26T17:00:00+00:00',
    status: 'scheduled',
    homeScore: null,
    awayScore: null,
    stadium: 'Bakau Mini',
    events: [],
    lineups: [],
  },
  {
    id: 'm6',
    competitionId: 'gfa-men-1',
    round: 7,
    homeTeamId: 'hawks',
    awayTeamId: 'fortune',
    kickoff: '2026-09-25T16:00:00+00:00',
    status: 'ft',
    homeScore: 1,
    awayScore: 1,
    stadium: 'Serrekunda East',
    events: [
      { id: 'e10', type: 'goal', minute: 33, teamId: 'hawks', playerId: 'hwk10' },
      { id: 'e11', type: 'goal', minute: 71, teamId: 'fortune', playerId: 'for9' },
    ],
    lineups: [],
    stats: {
      possession: [51, 49],
      shots: [9, 10],
      shotsOnTarget: [3, 4],
      corners: [5, 4],
      fouls: [10, 9],
      offsides: [2, 2],
    },
  },
  {
    id: 'm7',
    competitionId: 'gfa-men-1',
    round: 7,
    homeTeamId: 'brikama',
    awayTeamId: 'rdb',
    kickoff: '2026-09-25T18:00:00+00:00',
    status: 'ft',
    homeScore: 0,
    awayScore: 2,
    stadium: 'Brikama Stadium',
    events: [
      { id: 'e12', type: 'goal', minute: 24, teamId: 'rdb', playerId: 'rdb9' },
      { id: 'e13', type: 'goal', minute: 88, teamId: 'rdb', playerId: 'rdb8' },
    ],
    lineups: [],
  },
  {
    id: 'm8',
    competitionId: 'gfa-women-1',
    round: 4,
    homeTeamId: 'police-w',
    awayTeamId: 'gambia-p',
    kickoff: '2026-09-25T15:00:00+00:00',
    status: 'ft',
    homeScore: 2,
    awayScore: 0,
    stadium: 'Police Ground',
    events: [],
    lineups: [],
  },
  {
    id: 'm9',
    competitionId: 'gfa-men-1',
    round: 8,
    homeTeamId: 'gamtel',
    awayTeamId: 'rdb',
    kickoff: '2026-09-27T16:00:00+00:00',
    status: 'scheduled',
    homeScore: null,
    awayScore: null,
    stadium: 'Serrekunda West',
    events: [],
    lineups: [],
  },
  {
    id: 'm10',
    competitionId: 'gfa-men-1',
    round: 8,
    homeTeamId: 'hawks',
    awayTeamId: 'wallidan',
    kickoff: '2026-09-27T18:30:00+00:00',
    status: 'scheduled',
    homeScore: null,
    awayScore: null,
    stadium: 'Serrekunda East',
    events: [],
    lineups: [],
  },
  {
    id: 'm11',
    competitionId: 'gfa-men-1',
    round: 6,
    homeTeamId: 'rdb',
    awayTeamId: 'fortune',
    kickoff: '2026-09-20T16:00:00+00:00',
    status: 'ft',
    homeScore: 3,
    awayScore: 1,
    stadium: 'Box Bar Stadium',
    events: [
      { id: 'e14', type: 'goal', minute: 8, teamId: 'rdb', playerId: 'rdb9' },
      { id: 'e15', type: 'goal', minute: 29, teamId: 'fortune', playerId: 'for11' },
      { id: 'e16', type: 'goal', minute: 56, teamId: 'rdb', playerId: 'rdb10' },
      { id: 'e17', type: 'goal', minute: 79, teamId: 'rdb', playerId: 'rdb8' },
    ],
    lineups: [],
  },
  {
    id: 'm12',
    competitionId: 'gfa-men-1',
    round: 5,
    homeTeamId: 'hawks',
    awayTeamId: 'rdb',
    kickoff: '2026-09-13T16:00:00+00:00',
    status: 'ft',
    homeScore: 1,
    awayScore: 2,
    stadium: 'Serrekunda East',
    events: [
      { id: 'e18', type: 'goal', minute: 40, teamId: 'hawks', playerId: 'hwk9' },
      { id: 'e19', type: 'goal', minute: 61, teamId: 'rdb', playerId: 'rdb9' },
      { id: 'e20', type: 'goal', minute: 85, teamId: 'rdb', playerId: 'rdb7' },
    ],
    lineups: [],
  },
]

export const matches: Match[] = [...coreMatches, ...buildExtraMatches(PROTOTYPE_TODAY)]

const coreStandings: Record<string, StandingRow[]> = {
  'gfa-men-1': [
    { teamId: 'rdb', played: 7, won: 5, drawn: 1, lost: 1, gf: 14, ga: 6, gd: 8, pts: 16, form: ['W', 'W', 'D', 'W', 'W'] },
    { teamId: 'hawks', played: 7, won: 4, drawn: 2, lost: 1, gf: 11, ga: 7, gd: 4, pts: 14, form: ['D', 'W', 'W', 'L', 'W'] },
    { teamId: 'fortune', played: 7, won: 4, drawn: 1, lost: 2, gf: 10, ga: 8, gd: 2, pts: 13, form: ['D', 'L', 'W', 'W', 'W'] },
    { teamId: 'wallidan', played: 6, won: 3, drawn: 2, lost: 1, gf: 8, ga: 5, gd: 3, pts: 11, form: ['W', 'D', 'W', 'D', 'L'] },
    { teamId: 'brikama', played: 7, won: 2, drawn: 2, lost: 3, gf: 7, ga: 9, gd: -2, pts: 8, form: ['L', 'D', 'W', 'L', 'D'] },
    { teamId: 'gamtel', played: 6, won: 1, drawn: 2, lost: 3, gf: 5, ga: 8, gd: -3, pts: 5, form: ['L', 'D', 'L', 'D', 'W'] },
  ],
  'gfa-women-1': [
    { teamId: 'queen-c', played: 4, won: 3, drawn: 1, lost: 0, gf: 8, ga: 2, gd: 6, pts: 10, form: ['W', 'W', 'D', 'W'] },
    { teamId: 'police-w', played: 4, won: 3, drawn: 0, lost: 1, gf: 7, ga: 3, gd: 4, pts: 9, form: ['W', 'W', 'L', 'W'] },
    { teamId: 'red-sab', played: 4, won: 1, drawn: 1, lost: 2, gf: 4, ga: 5, gd: -1, pts: 4, form: ['L', 'D', 'W', 'L'] },
    { teamId: 'gambia-p', played: 4, won: 0, drawn: 0, lost: 4, gf: 1, ga: 10, gd: -9, pts: 0, form: ['L', 'L', 'L', 'L'] },
  ],
  'gfa-men-2': [
    { teamId: 'armed', played: 5, won: 3, drawn: 1, lost: 1, gf: 7, ga: 4, gd: 3, pts: 10, form: ['W', 'D', 'W', 'L', 'W'] },
    { teamId: 'team-bj', played: 5, won: 2, drawn: 2, lost: 1, gf: 6, ga: 5, gd: 1, pts: 8, form: ['D', 'W', 'D', 'W', 'L'] },
  ],
}

export const standingsByCompetition: Record<string, StandingRow[]> = {
  ...buildExtraStandings(),
  ...coreStandings,
  // keep core First Division order preferred for demo
  'gfa-men-1': [
    ...coreStandings['gfa-men-1'],
    ...(buildExtraStandings()['gfa-men-1'] ?? []).filter(
      (r) => !['rdb', 'hawks', 'fortune', 'wallidan', 'brikama', 'gamtel'].includes(r.teamId),
    ),
  ],
  'gfa-men-2': [
    ...coreStandings['gfa-men-2'],
    ...(buildExtraStandings()['gfa-men-2'] ?? []).filter(
      (r) => !['armed', 'team-bj'].includes(r.teamId),
    ),
  ],
  'gfa-women-1': [
    ...coreStandings['gfa-women-1'],
    ...(buildExtraStandings()['gfa-women-1'] ?? []).filter(
      (r) => !['queen-c', 'police-w', 'red-sab', 'gambia-p'].includes(r.teamId),
    ),
  ],
}

const coreNews: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Real de Banjul edge Hawks in fiery Box Bar derby',
    body: 'Real de Banjul took a 2-1 lead into the final half-hour against Hawks FC in a packed Box Bar Stadium. Assan Ceesay and Musa Barrow found the net for the hosts, while Kekuta Manneh replied for Hawks before the break.\n\nGoal GM is carrying the live stream on the official channel. Fans can follow every event, lineup and standings update inside the app.',
    category: 'Match Reports',
    author: 'Fatou Jallow',
    publishedAt: '2026-09-26T16:45:00+00:00',
    imageColor: '#CE1126',
    imageUrl: '/images/news/gambia-v-guinea.jpg',
    featured: true,
    teamIds: ['rdb', 'hawks'],
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'n2',
    title: 'Yankuba Minteh linked with return to GFA First Division',
    body: 'Transfer chatter intensified this week as Real de Banjul were linked with a short-term deal for midfielder Yankuba Minteh. Club officials declined to confirm talks, saying only that the squad list remains open until the window closes.\n\nAny move would be among the biggest domestic stories of the 2025/26 season.',
    category: 'Transfers',
    author: 'Lamin Ceesay',
    publishedAt: '2026-09-25T10:00:00+00:00',
    imageColor: '#0C1C8C',
    imageUrl: '/images/news/independence-stadium.jpg',
    playerIds: ['rdb8'],
    teamIds: ['rdb'],
    competitionIds: ['gfa-men-1'],
  },
  {
    id: 'n3',
    title: "Women's First Division: Queens College set the pace",
    body: "Queens College remain unbeaten after four rounds of the Women's First Division. A clinical finish from Kaddy Jallow put them ahead against Red Scorpions, extending their lead at the top of the table.\n\nGoal GM continues full coverage of women's football across Gambia — fixtures, lineups and tables.",
    category: "Women's Football",
    author: 'Awa Njie',
    publishedAt: '2026-09-26T15:40:00+00:00',
    imageColor: '#3A7728',
    imageUrl: '/images/news/independence-stadium-2.jpg',
    teamIds: ['queen-c', 'red-sab'],
    competitionIds: ['gfa-women-1'],
  },
  {
    id: 'n4',
    title: 'GFA confirms Mid-Season Cup draw for December',
    body: 'The Gambia Football Federation announced the Mid-Season Cup will kick off in early December, featuring clubs from the First and Second Divisions. Full fixtures will be published on Goal GM once the draw is finalised.',
    category: 'League News',
    author: 'Goal GM Desk',
    publishedAt: '2026-09-24T09:30:00+00:00',
    imageColor: '#2c3e50',
    imageUrl: '/images/news/banjul-boxbar.jpg',
    competitionIds: ['gfa-men-1', 'gfa-men-2'],
  },
]

export const news: NewsArticle[] = [...coreNews, ...buildExtraNews(PROTOTYPE_TODAY)]

export function getTeam(id: string) {
  const team = teams.find((t) => t.id === id)
  if (!team) throw new Error(`Unknown team: ${id}`)
  return team
}

export function getCompetition(id: string) {
  const competition = competitions.find((c) => c.id === id)
  if (!competition) throw new Error(`Unknown competition: ${id}`)
  return competition
}

export function findTeam(id: string) {
  return teams.find((t) => t.id === id)
}

export function findCompetition(id: string) {
  return competitions.find((c) => c.id === id)
}

export function getPlayer(id: string) {
  return players.find((p) => p.id === id)
}

export function getMatch(id: string) {
  return matches.find((m) => m.id === id)
}

export function dateKey(iso: string) {
  return iso.slice(0, 10)
}

export function matchesOnDate(date: string) {
  return matches.filter((m) => dateKey(m.kickoff) === date)
}

export function topScorers(competitionId: string, matchList: Match[] = matches) {
  const counts = new Map<string, { playerId: string; teamId: string; goals: number }>()
  for (const m of matchList) {
    if (m.competitionId !== competitionId) continue
    for (const e of m.events) {
      if (e.type !== 'goal' && e.type !== 'penalty') continue
      const cur = counts.get(e.playerId) ?? { playerId: e.playerId, teamId: e.teamId, goals: 0 }
      cur.goals += 1
      counts.set(e.playerId, cur)
    }
  }
  return [...counts.values()].sort((a, b) => b.goals - a.goals).slice(0, 10)
}

export function topAssists(competitionId: string, matchList: Match[] = matches) {
  const counts = new Map<string, { playerId: string; teamId: string; assists: number }>()
  for (const m of matchList) {
    if (m.competitionId !== competitionId) continue
    for (const e of m.events) {
      if (!e.assistPlayerId) continue
      const cur =
        counts.get(e.assistPlayerId) ?? {
          playerId: e.assistPlayerId,
          teamId: e.teamId,
          assists: 0,
        }
      cur.assists += 1
      counts.set(e.assistPlayerId, cur)
    }
  }
  return [...counts.values()].sort((a, b) => b.assists - a.assists).slice(0, 10)
}

export function cardLeaders(
  competitionId: string,
  type: 'yellow' | 'red',
  matchList: Match[] = matches,
) {
  const counts = new Map<string, { playerId: string; teamId: string; count: number }>()
  for (const m of matchList) {
    if (m.competitionId !== competitionId) continue
    for (const e of m.events) {
      if (e.type !== type) continue
      const cur = counts.get(e.playerId) ?? { playerId: e.playerId, teamId: e.teamId, count: 0 }
      cur.count += 1
      counts.set(e.playerId, cur)
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 10)
}

export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@GoalGM'

export const staffUsers: StaffUser[] = [
  {
    id: 's1',
    name: 'Amie Touray',
    email: 'amie@goalgm.gm',
    role: 'super_admin',
    active: true,
  },
  {
    id: 's2',
    name: 'Pa Lamin Jallow',
    email: 'reporter@goalgm.gm',
    role: 'score_reporter',
    active: true,
  },
  {
    id: 's3',
    name: 'Fatou Ceesay',
    email: 'data@goalgm.gm',
    role: 'data_editor',
    active: true,
  },
  {
    id: 's4',
    name: 'Omar Bah',
    email: 'news@goalgm.gm',
    role: 'news_editor',
    active: true,
  },
]

export const initialAuditLog: AuditLogEntry[] = [
  {
    id: 'a1',
    staffId: 's2',
    staffName: 'Pa Lamin Jallow',
    action: 'GOAL',
    entity: 'Match m1',
    detail: 'Real 2–1 Hawks — Musa Barrow 55\'',
    timestamp: '2026-09-26T16:55:00+00:00',
  },
  {
    id: 'a2',
    staffId: 's3',
    staffName: 'Fatou Ceesay',
    action: 'UPDATE',
    entity: 'Team rdb',
    detail: 'Updated coach to Alhagie Sowe',
    timestamp: '2026-09-25T11:20:00+00:00',
  },
  {
    id: 'a3',
    staffId: 's4',
    staffName: 'Omar Bah',
    action: 'PUBLISH',
    entity: 'News n1',
    detail: 'Published derby match report',
    timestamp: '2026-09-26T16:50:00+00:00',
  },
]

export const roleLabels: Record<StaffRole, string> = {
  super_admin: 'Super Admin',
  score_reporter: 'Score Reporter',
  data_editor: 'Data Editor',
  news_editor: 'News Editor',
}
