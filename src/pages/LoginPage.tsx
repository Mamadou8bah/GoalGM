import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function LoginPage() {
  const { fanUser, setFanUser } = useApp()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  const signIn = (provider: 'phone' | 'google' | 'apple') => {
    if (provider === 'phone' && phone.trim().length < 7) {
      alert('Enter a valid Gambian phone number for the demo')
      return
    }
    setFanUser({
      name:
        provider === 'google'
          ? 'Demo Google Fan'
          : provider === 'apple'
            ? 'Demo Apple Fan'
            : 'Phone Fan',
      provider,
      phone: provider === 'phone' ? phone : undefined,
    })
    navigate('/app/more')
  }

  if (fanUser) {
    return (
      <>
        <div className="page-title">Account</div>
        <div className="list-item">
          <div>
            <div className="list-item__title">{fanUser.name}</div>
            <div className="list-item__meta">
              Signed in with {fanUser.provider}
              {fanUser.phone ? ` · ${fanUser.phone}` : ''}
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              setFanUser(null)
            }}
          >
            Sign out
          </button>
        </div>
        <p style={{ padding: 12, fontSize: '0.8rem', color: 'var(--gm-text-muted)' }}>
          Favourites & notification settings sync across devices when signed in (demo: local only).
        </p>
      </>
    )
  }

  return (
    <>
      <div className="page-title">Sign in</div>
      <p style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--gm-text-muted)' }}>
        Optional — Goal GM works without an account. Sign in to sync favourites.
      </p>
      <div className="search-box">
        <input
          type="tel"
          placeholder="+220 phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="btn-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button" className="btn btn--primary" onClick={() => signIn('phone')}>
          Continue with phone
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => signIn('google')}>
          Continue with Google
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => signIn('apple')}>
          Continue with Apple
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => navigate('/app')}>
          Continue as guest
        </button>
      </div>
    </>
  )
}
