import { writeFileSync, mkdirSync } from 'node:fs'

function makeTeamCrestSvg(short, accent = '#CE1126') {
  const label = String(short).slice(0, 3).toUpperCase()
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs><clipPath id="c"><circle cx="64" cy="64" r="64"/></clipPath></defs>
  <g clip-path="url(#c)">
    <rect width="128" height="42" fill="${accent}"/>
    <rect y="42" width="128" height="8" fill="#fff"/>
    <rect y="50" width="128" height="28" fill="#0C1C8C"/>
    <rect y="78" width="128" height="8" fill="#fff"/>
    <rect y="86" width="128" height="42" fill="#3A7728"/>
  </g>
  <circle cx="64" cy="64" r="62" fill="none" stroke="#fff" stroke-width="4"/>
  <circle cx="64" cy="64" r="28" fill="rgba(0,0,0,0.35)"/>
  <text x="64" y="70" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="18" font-weight="700" fill="#fff">${label}</text>
</svg>`
}

function makePlayerAvatarSvg(initials, number) {
  const label = String(initials).slice(0, 2).toUpperCase()
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs><clipPath id="c"><circle cx="64" cy="64" r="64"/></clipPath></defs>
  <g clip-path="url(#c)">
    <rect width="128" height="42" fill="#CE1126"/>
    <rect y="42" width="128" height="8" fill="#fff"/>
    <rect y="50" width="128" height="28" fill="#0C1C8C"/>
    <rect y="78" width="128" height="8" fill="#fff"/>
    <rect y="86" width="128" height="42" fill="#3A7728"/>
  </g>
  <circle cx="64" cy="58" r="26" fill="rgba(0,0,0,0.4)"/>
  <text x="64" y="66" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="20" font-weight="700" fill="#fff">${label}</text>
  <circle cx="96" cy="96" r="18" fill="#0C1C8C" stroke="#fff" stroke-width="3"/>
  <text x="96" y="102" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="14" font-weight="700" fill="#fff">${number}</text>
</svg>`
}

mkdirSync('public/images/teams', { recursive: true })
mkdirSync('public/images/players', { recursive: true })

const teams = [
  ['bombada', 'BOM', '#16a085'], ['steve-b', 'BIK', '#27ae60'], ['gpasa', 'GPA', '#2980b9'], ['marimoo', 'MAR', '#8e44ad'],
  ['banjul-u', 'BJU', '#c0392b'], ['serrekunda', 'SKU', '#d35400'], ['kololi', 'KOL', '#1abc9c'], ['bakau', 'BAK', '#34495e'],
  ['fajara', 'FAJ', '#e74c3c'], ['latrikunda', 'LAT', '#9b59b6'], ['brufut', 'BRU', '#2ecc71'], ['sukuta', 'SUK', '#f39c12'],
  ['busumbala', 'BUS', '#3498db'], ['wellingara', 'WEL', '#e67e22'], ['talinding', 'TAL', '#1abc9c'], ['jabang', 'JAB', '#c0392b'],
  ['gunjur', 'GUN', '#27ae60'], ['sanyang', 'SAN', '#2980b9'], ['kartong', 'KAR', '#8e44ad'], ['tanji', 'TAN', '#16a085'],
  ['fass', 'FAS', '#d35400'], ['kerewan', 'KER', '#2c3e50'], ['farafenni', 'FAR', '#c0392b'], ['barra', 'BAR', '#2980b9'],
  ['soma', 'SOM', '#27ae60'], ['pakalinding', 'PAK', '#e74c3c'], ['jenoi', 'JEN', '#8e44ad'], ['mansakonko', 'MAN', '#2c3e50'],
  ['basse', 'BAS', '#16a085'], ['bansang', 'BAN', '#f39c12'], ['fatoto', 'FAT', '#3498db'], ['diabugu', 'DIA', '#c0392b'],
  ['banjul-w', 'BJL', '#e91e63'], ['sk-ladies', 'SKL', '#9c27b0'], ['bakau-w', 'BG', '#00bcd4'], ['brikama-w', 'BRW', '#ff5722'],
  ['faraba-w', 'FAR', '#4caf50'], ['gunjur-w', 'GUW', '#795548'], ['u20-banjul', 'B20', '#CE1126'], ['u20-west', 'W20', '#0C1C8C'],
  ['u20-north', 'N20', '#3A7728'], ['u20-upper', 'U20', '#e67e22'],
]

let avatars = 0
for (const [id, short, color] of teams) {
  writeFileSync(`public/images/teams/${id}.svg`, makeTeamCrestSvg(short, color))
  for (let p = 1; p <= 17; p++) {
    writeFileSync(
      `public/images/players/${id}_p${p}.svg`,
      makePlayerAvatarSvg(short.slice(0, 2), p <= 11 ? p : p + 1),
    )
    avatars++
  }
}
console.log(`Generated ${teams.length} team crests and ${avatars} player avatars`)
