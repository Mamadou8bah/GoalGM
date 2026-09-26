import { useMemo, useState } from 'react'
import { MatchRow } from '../components/MatchRow'
import { useData } from '../context/DataContext'

export function ArchivePage() {
  const { matches, teams, competitions } = useData()
  const [teamId, setTeamId] = useState('')
  const [compId, setCompId] = useState('')
  const [date, setDate] = useState('')

  const results = useMemo(() => {
    return matches
      .filter((m) => m.status === 'ft' || m.status === 'live' || m.status === 'ht')
      .filter((m) => !teamId || m.homeTeamId === teamId || m.awayTeamId === teamId)
      .filter((m) => !compId || m.competitionId === compId)
      .filter((m) => !date || m.kickoff.startsWith(date))
      .sort((a, b) => b.kickoff.localeCompare(a.kickoff))
  }, [matches, teamId, compId, date])

  return (
    <>
      <div className="page-title">Match archive</div>
      <div className="search-box" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          <option value="">All teams</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select value={compId} onChange={(e) => setCompId(e.target.value)}>
          <option value="">All competitions</option>
          {competitions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="panel__title">{results.length} matches</div>
      {results.map((m) => (
        <MatchRow key={m.id} match={m} />
      ))}
      {results.length === 0 && <div className="empty-state">No matches match your filters.</div>}
    </>
  )
}
