import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DateStrip } from '../components/DateStrip'
import { MatchRow } from '../components/MatchRow'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'
import { PROTOTYPE_TODAY, dateKey } from '../data/seed'
import { useLiveMatches } from '../hooks/useLiveMatches'
import { buildDateRange } from '../utils/match'

function statusPriority(status: string) {
  if (status === 'live') return 0
  if (status === 'ht') return 1
  if (status === 'scheduled') return 2
  return 3
}

export function HomePage() {
  const { genderFilter, setGenderFilter, divisionFilter, setDivisionFilter } = useApp()
  const { getCompetition } = useData()
  const [selectedDate, setSelectedDate] = useState(PROTOTYPE_TODAY)
  const matches = useLiveMatches()
  const dates = useMemo(() => buildDateRange(PROTOTYPE_TODAY, 3, 3), [])

  const filtered = useMemo(() => {
    return matches
      .filter((m) => dateKey(m.kickoff) === selectedDate)
      .filter((m) => {
        const c = getCompetition(m.competitionId)
        if (!c) return false
        if (genderFilter !== 'all' && c.gender !== genderFilter) return false
        if (divisionFilter !== 'all' && c.division !== divisionFilter) return false
        return true
      })
      .sort((a, b) => statusPriority(a.status) - statusPriority(b.status))
  }, [matches, selectedDate, genderFilter, divisionFilter, getCompetition])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const m of filtered) {
      const list = map.get(m.competitionId) ?? []
      list.push(m)
      map.set(m.competitionId, list)
    }
    return [...map.entries()].sort((a, b) => {
      const ca = getCompetition(a[0])
      const cb = getCompetition(b[0])
      return (ca?.name ?? '').localeCompare(cb?.name ?? '')
    })
  }, [filtered, getCompetition])

  return (
    <>
      <div className="secondary-strip">
        {(['all', 'men', 'women'] as const).map((g) => (
          <button
            key={g}
            type="button"
            className={`chip${genderFilter === g ? ' chip--active' : ''}`}
            onClick={() => setGenderFilter(g)}
          >
            {g === 'all' ? 'All' : g === 'men' ? 'Men' : 'Women'}
          </button>
        ))}
        <span style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />
        {(['all', '1st', '2nd', '3rd'] as const).map((d) => (
          <button
            key={d}
            type="button"
            className={`chip${divisionFilter === d ? ' chip--active' : ''}`}
            onClick={() => setDivisionFilter(d)}
          >
            {d === 'all' ? 'All Div' : `${d} Div`}
          </button>
        ))}
      </div>

      <DateStrip dates={dates} selected={selectedDate} onSelect={setSelectedDate} />

      {grouped.length === 0 && (
        <div className="empty-state">No fixtures for this day with the current filters.</div>
      )}

      {grouped.map(([compId, list]) => {
        const comp = getCompetition(compId)
        if (!comp) return null
        return (
          <section key={compId} className="league-group">
            <Link to={`/app/competitions/${compId}`} className="league-group__header">
              {comp.shortName}
              <span>{comp.season} ›</span>
            </Link>
            <div className="league-group__list">
              {list.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
