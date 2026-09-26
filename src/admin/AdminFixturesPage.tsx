import { useState } from 'react'
import { useData } from '../context/DataContext'
import type { Match } from '../types'

export function AdminFixturesPage() {
  const { matches, teams, competitions, upsertMatch, getTeam } = useData()
  const [showForm, setShowForm] = useState(false)
  const [homeTeamId, setHome] = useState(teams[0]?.id ?? '')
  const [awayTeamId, setAway] = useState(teams[1]?.id ?? '')
  const [competitionId, setComp] = useState(competitions[0]?.id ?? '')
  const [kickoff, setKickoff] = useState('2026-09-28T16:00')
  const [stadium, setStadium] = useState('Independence Stadium')

  const create = () => {
    const match: Match = {
      id: `m_${Date.now()}`,
      competitionId,
      round: 9,
      homeTeamId,
      awayTeamId,
      kickoff: new Date(kickoff).toISOString(),
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      stadium,
      events: [],
      lineups: [],
    }
    upsertMatch(match)
    setShowForm(false)
  }

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Fixtures</h1>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : 'Add fixture'}
        </button>
      </div>
      <p className="admin-lead">Schedule matches or bulk-import (CSV demo: use Add fixture).</p>

      {showForm && (
        <div className="admin-form">
          <label>
            Competition
            <select value={competitionId} onChange={(e) => setComp(e.target.value)}>
              {competitions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Home
            <select value={homeTeamId} onChange={(e) => setHome(e.target.value)}>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Away
            <select value={awayTeamId} onChange={(e) => setAway(e.target.value)}>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Kick-off
            <input type="datetime-local" value={kickoff} onChange={(e) => setKickoff(e.target.value)} />
          </label>
          <label>
            Stadium
            <input value={stadium} onChange={(e) => setStadium(e.target.value)} />
          </label>
          <button type="button" className="btn btn--primary" onClick={create}>
            Save fixture
          </button>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Kick-off</th>
              <th>Match</th>
              <th>Comp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...matches]
              .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
              .map((m) => (
                <tr key={m.id}>
                  <td>{new Date(m.kickoff).toLocaleString()}</td>
                  <td>
                    {getTeam(m.homeTeamId)?.shortName} vs {getTeam(m.awayTeamId)?.shortName}
                  </td>
                  <td>{m.competitionId}</td>
                  <td>{m.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
