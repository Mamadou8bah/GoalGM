import { useMemo } from 'react'
import { MatchRow } from '../components/MatchRow'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'
import { PROTOTYPE_TODAY, dateKey } from '../data/seed'
import { useLiveMatches } from '../hooks/useLiveMatches'

export function MyMatchesPage() {
  const { favouriteTeamIds, favouriteCompetitionIds } = useApp()
  const { getTeam } = useData()
  const allMatches = useLiveMatches()

  const favMatches = useMemo(() => {
    return allMatches
      .filter(
        (m) =>
          favouriteTeamIds.includes(m.homeTeamId) ||
          favouriteTeamIds.includes(m.awayTeamId) ||
          favouriteCompetitionIds.includes(m.competitionId),
      )
      .sort((a, b) => {
        const aToday = dateKey(a.kickoff) === PROTOTYPE_TODAY ? 0 : 1
        const bToday = dateKey(b.kickoff) === PROTOTYPE_TODAY ? 0 : 1
        if (aToday !== bToday) return aToday - bToday
        return a.kickoff.localeCompare(b.kickoff)
      })
  }, [allMatches, favouriteTeamIds, favouriteCompetitionIds])

  return (
    <>
      <div className="page-title">Favourites</div>
      {favouriteTeamIds.length === 0 && favouriteCompetitionIds.length === 0 && (
        <div className="empty-state">
          Star teams on their pages or complete onboarding to see fixtures here.
        </div>
      )}
      {(favouriteTeamIds.length > 0 || favouriteCompetitionIds.length > 0) && (
        <div className="panel__title">
          Following teams: {favouriteTeamIds.map((id) => getTeam(id)?.shortName ?? id).join(', ')}
        </div>
      )}
      {favMatches.length === 0 && favouriteTeamIds.length > 0 && (
        <div className="empty-state">No fixtures for your favourites right now.</div>
      )}
      <div className="league-group__list">
        {favMatches.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </div>
    </>
  )
}
