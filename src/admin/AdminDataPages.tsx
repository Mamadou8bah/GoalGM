import { useState } from 'react'
import { useData } from '../context/DataContext'
import { roleLabels } from '../data/seed'
import type { StaffRole } from '../types'

export function AdminCompetitionsPage() {
  const { competitions, upsertCompetition } = useData()

  return (
    <div className="admin-page">
      <h1>Competitions</h1>
      <p className="admin-lead">Country → Gender → Division → Zone. Tie-break & zone rules per league.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Div</th>
              <th>Type</th>
              <th>Season</th>
              <th>Tie-break</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {competitions.map((c) => (
              <tr key={c.id}>
                <td>
                  {c.name}
                  {c.region ? ` (${c.region})` : ''}
                </td>
                <td>{c.gender}</td>
                <td>{c.division}</td>
                <td>{c.type}</td>
                <td>{c.season}</td>
                <td>{c.tieBreak}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() =>
                      upsertCompetition({
                        ...c,
                        tieBreak: c.tieBreak === 'gd' ? 'h2h' : 'gd',
                      })
                    }
                  >
                    Toggle tie-break
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminTeamsPage() {
  const { teams, upsertTeam } = useData()

  return (
    <div className="admin-page">
      <h1>Teams</h1>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Club</th>
              <th>City</th>
              <th>Stadium</th>
              <th>Coach</th>
              <th>Founded</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.city}</td>
                <td>{t.stadium}</td>
                <td>{t.coach}</td>
                <td>{t.founded}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      const coach = window.prompt('Coach name', t.coach)
                      if (coach) upsertTeam({ ...t, coach })
                    }}
                  >
                    Edit coach
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminPlayersPage() {
  const { players, getTeam, upsertPlayer } = useData()

  return (
    <div className="admin-page">
      <h1>Players</h1>
      <p className="admin-lead">Photos, bios & transfers — demo edit jersey number.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Pos</th>
              <th>#</th>
              <th>Foot</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {players.slice(0, 40).map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{getTeam(p.teamId)?.shortName}</td>
                <td>{p.position}</td>
                <td>{p.jerseyNumber}</td>
                <td>{p.preferredFoot}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      const n = Number(window.prompt('Jersey #', String(p.jerseyNumber)))
                      if (!Number.isNaN(n)) upsertPlayer({ ...p, jerseyNumber: n })
                    }}
                  >
                    Edit #
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminNewsPage() {
  const { news, upsertNews } = useData()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div className="admin-page">
      <h1>News editor</h1>
      <p className="admin-lead">Categories, tags, featured banner, schedule publishing (demo: publish now).</p>
      <div className="admin-form">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Body
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} />
        </label>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (!title.trim()) return
            upsertNews({
              id: `n_${Date.now()}`,
              title,
              body: body || 'Draft article body.',
              category: 'General',
              author: 'Admin',
              publishedAt: new Date().toISOString(),
              imageColor: '#0C1C8C',
              featured: false,
            })
            setTitle('')
            setBody('')
          }}
        >
          Publish article
        </button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id}>
                <td>{n.title}</td>
                <td>{n.category}</td>
                <td>{n.featured ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => upsertNews({ ...n, featured: !n.featured })}
                  >
                    Toggle featured
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminStreamsPage() {
  const { matches, getTeam, setStreamUrl, channelUrl, setChannelUrl } = useData()

  return (
    <div className="admin-page">
      <h1>Stream links</h1>
      <p className="admin-lead">Attach YouTube live / replay URLs. Fan app shows Watch Live when set.</p>
      <label className="admin-label">
        Channel URL
        <input value={channelUrl} onChange={(e) => setChannelUrl(e.target.value)} />
      </label>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Stream</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>
                  {getTeam(m.homeTeamId)?.shortName} vs {getTeam(m.awayTeamId)?.shortName}
                </td>
                <td className="admin-muted">{m.streamUrl || '—'}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      const url = window.prompt('YouTube URL', m.streamUrl || channelUrl)
                      if (url != null) setStreamUrl(m.id, url)
                    }}
                  >
                    Set link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminUsersPage() {
  const { staff, upsertStaff } = useData()

  return (
    <div className="admin-page">
      <h1>Users & roles</h1>
      <p className="admin-lead">Super Admin, Score Reporter, Data Editor, News Editor.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{roleLabels[s.role]}</td>
                <td>{s.active ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="admin-action"
                    onClick={() => {
                      const roles = Object.keys(roleLabels) as StaffRole[]
                      const next = roles[(roles.indexOf(s.role) + 1) % roles.length]
                      upsertStaff({ ...s, role: next })
                    }}
                  >
                    Cycle role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminAuditPage() {
  const { auditLog } = useData()

  return (
    <div className="admin-page">
      <h1>Audit log</h1>
      <p className="admin-lead">Who changed what and when — required for post-FT score corrections.</p>
      <ul className="admin-audit">
        {auditLog.map((a) => (
          <li key={a.id}>
            <strong>{a.action}</strong> · {a.entity} · {a.detail}
            <span>
              {a.staffName} · {new Date(a.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
