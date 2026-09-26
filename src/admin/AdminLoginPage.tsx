import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { roleLabels } from '../data/seed'

export function AdminLoginPage() {
  const { adminUser, loginAdmin, staff } = useData()
  const [email, setEmail] = useState('reporter@goalgm.gm')
  const [error, setError] = useState('')

  if (adminUser) return <Navigate to="/admin" replace />

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="top-bar__mark" style={{ width: 44, height: 44 }}>
          GM
        </div>
        <h1>Goal GM Admin</h1>
        <p>Secure staff panel for score reporters, data & news editors</p>
        <label className="admin-label">
          Staff email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (!loginAdmin(email)) setError('Unknown or inactive staff account')
          }}
        >
          Sign in
        </button>
        <div className="admin-demo-accounts">
          <strong>Demo accounts</strong>
          {staff.map((s) => (
            <button
              key={s.id}
              type="button"
              className="admin-demo-btn"
              onClick={() => setEmail(s.email)}
            >
              {s.email} — {roleLabels[s.role]}
            </button>
          ))}
        </div>
        <a href="/app" className="admin-back">
          ← Fan app
        </a>
      </div>
    </div>
  )
}
