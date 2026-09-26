import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crest } from '../components/Crest'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'

export function OnboardingPage() {
  const { teams, competitions } = useData()
  const { completeOnboarding } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['rdb'])
  const [selectedComps, setSelectedComps] = useState<string[]>(['gfa-men-1'])

  const featuredTeams = useMemo(
    () => teams.filter((t) => t.competitionIds.includes('gfa-men-1') || t.competitionIds.includes('gfa-women-1')),
    [teams],
  )

  const toggle = (id: string, list: string[], set: (v: string[]) => void) => {
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  }

  const finish = () => {
    completeOnboarding(selectedTeams, selectedComps)
    navigate('/app')
  }

  return (
    <div className="onboard">
      <div className="onboard__hero">
        <div className="onboard__brand">
          <div className="top-bar__mark" style={{ width: 48, height: 48, fontSize: '0.9rem' }}>
            GM
          </div>
          <h1>Goal GM</h1>
        </div>
        <p>The complete source for Gambian football — every division, every match.</p>
      </div>

      {step === 0 && (
        <div className="onboard__body">
          <h2>Choose your leagues</h2>
          <p className="onboard__hint">Follow competitions for Favourites & alerts</p>
          {competitions.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`list-item${selectedComps.includes(c.id) ? ' list-item--selected' : ''}`}
              onClick={() => toggle(c.id, selectedComps, setSelectedComps)}
            >
              <div>
                <div className="list-item__title">{c.name}</div>
                <div className="list-item__meta">
                  {c.gender} · {c.division}
                  {c.region ? ` · ${c.region}` : ''}
                </div>
              </div>
              <span>{selectedComps.includes(c.id) ? '★' : '☆'}</span>
            </button>
          ))}
          <button type="button" className="btn btn--primary" onClick={() => setStep(1)}>
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="onboard__body">
          <h2>Favourite teams</h2>
          <p className="onboard__hint">Pick clubs you want live alerts for</p>
          {featuredTeams.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`list-item${selectedTeams.includes(t.id) ? ' list-item--selected' : ''}`}
              onClick={() => toggle(t.id, selectedTeams, setSelectedTeams)}
            >
              <Crest team={t} />
              <div>
                <div className="list-item__title">{t.name}</div>
                <div className="list-item__meta">{t.city}</div>
              </div>
              <span>{selectedTeams.includes(t.id) ? '★' : '☆'}</span>
            </button>
          ))}
          <button type="button" className="btn btn--primary" onClick={finish}>
            Start watching
          </button>
          <button type="button" className="btn btn--ghost" onClick={finish}>
            Skip for now
          </button>
        </div>
      )}
    </div>
  )
}
